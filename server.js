require('dotenv').config();
const crypto = require('crypto');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alano';
const PUBLIC_DIR = path.join(__dirname, 'public');

// ---------- JWT secret (no hard-coded fallback) ----------
let JWT_SECRET = process.env.JWT_SECRET;
const weakSecret = !JWT_SECRET || JWT_SECRET.length < 16 || /change-this|your-secret/i.test(JWT_SECRET);
if (weakSecret) {
  if (isProd) {
    console.error('✗ JWT_SECRET is missing or weak. Set a long random value in the environment variables.');
    process.exit(1);
  }
  JWT_SECRET = crypto.randomBytes(48).toString('hex');
  console.warn('⚠ JWT_SECRET not set: using a temporary random secret (logins reset on every restart).');
}

// ---------- Constants ----------
const CATEGORY_EN = { 'رجالي': 'Men', 'نسائي': 'Women', 'رياضي': 'Sports' };
const COUPONS = { ALANO10: 0.1 };
const SHIPPING_OPTIONS = [50, 120];
const MAX_QTY_PER_ITEM = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IMG_RE = /^(https?:\/\/|\/api\/images\/[a-f0-9]{24}$)/i;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

const httpError = (status, message) => Object.assign(new Error(message), { status });
const asyncH = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ---------- App ----------
const app = express();
if (isProd) app.set('trust proxy', 1);
app.disable('x-powered-by');

if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN.split(',').map(s => s.trim()) }));
}
const jsonSmall = express.json({ limit: '100kb' });
const jsonUpload = express.json({ limit: '4mb' });
app.use((req, res, next) => (req.path === '/api/uploads' ? next() : jsonSmall(req, res, next)));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// No caching for the API only (static assets can be cached)
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Minimal in-memory rate limiter (per IP)
function rateLimit({ windowMs, max }) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }, windowMs).unref();
  return (req, res, next) => {
    const now = Date.now();
    let h = hits.get(req.ip);
    if (!h || h.reset < now) {
      h = { n: 0, reset: now + windowMs };
      hits.set(req.ip, h);
    }
    if (++h.n > max) return res.status(429).json({ error: 'محاولات كثيرة، حاول مرة أخرى لاحقًا' });
    next();
  };
}
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

// ---------- Models ----------
const jsonClean = {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
};

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  name_en: { type: String, trim: true, maxlength: 120, default: '' },
  category: { type: String, required: true, enum: Object.keys(CATEGORY_EN) },
  category_en: { type: String, default: '' },
  price: { type: Number, required: true, min: 1 },
  oldPrice: { type: Number, default: 0, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  description: { type: String, default: '', maxlength: 1000 },
  description_en: { type: String, default: '', maxlength: 1000 },
  colors: { type: [String], default: [] },
  img: { type: String, default: '', maxlength: 500 },
  accentColor: { type: String, default: '#c9a45c' },
  bgColor: { type: String, default: '#14171f' }
}, { toJSON: jsonClean });
const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  name: { type: String, trim: true, maxlength: 80 },
  phone: String,
  address: String
}, { timestamps: true, toJSON: jsonClean });
const User = mongoose.model('User', userSchema);

const orderItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  name_en: String,
  price: Number,
  qty: Number,
  img: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, index: true },
  userEmail: { type: String, index: true },
  userName: String,
  userPhone: String,
  userAddress: String,
  items: [orderItemSchema],
  subtotal: Number,
  discount: { type: Number, default: 0 },
  coupon: { type: String, default: '' },
  shipping: Number,
  total: Number,
  paymentMethod: { type: String, default: 'cod' },
  status: { type: Number, default: 0, min: 0, max: 3 } // 0 review, 1 prepared, 2 shipping, 3 delivered
}, { timestamps: true, toJSON: jsonClean });
orderSchema.index({ createdAt: -1 });
const Order = mongoose.model('Order', orderSchema);

const Image = mongoose.model('Image', new mongoose.Schema({
  data: Buffer,
  contentType: String
}, { timestamps: true }));

const Setting = mongoose.model('Setting', new mongoose.Schema({ _id: String, value: String }));
const SETTING_KEYS = ['whatsapp', 'instagram', 'tiktok', 'heroImg', 'aboutImg'];

const Counter = mongoose.model('Counter', new mongoose.Schema({ _id: String, seq: { type: Number, default: 0 } }));
const nextOrderNumber = async () => {
  const c = await Counter.findOneAndUpdate({ _id: 'order' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
  return '#' + (1000 + c.seq);
};

// ---------- Auth middleware ----------
const authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'سجّل الدخول أولًا' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'الجلسة غير صالحة أو منتهية' });
  }
};

// Admin rights are re-checked against the database (not only the token)
const requireAdmin = asyncH(async (req, res, next) => {
  const u = await User.findOne({ email: req.user.email }).select('isAdmin');
  if (!u || !u.isAdmin) throw httpError(403, 'هذه العملية للمدير فقط');
  next();
});

// ---------- Validation helpers ----------
const str = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isHash = s => typeof s === 'string' && /^\$2[aby]\$/.test(s);

function parseProduct(b, partial = false) {
  const out = {};
  const has = k => b[k] !== undefined;

  if (!partial || has('name')) {
    if (!str(b.name)) throw httpError(400, 'اسم المنتج مطلوب');
    out.name = str(b.name, 120);
  }
  if (has('name_en')) out.name_en = str(b.name_en, 120);
  if (!partial || has('category')) {
    if (!CATEGORY_EN[b.category]) throw httpError(400, 'فئة غير صحيحة');
    out.category = b.category;
    out.category_en = CATEGORY_EN[b.category];
  }
  if (!partial || has('price')) {
    const p = Number(b.price);
    if (!Number.isFinite(p) || p <= 0 || p > 10000000) throw httpError(400, 'السعر غير صحيح');
    out.price = p;
  }
  if (has('oldPrice')) {
    const p = Number(b.oldPrice);
    if (!Number.isFinite(p) || p < 0) throw httpError(400, 'السعر القديم غير صحيح');
    out.oldPrice = p;
  }
  if (has('stock') || !partial) {
    const s = b.stock === undefined ? 0 : Number(b.stock);
    if (!Number.isInteger(s) || s < 0 || s > 100000) throw httpError(400, 'المخزون غير صحيح');
    out.stock = s;
  }
  if (has('img')) {
    const u = str(b.img, 500);
    if (u && !IMG_RE.test(u)) throw httpError(400, 'رابط الصورة غير صحيح');
    out.img = u;
  }
  if (has('description')) out.description = str(b.description, 1000);
  if (has('description_en')) out.description_en = str(b.description_en, 1000);
  if (has('colors')) {
    const list = Array.isArray(b.colors) ? b.colors : String(b.colors).split(',');
    out.colors = list.map(c => String(c).trim()).filter(c => /^#[0-9a-f]{3,8}$/i.test(c)).slice(0, 5);
  }
  for (const k of ['accentColor', 'bgColor']) {
    if (has(k)) {
      if (!/^#[0-9a-f]{3,8}$/i.test(str(b[k], 9))) throw httpError(400, 'لون غير صحيح');
      out[k] = b[k];
    }
  }
  return out;
}

// ---------- Health ----------
app.get('/api/health', (req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

// ---------- Products ----------
app.get('/api/products', asyncH(async (req, res) => {
  res.json(await Product.find().sort({ id: 1 }));
}));

app.get('/api/products/:id', asyncH(async (req, res) => {
  const product = await Product.findOne({ id: Number(req.params.id) });
  if (!product) throw httpError(404, 'المنتج غير موجود');
  res.json(product);
}));

app.post('/api/products', authenticate, requireAdmin, asyncH(async (req, res) => {
  const data = parseProduct(req.body || {});
  for (let attempt = 0; attempt < 3; attempt++) {
    const last = await Product.findOne().sort({ id: -1 }).select('id');
    try {
      const product = await Product.create({ ...data, id: (last ? last.id : 0) + 1 });
      return res.status(201).json(product);
    } catch (e) {
      if (e.code !== 11000) throw e; // id collision: retry
    }
  }
  throw httpError(500, 'تعذر إنشاء المنتج');
}));

app.put('/api/products/:id', authenticate, requireAdmin, asyncH(async (req, res) => {
  const data = parseProduct(req.body || {}, true);
  const product = await Product.findOneAndUpdate({ id: Number(req.params.id) }, data, { new: true, runValidators: true });
  if (!product) throw httpError(404, 'المنتج غير موجود');
  res.json(product);
}));

app.delete('/api/products/:id', authenticate, requireAdmin, asyncH(async (req, res) => {
  const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
  if (!product) throw httpError(404, 'المنتج غير موجود');
  res.json({ message: 'تم حذف المنتج' });
}));

// ---------- Images (stored in MongoDB so they survive redeploys) ----------
const SIGS = { 'image/jpeg': [0xff, 0xd8], 'image/png': [0x89, 0x50], 'image/webp': [0x52, 0x49] };

app.post('/api/uploads', jsonUpload, authenticate, requireAdmin, asyncH(async (req, res) => {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(req.body?.data || '');
  if (!m) throw httpError(400, 'صيغة الصورة غير مدعومة');
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 2.5 * 1024 * 1024) throw httpError(413, 'الصورة كبيرة جدًا');
  const sig = SIGS[m[1]];
  if (!sig || buf[0] !== sig[0] || buf[1] !== sig[1]) throw httpError(400, 'الملف ليس صورة صحيحة');
  const img = await Image.create({ data: buf, contentType: m[1] });
  res.status(201).json({ url: '/api/images/' + img.id });
}));

app.get('/api/images/:id', asyncH(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw httpError(404, 'Not found');
  const img = await Image.findById(req.params.id);
  if (!img) throw httpError(404, 'Not found');
  res.setHeader('Content-Type', img.contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(img.data);
}));

// ---------- Site settings ----------
app.get('/api/settings', asyncH(async (req, res) => {
  const rows = await Setting.find();
  res.json(Object.fromEntries(rows.filter(r => SETTING_KEYS.includes(r._id)).map(r => [r._id, r.value])));
}));

app.put('/api/settings', authenticate, requireAdmin, asyncH(async (req, res) => {
  const b = req.body || {};
  const out = {};
  for (const k of SETTING_KEYS) {
    if (b[k] === undefined) continue;
    let v = str(b[k], 500);
    if (k === 'whatsapp') {
      v = v.replace(/[^0-9]/g, '');
      if (v && (v.length < 8 || v.length > 15)) throw httpError(400, 'رقم واتساب غير صحيح');
    } else if (k === 'instagram' || k === 'tiktok') {
      if (v && !/^https:\/\//i.test(v)) throw httpError(400, 'الرابط يجب أن يبدأ بـ https://');
    } else if (v && !IMG_RE.test(v)) throw httpError(400, 'رابط الصورة غير صحيح');
    out[k] = v;
  }
  await Promise.all(Object.entries(out).map(([k, v]) => Setting.updateOne({ _id: k }, { value: v }, { upsert: true })));
  const rows = await Setting.find();
  res.json(Object.fromEntries(rows.filter(r => SETTING_KEYS.includes(r._id)).map(r => [r._id, r.value])));
}));

// ---------- Auth ----------
app.post('/api/auth/register', authLimiter, asyncH(async (req, res) => {
  const email = str(req.body?.email, 120).toLowerCase();
  const name = str(req.body?.name, 80);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !password || !name) throw httpError(400, 'جميع الحقول مطلوبة');
  if (!EMAIL_RE.test(email)) throw httpError(400, 'البريد الإلكتروني غير صحيح');
  if (password.length < 6) throw httpError(400, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  if (password.length > 72) throw httpError(400, 'كلمة المرور طويلة جدًا');

  try {
    // isAdmin is NEVER set from user input
    await User.create({ email, name, password: await bcrypt.hash(password, 10), isAdmin: false });
  } catch (e) {
    if (e.code === 11000) throw httpError(400, 'البريد الإلكتروني مسجل بالفعل');
    throw e;
  }
  res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
}));

app.post('/api/auth/login', authLimiter, asyncH(async (req, res) => {
  const email = str(req.body?.email, 120).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const fail = () => httpError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
  if (!email || !password) throw fail();

  const user = await User.findOne({ email });
  if (!user) throw fail();

  let ok = false;
  if (isHash(user.password)) {
    ok = await bcrypt.compare(password, user.password);
  } else if (user.password === password) {
    // Legacy plaintext account: accept once, then upgrade to a hash
    ok = true;
    user.password = await bcrypt.hash(password, 10);
    await user.save();
  }
  if (!ok) throw fail();

  const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email: user.email, isAdmin: user.isAdmin, name: user.name });
}));

app.get('/api/auth/verify', authenticate, asyncH(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) throw httpError(401, 'الحساب غير موجود');
  res.json({ email: user.email, isAdmin: user.isAdmin, name: user.name });
}));

// ---------- Orders ----------
// Prices, totals, discount and stock are ALL computed on the server.
app.post('/api/orders', authenticate, asyncH(async (req, res) => {
  const b = req.body || {};
  const userName = str(b.userName, 80);
  const userPhone = str(b.userPhone, 20);
  const userAddress = str(b.userAddress, 300);
  if (!userName || !userAddress) throw httpError(400, 'أكمل بيانات الشحن');
  if (!PHONE_RE.test(userPhone)) throw httpError(400, 'رقم الهاتف غير صحيح');

  if (!Array.isArray(b.items) || !b.items.length || b.items.length > 30) throw httpError(400, 'السلة فارغة');
  const wanted = new Map();
  for (const it of b.items) {
    const id = Number(it?.id);
    const qty = Number(it?.qty);
    if (!Number.isInteger(id) || !Number.isInteger(qty) || qty < 1) throw httpError(400, 'بيانات السلة غير صحيحة');
    wanted.set(id, (wanted.get(id) || 0) + qty);
  }

  const products = await Product.find({ id: { $in: [...wanted.keys()] } });
  if (products.length !== wanted.size) throw httpError(400, 'يوجد منتج في السلة لم يعد متاحًا');

  const lines = products.map(p => {
    const qty = wanted.get(p.id);
    if (qty > MAX_QTY_PER_ITEM) throw httpError(400, `الحد الأقصى ${MAX_QTY_PER_ITEM} قطع من كل منتج`);
    return { id: p.id, name: p.name, name_en: p.name_en || p.name, price: p.price, img: p.img, qty };
  });

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const coupon = str(b.coupon, 30).toUpperCase();
  const rate = COUPONS[coupon] || 0;
  const discount = Math.round(subtotal * rate);
  const shipping = SHIPPING_OPTIONS.includes(Number(b.shipping)) ? Number(b.shipping) : SHIPPING_OPTIONS[0];
  const total = subtotal - discount + shipping;

  const reserved = [];
  try {
    for (const l of lines) {
      const r = await Product.updateOne({ id: l.id, stock: { $gte: l.qty } }, { $inc: { stock: -l.qty } });
      if (r.modifiedCount !== 1) throw httpError(409, `الكمية المطلوبة من "${l.name}" غير متاحة في المخزون`);
      reserved.push(l);
    }
    const order = await Order.create({
      orderId: await nextOrderNumber(),
      userEmail: req.user.email,
      userName, userPhone, userAddress,
      items: lines.map(l => ({ productId: l.id, name: l.name, name_en: l.name_en, price: l.price, qty: l.qty, img: l.img })),
      subtotal, discount, coupon: rate ? coupon : '', shipping, total,
      paymentMethod: 'cod',
      status: 0
    });
    res.status(201).json(order);
  } catch (e) {
    // give the stock back if anything failed
    await Promise.all(reserved.map(l => Product.updateOne({ id: l.id }, { $inc: { stock: l.qty } })));
    throw e;
  }
}));

// Orders of the logged-in user (email comes from the token, never from the URL)
app.get('/api/orders/my', authenticate, asyncH(async (req, res) => {
  res.json(await Order.find({ userEmail: req.user.email }).sort({ createdAt: -1 }));
}));

// All orders (admin)
app.get('/api/orders', authenticate, requireAdmin, asyncH(async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }).limit(500));
}));

// Update order status (admin)
app.put('/api/orders/:id', authenticate, requireAdmin, asyncH(async (req, res) => {
  const status = Number(req.body?.status);
  if (!Number.isInteger(status) || status < 0 || status > 3) throw httpError(400, 'حالة غير صحيحة');
  const order = await Order.findOneAndUpdate({ orderId: req.params.id }, { status }, { new: true });
  if (!order) throw httpError(404, 'الطلب غير موجود');
  res.json(order);
}));

// ---------- Static files ----------
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(express.static(PUBLIC_DIR, {
  maxAge: '1h',
  setHeaders: (res, file) => {
    if (file.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
  }
}));

// ---------- Error handler ----------
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON غير صالح' });
  if (err.name === 'ValidationError') return res.status(400).json({ error: 'بيانات غير صحيحة' });
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? 'حدث خطأ في الخادم' : err.message });
});

// ---------- Bootstrap data ----------
const U = id => `https://images.unsplash.com/${id}?w=800&h=1000&fit=crop&q=80`;
const SEED_PRODUCTS = [
  { id: 1, name: 'ألانو كلاسيك', name_en: 'Alano Classic', category: 'رجالي', price: 4500, stock: 14, colors: ['#111111', '#9a9a9a', '#d6d6d6'], description: 'ساعة كلاسيكية بميناء أسود وسوار ستانلس ستيل.', description_en: 'A classic watch with a black dial and stainless steel bracelet.', img: U('photo-1587836374828-4dbafa92cf0e') },
  { id: 2, name: 'ألانو كرونو', name_en: 'Alano Chrono', category: 'رجالي', price: 5200, stock: 8, colors: ['#222222', '#8a8a8a'], description: 'كرونوغراف أسود بسوار جلدي.', description_en: 'A black chronograph on a leather strap.', img: U('photo-1614162399378-f6e30e65be6c') },
  { id: 3, name: 'ألانو هيريتدج', name_en: 'Alano Heritage', category: 'نسائي', price: 4800, stock: 12, colors: ['#b98b4a', '#c9c3b8', '#8d8a85'], description: 'ساعة بتشطيب ذهبي وفضي.', description_en: 'A two-tone gold and silver watch.', img: U('photo-1605301156393-5c37b7b31697') },
  { id: 4, name: 'ألانو أوشن', name_en: 'Alano Ocean', category: 'رجالي', price: 4700, stock: 20, colors: ['#14284b', '#c9c3b8'], description: 'ميناء أزرق عميق ومقاومة للماء.', description_en: 'A deep blue dial, water resistant.', img: U('photo-1594534237651-736dbd3d3f25') },
  { id: 5, name: 'ألانو فينتاج', name_en: 'Alano Vintage', category: 'نسائي', price: 4300, stock: 17, colors: ['#1f4a37', '#5a3a26', '#d6d0c6'], description: 'ميناء أخضر بطابع كلاسيكي.', description_en: 'A green dial with a vintage character.', img: U('photo-1548171915-e79a37a41b26') }
].map(p => ({ ...p, category_en: CATEGORY_EN[p.category] }));

// Names for products created by older versions (so the English UI works on existing data)
const LEGACY_EN = {
  'أوريون كرونو': 'Orion Chrono', 'سيلين الماسية': 'Celine Diamond', 'نوكس تيتانيوم': 'Nox Titanium',
  'ليجاسي كلاسيك': 'Legacy Classic', 'ألبا روز': 'Alba Rose', 'تايدال غوص': 'Tidal Dive'
};

async function backfillEnglish() {
  const rows = await Product.find({ $or: [{ name_en: '' }, { name_en: null }, { category_en: '' }, { category_en: null }] });
  for (const p of rows) {
    if (!p.name_en) p.name_en = LEGACY_EN[p.name] || p.name;
    if (!p.category_en) p.category_en = CATEGORY_EN[p.category] || p.category;
    await p.save();
  }
  if (rows.length) console.log(`✓ Filled English names for ${rows.length} products`);
}

async function seedIfEmpty() {
  if (process.env.RESEED === 'true') {
    await Product.deleteMany({});
    console.log('⚠ RESEED=true: products were reset. Remove this variable after the first start.');
  }
  if ((await Product.estimatedDocumentCount()) === 0) {
    await Product.insertMany(SEED_PRODUCTS);
    console.log('✓ Seeded initial products');
  }
}

// The admin comes ONLY from environment variables (no hard-coded credentials)
async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';
  if (!email || !password) {
    console.warn('⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set: no admin account will be created.');
    return;
  }
  if (!EMAIL_RE.test(email) || password.length < 8) {
    console.error('✗ ADMIN_EMAIL must be a valid email and ADMIN_PASSWORD at least 8 characters.');
    if (isProd) process.exit(1);
    return;
  }
  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ email, name: 'Admin', password: await bcrypt.hash(password, 10), isAdmin: true });
    console.log('✓ Admin account created');
  } else if (!existing.isAdmin) {
    existing.isAdmin = true;
    await existing.save();
  }
}

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('✓ Connected to MongoDB');
  } catch (err) {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1); // do not serve a broken API
  }
  await ensureAdmin();
  await seedIfEmpty();
  await backfillEnglish();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

start();
