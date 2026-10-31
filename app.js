'use strict';

/* ================= i18n: key: [arabic, english] ================= */
let lang = localStorage.getItem('lang') || 'en';
const I = {
  navHome: ['الرئيسية', 'Home'], navShop: ['المتجر', 'Shop'], navAbout: ['من نحن', 'About'], navContact: ['تواصل معنا', 'Contact'],
  admin: ['لوحة التحكم', 'Dashboard'], ordersNav: ['طلباتي', 'My Orders'], login: ['دخول', 'Login'], logout: ['خروج', 'Logout'],
  tagline: ['الوقت يرفعك', 'TIME ELEVATES YOU'], footTag: ['لأن الوقت شخصي.', 'Because time is personal.'],
  kick1: ['ساعات فاخرة', 'PREMIUM WATCHES'], kick2: ['مجموعة جديدة', 'NEW COLLECTION'], kick3: ['أناقة لا تنتهي', 'ESSENTIAL STYLE'],
  head1: ['أكثر من مجرد وقت', 'More Than Just Time'], head2: ['صُنعت لتدوم', 'Crafted to Last'], head3: ['خالدة بتصميمها', 'Timeless by Design'],
  desc1: ['ALANO ليست مجرد علامة ساعات.\nإنها بيان للأناقة والدقة والشخصية.', 'ALANO is more than a watch brand.\nIt’s a statement of style, precision and character.'],
  desc2: ['حركات دقيقة ومواد عالية الجودة\nفي كل تفصيلة.', 'Precise movements and high-quality\nmaterials in every detail.'],
  desc3: ['تصاميم هادئة تناسب كل مناسبة.', 'Understated designs made for every occasion.'],
  explore: ['اكتشف المجموعة', 'Explore Collection'], scrollDown: ['مرر للأسفل', 'SCROLL DOWN'], viewAll: ['عرض الكل', 'View all'],
  tAll: ['الكل', 'ALL'], tMen: ['رجالي', 'MEN’S'], tWomen: ['نسائي', 'WOMEN’S'], tSports: ['رياضي', 'SPORTS'], tFav: ['المفضلة', 'FAVORITES'],
  diffKick: ['ميزة ALANO', 'THE ALANO DIFFERENCE'], diffTitle: ['الجودة في كل تفصيلة', 'Quality in Every Detail'],
  diffText: ['نؤمن أن الساعة الرائعة ليست لقياس الوقت فقط، بل للشعور الذي تمنحه لك. لذلك تُصنع كل ساعة ALANO بدقة، من مواد عالية الجودة وتصاميم خالدة.',
             'We believe a great watch isn’t just about telling time, it’s about the feeling it gives you. That’s why every ALANO watch is crafted with precision, using high-quality materials and timeless designs.'],
  builtFor: ['صُنعت لما يهم', 'Built for what matters'],
  f1: ['جودة ممتازة', 'Premium Quality'], f2: ['توصيل سريع وآمن', 'Fast & Safe Delivery'], f3: ['ضمان سنة', '1 Year Warranty'], f4: ['دعم مخصص', 'Dedicated Support'],
  waKick: ['جاهز تختار ساعتك؟', 'READY TO FIND YOURS?'], waTitle: ['اطلب الآن عبر واتساب', 'Order Now on WhatsApp'],
  waText: ['تحدث معنا مباشرة واحصل على ساعتك المفضلة مع أفضل خدمة.', 'Chat with us directly and get your favorite watch with the best service.'],
  waBtn: ['تحدث عبر واتساب', 'Chat on WhatsApp'], waMissing: ['رقم واتساب غير مضبوط بعد', 'WhatsApp number is not set yet'],
  orderWa: ['اطلب عبر واتساب', 'Order on WhatsApp'], waMsg: ['مرحبًا، أريد الاستفسار عن: ', 'Hi, I’d like to ask about: '],
  aboutTitle: ['من نحن', 'About ALANO'], contactTitle: ['تواصل معنا', 'Contact us'],
  contactText: ['يسعدنا خدمتك. راسلنا على واتساب أو تابعنا على السوشيال ميديا.', 'We’re happy to help. Message us on WhatsApp or follow us on social media.'],
  shopTitle: ['المتجر', 'Shop'], limitedOffer: ['⏳ عرض لفترة محدودة ينتهي خلال', '⏳ Limited offer ends in'], couponHint: ['كود الخصم ALANO10', 'Use code ALANO10'],
  search: ['ابحث عن ساعة', 'Search watches'], sortBy: ['الترتيب', 'Sort by'], priceLow: ['السعر: الأقل أولًا', 'Price: low to high'],
  priceHigh: ['السعر: الأعلى أولًا', 'Price: high to low'], newest: ['الأحدث', 'Newest'], allPrices: ['كل الأسعار', 'All prices'],
  upTo3500: ['حتى 3500', 'Up to 3500'], upTo5000: ['حتى 5000', 'Up to 5000'],
  noProducts: ['لا توجد منتجات', 'No products found'], loadFailed: ['تعذر تحميل المنتجات', 'Could not load products'], retry: ['إعادة المحاولة', 'Retry'],
  addToCart: ['أضف إلى السلة', 'Add to cart'], back: ['رجوع', 'Back'], notFound: ['المنتج غير موجود', 'Product not found'],
  features: [['حركة أوتوماتيكية', 'زجاج سافير مقاوم للخدش', 'مقاومة للماء', 'ضمان سنة'], ['Automatic movement', 'Scratch-resistant sapphire glass', 'Water resistant', '1-year warranty']],
  lowStock: ['ينفد قريبًا', 'Running low'], soldOut: ['نفد المخزون', 'Sold out'], maxStock: ['وصلت للحد الأقصى المتاح', 'Maximum available reached'],
  cart: ['سلة التسوق', 'Shopping cart'], emptyCart: ['السلة فارغة', 'Your cart is empty'], remove: ['حذف', 'Remove'],
  coupon: ['كود الخصم', 'Coupon code'], apply: ['تطبيق', 'Apply'], discountActive: ['✓ خصم 10% مفعّل', '✓ 10% discount active'],
  total: ['الإجمالي', 'Total'], checkout: ['إتمام الشراء', 'Checkout'], loginFirst: ['سجّل الدخول أولًا', 'Please sign in first'],
  invalidCode: ['كود غير صحيح', 'Invalid code'], discountApplied: ['تم تفعيل الخصم 10%', '10% discount applied'], shopNow: ['تسوق الآن', 'Shop now'],
  loginTitle: ['تسجيل الدخول', 'Sign in'], registerTitle: ['إنشاء حساب جديد', 'Create account'], newHere: ['جديد هنا؟', 'New here?'],
  createLink: ['أنشئ حساب', 'Create one'], haveAccount: ['لديك حساب بالفعل؟', 'Already have an account?'], signInLink: ['سجل دخول', 'Sign in'],
  email: ['البريد الإلكتروني', 'Email'], password: ['كلمة المرور', 'Password'], fullName: ['الاسم الكامل', 'Full name'],
  enter: ['دخول', 'Sign in'], create: ['إنشاء حساب', 'Create account'],
  phone: ['رقم الهاتف', 'Phone number'], address: ['العنوان بالتفصيل', 'Full address'],
  shipNormal: ['شحن عادي (50 ج.م)', 'Standard shipping (50 EGP)'], shipFast: ['شحن سريع (120 ج.م)', 'Express shipping (120 EGP)'],
  cod: ['الدفع عند الاستلام', 'Cash on delivery'], card: ['بطاقة ائتمان (قريبًا)', 'Credit card (soon)'],
  subtotal: ['المجموع الفرعي', 'Subtotal'], discount: ['الخصم', 'Discount'], shipping: ['الشحن', 'Shipping'],
  placeOrder: ['تأكيد الطلب', 'Place order'], completeData: ['أكمل بيانات الشحن', 'Complete shipping details'],
  badPhone: ['رقم الهاتف غير صحيح', 'Invalid phone number'], orderConfirmed: ['🎉 تم تأكيد طلبك', '🎉 Order confirmed'],
  orderNumber: ['رقم الطلب', 'Order number'], trackOrders: ['تتبع طلباتي', 'Track my orders'],
  orderFailed: ['فشل إرسال الطلب، حاول مرة أخرى', 'Failed to place order, try again'],
  myOrders: ['حسابي — طلباتي', 'My account — Orders'], noOrders: ['لا توجد طلبات بعد', 'No orders yet'], ordersError: ['حدث خطأ في تحميل الطلبات', 'Error loading orders'],
  status: [['قيد المراجعة', 'تم التجهيز', 'في الطريق', 'تم التسليم'], ['Pending', 'Prepared', 'On the way', 'Delivered']],
  unauthorized: ['غير مصرح', 'Unauthorized'], adminOnly: ['هذه الصفحة للمدير فقط.', 'This page is for admins only.'],
  tOv: ['نظرة عامة', 'Overview'], tPr: ['المنتجات', 'Products'], tOr: ['الطلبات', 'Orders'], tSt: ['إعدادات الموقع', 'Site settings'],
  kSales: ['المبيعات', 'Sales'], kOrders: ['الطلبات', 'Orders'], kCustomers: ['العملاء', 'Customers'], kProducts: ['المنتجات', 'Products'],
  watchName: ['الاسم (عربي)', 'Name (Arabic)'], watchNameEn: ['الاسم (إنجليزي)', 'Name (English)'], price: ['السعر', 'Price'], oldPrice: ['السعر قبل الخصم (اختياري)', 'Old price (optional)'],
  stock: ['المخزون', 'Stock'], category: ['الفئة', 'Category'], colors: ['الألوان (أكواد HEX مفصولة بفاصلة)', 'Colors (HEX codes, comma separated)'],
  descAr: ['الوصف (عربي)', 'Description (Arabic)'], descEn: ['الوصف (إنجليزي)', 'Description (English)'],
  imageUrl: ['رابط الصورة', 'Image URL'], chooseImg: ['اختيار صورة من الجهاز', 'Choose image from device'], removeImg: ['إزالة الصورة', 'Remove image'],
  addProduct: ['إضافة منتج', 'Add product'], editProduct: ['تعديل المنتج', 'Edit product'], edit: ['تعديل', 'Edit'], del: ['حذف', 'Delete'],
  save: ['حفظ', 'Save'], cancel: ['إلغاء', 'Cancel'], saved: ['تم الحفظ', 'Saved'],
  confirmDelete: ['حذف هذا المنتج نهائيًا؟', 'Delete this product permanently?'],
  orderCol: ['الطلب', 'Order'], customerCol: ['العميل', 'Customer'], valueCol: ['القيمة', 'Value'], statusCol: ['الحالة', 'Status'], dateCol: ['التاريخ', 'Date'],
  productAdded: ['تمت الإضافة', 'Product added'], productDeleted: ['تم الحذف', 'Product deleted'], productUpdated: ['تم التحديث', 'Updated'],
  updateStatus: ['تم تحديث الحالة', 'Status updated'], enterData: ['أدخل البيانات كاملة', 'Please fill in all fields'],
  whatsappNum: ['رقم واتساب (بكود الدولة، مثال 201001234567)', 'WhatsApp number (with country code, e.g. 201001234567)'],
  instagramUrl: ['رابط انستجرام (https://...)', 'Instagram URL (https://...)'], tiktokUrl: ['رابط تيك توك (https://...)', 'TikTok URL (https://...)'],
  heroImage: ['صورة خلفية الصفحة الرئيسية', 'Home hero background image'], aboutImage: ['صورة قسم الجودة', 'Quality section image'],
  cropTitle: ['اضبط الصورة', 'Adjust image'], zoom: ['الحجم', 'Size'], cropHint: ['اسحب الصورة لتحريكها واستخدم الشريط لتغيير حجمها', 'Drag the image to move it and use the slider to resize it'],
  useImage: ['استخدام الصورة', 'Use image'], uploading: ['جاري رفع الصورة...', 'Uploading image...'], uploadFailed: ['فشل رفع الصورة', 'Image upload failed'],
  notImage: ['اختر ملف صورة', 'Please choose an image file'],
  currency: ['ج.م', 'EGP'], creatingAccount: ['جاري إنشاء الحساب...', 'Creating account...'],
  accountCreated: ['تم إنشاء الحساب بنجاح! ✅', 'Account created! ✅'], loginSuccess: ['تم تسجيل الدخول', 'Signed in'],
  welcomeAdmin: ['أهلًا بالمدير ✦', 'Welcome admin ✦'], loggedOut: ['تم تسجيل الخروج', 'Signed out'],
  addedToFav: ['أُضيفت للمفضلة ♥', 'Added to favorites ♥'], removedFromFav: ['أُزيلت من المفضلة', 'Removed from favorites'],
  addedToCart: ['أُضيفت إلى السلة ✦', 'Added to cart ✦'], timeout: ['انتهت المهلة، حاول مرة أخرى', 'Timed out, try again'],
  serverError: ['حدث خطأ، تأكد من الاتصال بالسيرفر', 'Something went wrong, check your connection'],
  minPassword: ['كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'Password must be at least 6 characters'],
  sessionExpired: ['انتهت الجلسة، سجّل الدخول من جديد', 'Session expired, please sign in again'],
  pageTitle: ['ALANO | ساعات فاخرة', 'ALANO | Premium Watches']
};
const t = k => (I[k] ? I[k][lang === 'ar' ? 0 : 1] : k);
const L = () => (lang === 'ar' ? 0 : 1);

/* ================= helpers ================= */
const $ = q => document.querySelector(q);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const loc = () => (lang === 'ar' ? 'ar-EG' : 'en-US');
const fmt = n => (lang === 'ar' ? Number(n || 0).toLocaleString(loc()) + ' ' + t('currency') : t('currency') + ' ' + Number(n || 0).toLocaleString(loc()));
const IMG_OK = /^(https?:\/\/[^\s"'()<>]+|\/api\/images\/[a-f0-9]{24})$/i;
const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><rect width="200" height="250" fill="#ddd8cf"/><circle cx="100" cy="125" r="40" fill="none" stroke="#aaa" stroke-width="5"/></svg>');
const imgTag = (src, alt) => `<img src="${esc(IMG_OK.test(src || '') ? src : PH)}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.src='${PH}'">`;
const bg = u => (IMG_OK.test(u || '') ? `background-image:url('${esc(u)}')` : '');
const pname = p => (lang === 'ar' ? p.n : (p.n_en || p.n));
const pcat = p => (lang === 'ar' ? p.c : (p.c_en || p.c));
const pdesc = p => (lang === 'ar' ? p.d : (p.d_en || p.d));
const CAT = { men: 'رجالي', women: 'نسائي', sports: 'رياضي' };
const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON = {
  wa: svg('<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3 3.5 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>'),
  search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'),
  bag: svg('<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  arrow: svg('<path d="M4 12h16M14 6l6 6-6 6"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  truck: svg('<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
  seal: svg('<path d="M12 2.5l2.4 1.8 3-.2 1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1 2.8-3-.2L12 21.5l-2.4-1.8-3 .2-1-2.8L3.1 15.4 4 12.5l-.9-2.9 2.5-1.7 1-2.8 3 .2L12 2.5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  headset: svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20c0 1-2 2-5 2"/>'),
  insta: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8"/>'),
  tiktok: svg('<path d="M14 3v11a4 4 0 1 1-4-4"/><path d="M14 3c.5 3 2.5 4.5 5 4.5"/>')
};

/* ================= state ================= */
const S = {
  v: 'home', cat: 'all', pid: null, tab: 'ov', hero: 0,
  cart: lsGet('cart', []), user: null, token: localStorage.getItem('token') || null,
  prods: [], orders: [], settings: {}, loadError: false
};
const Q = { q: '', s: '', m: 0, fav: lsGet('fav', []), cp: 0, last: null };
if (!Array.isArray(S.cart)) S.cart = [];
if (!Array.isArray(Q.fav)) Q.fav = [];

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('pageTitle');
}
applyLang();

const save = () => lsSet('cart', S.cart);
const mapProd = p => ({
  id: p.id, n: p.name, n_en: p.name_en || p.name, c: p.category, c_en: p.category_en || p.category,
  p: p.price, o: p.oldPrice || 0, k: p.stock ?? 0, d: p.description || '', d_en: p.description_en || '',
  colors: Array.isArray(p.colors) ? p.colors : [], img: p.img || ''
});

/* ================= API ================= */
async function api(path, opts = {}) {
  const headers = {};
  if (opts.body) headers['Content-Type'] = 'application/json';
  if (S.token) headers.Authorization = 'Bearer ' + S.token;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(path, {
      method: opts.method || 'GET', headers, signal: ctrl.signal,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (res.status === 401 && S.token) { clearSession(); toast(t('sessionExpired')); }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, timeout: err.name === 'AbortError' };
  } finally {
    clearTimeout(timer);
  }
}
const errMsg = r => r.data?.error || (r.timeout ? t('timeout') : t('serverError'));

function clearSession() {
  S.user = null; S.token = null; S.orders = [];
  localStorage.removeItem('token');
  renderNav();
}

/* ================= routing ================= */
const PROTECTED = { admin: u => !!u?.isAdmin, orders: u => !!u, checkout: u => !!u, done: u => !!u };
function guard(v) {
  if (PROTECTED[v] && !PROTECTED[v](S.user)) {
    if (!S.user) toast(t('loginFirst'));
    return v === 'admin' && S.user ? 'home' : 'login';
  }
  return v;
}
let navigating = false;
function go(v, id) {
  if (navigating) return;
  v = guard(v);
  navigating = true;
  document.body.classList.remove('menu');
  const c = $('#cur');
  c.className = 'curtain in';
  cart(0);
  setTimeout(async () => {
    try {
      if (id) S.pid = id;
      S.v = v;
      const hash = '#/' + v + (v === 'product' && S.pid ? '/' + S.pid : '');
      if (location.hash !== hash) history.pushState(null, '', hash);
      await render();
      scrollTo(0, 0);
    } finally {
      c.className = 'curtain out';
      navigating = false;
    }
  }, 520);
}
function parseHash() {
  const [v, id] = location.hash.replace(/^#\/?/, '').split('/');
  return { v: VIEWS[v] ? v : 'home', id: id ? +id : null };
}
function applyRoute() {
  const { v, id } = parseHash();
  if (id) S.pid = id;
  S.v = guard(v);
  render();
  scrollTo(0, 0);
}
window.addEventListener('popstate', applyRoute);
window.addEventListener('scroll', () => { const n = $('#nav'); if (n) n.classList.toggle('solid', S.v !== 'home' || scrollY > 40); }, { passive: true });

/* ================= render ================= */
let renderId = 0;
async function render() {
  const my = ++renderId;
  renderNav();
  let html;
  try {
    html = await VIEWS[S.v]();
  } catch (err) {
    console.error(err);
    html = `<div class="auth"><h2>${t('serverError')}</h2></div>`;
  }
  if (my !== renderId) return;
  const app = $('#app');
  app.className = S.v === 'home' ? '' : 'pad';
  app.innerHTML = html;
  renderFooter();
  if (S.v === 'admin') count();
  drawer();
}

function renderNav() {
  const v = S.v, on = k => (v === k ? 'on' : '');
  const nav = $('#nav');
  nav.classList.toggle('solid', v !== 'home' || scrollY > 40);
  nav.innerHTML = `<div class="nav-l">
      <button class="ib burger" onclick="document.body.classList.toggle('menu')" aria-label="Menu">${ICON.menu}</button>
      <button class="ib" onclick="wa()" aria-label="WhatsApp">${ICON.wa}</button>
      <button class="ib" onclick="go('shop')" aria-label="Search">${ICON.search}</button>
    </div>
    <div class="logo" onclick="go('home')"><b>ALANO</b><small>${t('tagline')}</small></div>
    <div class="nav-r">
      <div class="nl">
        <button class="${on('home')}" onclick="go('home')">${t('navHome')}</button>
        <button class="${on('shop')}" onclick="go('shop')">${t('navShop')}</button>
        <button class="${on('about')}" onclick="go('about')">${t('navAbout')}</button>
        <button class="${on('contact')}" onclick="go('contact')">${t('navContact')}</button>
        ${S.user?.isAdmin ? `<button class="${on('admin')}" onclick="go('admin')">${t('admin')}</button>` : ''}
        ${S.user && !S.user.isAdmin ? `<button class="${on('orders')}" onclick="go('orders')">${t('ordersNav')}</button>` : ''}
        ${S.user ? `<button onclick="out()">${t('logout')}</button>` : ''}
      </div>
      <button class="lang" onclick="setLang(lang === 'ar' ? 'en' : 'ar')">${lang === 'ar' ? 'EN' : 'عربي'}</button>
      <button class="ib" onclick="go('${S.user ? (S.user.isAdmin ? 'admin' : 'orders') : 'login'}')" aria-label="Account">${ICON.user}</button>
      <button class="ib" onclick="cart(1)" aria-label="${t('cart')}">${ICON.bag}${S.cart.length ? `<span class="cnt">${S.cart.reduce((s, i) => s + i.q, 0)}</span>` : ''}</button>
    </div>`;
}

function renderFooter() {
  const st = S.settings;
  const soc = (u, ic) => (u && /^https:\/\//i.test(u) ? `<a href="${esc(u)}" target="_blank" rel="noopener" class="ib">${ic}</a>` : '');
  $('#ft').innerHTML = `<div class="logo"><b>ALANO</b><small>${t('tagline')}</small></div>
    <div class="fl"><button onclick="go('home')">${t('navHome')}</button><button onclick="go('shop')">${t('navShop')}</button>
      <button onclick="go('about')">${t('navAbout')}</button><button onclick="go('contact')">${t('navContact')}</button></div>
    <div class="fr">${soc(st.instagram, ICON.insta)}${soc(st.tiktok, ICON.tiktok)}<span>${t('footTag')}</span></div>`;
}

function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  applyLang();
  render();
}

function wa(msg) {
  const n = (S.settings.whatsapp || '').replace(/\D/g, '');
  if (!n) return toast(t('waMissing'));
  window.open('https://wa.me/' + n + (msg ? '?text=' + encodeURIComponent(msg) : ''), '_blank', 'noopener');
}

function waProd(id) {
  const p = S.prods.find(x => x.id === id);
  if (p) wa(t('waMsg') + pname(p) + ' (' + fmt(p.p) + ')');
}

/* ================= cart ================= */
function cartLines() {
  return S.cart.map(i => { const p = S.prods.find(x => x.id === i.id); return p ? { ...p, q: i.q } : null; }).filter(Boolean);
}
function totals(ship = 0) {
  const lines = cartLines();
  const sub = lines.reduce((s, i) => s + i.p * i.q, 0);
  const disc = Q.cp ? Math.round(sub * 0.1) : 0;
  return { lines, sub, disc, ship, total: sub - disc + ship };
}
function add(id) {
  const p = S.prods.find(x => x.id === id);
  if (!p) return;
  if (p.k <= 0) return toast(t('soldOut'));
  const item = S.cart.find(x => x.id === id);
  if (item && item.q >= Math.min(p.k, 10)) return toast(t('maxStock'));
  item ? item.q++ : S.cart.push({ id, q: 1 });
  save(); renderNav(); drawer();
  toast(t('addedToCart'));
}
function chg(id, d) {
  const item = S.cart.find(x => x.id === id), p = S.prods.find(x => x.id === id);
  if (!item || !p) return;
  const n = item.q + d;
  if (n < 1) return rm(id);
  if (n > Math.min(p.k, 10)) return toast(t('maxStock'));
  item.q = n; save(); renderNav(); drawer();
}
function rm(id) { S.cart = S.cart.filter(i => i.id !== id); save(); renderNav(); drawer(); }
function cart(o) { $('#dr').classList.toggle('open', !!o); $('#ov').classList.toggle('open', !!o); }
function coup() {
  if ($('#cpn').value.trim().toUpperCase() === 'ALANO10') { Q.cp = 1; toast(t('discountApplied')); }
  else toast(t('invalidCode'));
  drawer();
}
function drawer() {
  const { lines, sub, disc } = totals();
  $('#dr').innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
    <h2>${t('cart')}</h2><button onclick="cart(0)" style="font-size:22px" aria-label="Close">✕</button></div>
  <div style="flex:1;overflow:auto">${lines.map(i => `<div class="ci"><div class="th">${imgTag(i.img, pname(i))}</div>
    <div><b>${esc(pname(i))}</b><br><small>${fmt(i.p)} × ${i.q}</small><br>
      <button class="qb" onclick="chg(${i.id},-1)" aria-label="-">−</button><button class="qb" onclick="chg(${i.id},1)" aria-label="+">+</button></div>
    <button class="lnk d" onclick="rm(${i.id})">${t('remove')}</button></div>`).join('')
    || `<p style="color:var(--mu);margin-top:20px">${t('emptyCart')}</p>`}</div>
  <div style="padding-top:16px;border-top:1px solid var(--line)">
    <div class="row" style="margin:0 0 8px"><input id="cpn" placeholder="${t('coupon')}" style="padding:8px">
      <button class="btn sm" onclick="coup()">${t('apply')}</button></div>
    ${Q.cp ? `<small style="color:var(--ok)">${t('discountActive')}</small>` : ''}
    <div style="display:flex;justify-content:space-between;margin:8px 0 12px;font-weight:600"><span>${t('total')}</span><span>${fmt(sub - disc)}</span></div>
    <button class="btn" style="width:100%" onclick="startCheckout()">${t('checkout')}</button></div>`;
}
function startCheckout() {
  if (!S.cart.length) return toast(t('emptyCart'));
  if (!S.user) { cart(0); return go('login'); }
  go('checkout');
}

/* ================= favorites, tabs, cards ================= */
function fav(id) {
  const i = Q.fav.indexOf(id);
  i < 0 ? Q.fav.push(id) : Q.fav.splice(i, 1);
  lsSet('fav', Q.fav);
  toast(t(i < 0 ? 'addedToFav' : 'removedFromFav'));
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => { b.textContent = i < 0 ? '♥' : '♡'; b.classList.toggle('on', i < 0); });
  if ((S.v === 'shop' || S.v === 'home') && S.cat === 'fav') shopL();
}
function cardH(p) {
  const low = p.k <= 0 ? t('soldOut') : p.k <= 3 ? t('lowStock') : '';
  return `<div class="pc" onclick="go('product', ${p.id})">
    <div class="pi">${imgTag(p.img, pname(p))}
      <button class="hrt ${Q.fav.includes(p.id) ? 'on' : ''}" data-fav="${p.id}" aria-label="Favorite" onclick="event.stopPropagation();fav(${p.id})">${Q.fav.includes(p.id) ? '♥' : '♡'}</button></div>
    <h3>${esc(pname(p))}</h3>
    <p>${fmt(p.p)}${p.o > p.p ? `<s>${fmt(p.o)}</s>` : ''}</p>
    ${low ? `<span class="low">${low}</span>` : ''}
    <div class="sw">${p.colors.map(c => `<i style="background:${esc(c)}"></i>`).join('')}</div></div>`;
}
function tabsH() {
  if (S.cat === 'fav' && !Q.fav.length) S.cat = 'all';
  const tabs = [['all', t('tAll')], ['men', t('tMen')], ['women', t('tWomen')]];
  if (S.prods.some(p => p.c === CAT.sports)) tabs.push(['sports', t('tSports')]);
  if (Q.fav.length) tabs.push(['fav', t('tFav')]);
  return tabs.map(([k, l]) => `<button class="${S.cat === k ? 'on' : ''}" onclick="setCat('${k}')">${l}</button>`).join('');
}
function fl() {
  const q = Q.q.trim().toLowerCase();
  return S.prods.filter(p =>
    (S.cat === 'all' || (S.cat === 'fav' ? Q.fav.includes(p.id) : p.c === CAT[S.cat])) &&
    (!q || p.n.toLowerCase().includes(q) || (p.n_en || '').toLowerCase().includes(q)) &&
    (!Q.m || p.p <= Q.m)
  ).sort((a, b) => Q.s === 'a' ? a.p - b.p : Q.s === 'd' ? b.p - a.p : Q.s === 'n' ? b.id - a.id : 0);
}
function gridH() {
  if (S.loadError) return `<p class="empty">${t('loadFailed')} <button class="btn sm" onclick="retryLoad()">${t('retry')}</button></p>`;
  let l = fl();
  if (S.v === 'home') l = l.slice(0, 5);
  return l.map(cardH).join('') || `<p class="empty">${t('noProducts')}</p>`;
}
function setCat(k) { S.cat = k; shopL(); }
function shopL() {
  const tb = $('#tabs'), gl = $('#gl');
  if (tb) tb.innerHTML = tabsH();
  if (gl) gl.innerHTML = gridH();
}

/* ================= views ================= */
function diffSection() {
  const img = S.settings.aboutImg || S.prods[3]?.img || S.prods[0]?.img || '';
  return `<section class="diff"><div class="dimg" style="${bg(img)}"><em>${t('builtFor')}</em></div>
    <div class="dtxt"><small>${t('diffKick')}</small><h2>${t('diffTitle')}</h2><p>${t('diffText')}</p>
      <div class="feats"><div>${ICON.shield}${t('f1')}</div><div>${ICON.truck}${t('f2')}</div><div>${ICON.seal}${t('f3')}</div><div>${ICON.headset}${t('f4')}</div></div></div></section>`;
}
function waBand() {
  return `<section class="wab"><div><small>${t('waKick')}</small><h3>${t('waTitle')}</h3><p>${t('waText')}</p></div>
    <div class="act"><span class="wi">${ICON.wa}</span><button class="btn-o" onclick="wa()">${t('waBtn')} ${ICON.arrow}</button></div></section>`;
}

function home() {
  const slides = [1, 2, 3].map((n, i) => {
    const p = S.prods.length ? S.prods[i % S.prods.length] : null;
    return `<div class="hslide ${i === S.hero ? 'on' : ''}"><div class="htxt"><small>${t('kick' + n)}</small><h1>${t('head' + n)}</h1><p>${t('desc' + n)}</p>
      <button class="btn-l" onclick="go('shop')">${t('explore')} ${ICON.arrow}</button></div>
      <div class="himg">${p ? imgTag(p.img, pname(p)) : ''}</div></div>`;
  }).join('');
  return `<section class="hero" style="${bg(S.settings.heroImg)}">${slides}
      <div class="hctr"><span id="hn">0${S.hero + 1}</span><i><b id="hb" style="width:${(S.hero + 1) / 3 * 100}%"></b></i><span>03</span></div>
      <div class="scroll">${t('scrollDown')}<i></i></div></section>
    <div class="tabs" id="tabs">${tabsH()}</div>
    <div class="pgrid-wrap"><div class="pgrid" id="gl">${gridH()}</div>
      <div class="viewall"><button class="btn-o" onclick="go('shop')">${t('viewAll')} ${ICON.arrow}</button></div></div>
    ${diffSection()}${waBand()}`;
}
function heroGo(n) {
  S.hero = n;
  document.querySelectorAll('.hslide').forEach((e, i) => e.classList.toggle('on', i === n));
  const hn = $('#hn'), hb = $('#hb');
  if (hn) hn.textContent = '0' + (n + 1);
  if (hb) hb.style.width = ((n + 1) / 3 * 100) + '%';
}
setInterval(() => { if (S.v === 'home' && $('.hero')) heroGo((S.hero + 1) % 3); }, 6500);

function shop() {
  return `<h1 class="title">${t('shopTitle')}</h1><div class="tabs" id="tabs">${tabsH()}</div>
  <div class="pgrid-wrap"><div class="cd">${t('limitedOffer')} <b id="cd">--:--:--</b> — ${t('couponHint')}</div>
    <div class="filters">
      <input placeholder="${t('search')}" value="${esc(Q.q)}" oninput="Q.q=this.value;shopL()">
      <select onchange="Q.s=this.value;shopL()"><option value="">${t('sortBy')}</option>
        <option value="a" ${Q.s === 'a' ? 'selected' : ''}>${t('priceLow')}</option><option value="d" ${Q.s === 'd' ? 'selected' : ''}>${t('priceHigh')}</option>
        <option value="n" ${Q.s === 'n' ? 'selected' : ''}>${t('newest')}</option></select>
      <select onchange="Q.m=+this.value;shopL()"><option value="0">${t('allPrices')}</option>
        <option value="3500" ${Q.m === 3500 ? 'selected' : ''}>${t('upTo3500')}</option><option value="5000" ${Q.m === 5000 ? 'selected' : ''}>${t('upTo5000')}</option></select></div>
    <div class="pgrid" id="gl">${gridH()}</div></div>`;
}

function product() {
  const p = S.prods.find(x => x.id === S.pid);
  if (!p) return `<div class="auth"><h2>${t('notFound')}</h2><button class="btn" onclick="go('shop')">${t('back')}</button></div>`;
  const d = pdesc(p);
  return `<div class="pd"><div class="big">${imgTag(p.img, pname(p))}</div>
    <div><small>${esc(pcat(p))}</small><h1>${esc(pname(p))}</h1>
      <div class="pp">${fmt(p.p)}${p.o > p.p ? `<s>${fmt(p.o)}</s>` : ''}</div>
      ${p.colors.length ? `<div class="sw">${p.colors.map(c => `<i style="background:${esc(c)}"></i>`).join('')}</div>` : ''}
      ${d ? `<p class="desc">${esc(d)}</p>` : ''}
      <ul>${I.features[L()].map(f => `<li>${f}</li>`).join('')}</ul>
      ${p.k > 0 && p.k <= 3 ? `<p style="color:var(--red);font-size:13px">${t('lowStock')}</p>` : ''}
      <div class="acts"><button class="btn" ${p.k <= 0 ? 'disabled' : ''} onclick="add(${p.id})">${p.k <= 0 ? t('soldOut') : t('addToCart')}</button>
        <button class="btn-o" onclick="waProd(${p.id})">${t('orderWa')}</button>
        <button class="btn ghost" onclick="go('shop')">${t('back')}</button></div></div></div>`;
}

function about() {
  return `<div class="page"><h1>${t('aboutTitle')}</h1><p>${t('diffText')}</p></div>${diffSection()}`;
}
function contact() {
  const st = S.settings;
  const soc = (u, ic, n) => (u && /^https:\/\//i.test(u) ? `<a class="btn-o" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>` : '');
  return `<div class="page"><h1>${t('contactTitle')}</h1><p>${t('contactText')}</p>
    <div class="acts"><button class="btn" onclick="wa()">${t('waBtn')}</button>${soc(st.instagram, ICON.insta, 'Instagram')}${soc(st.tiktok, ICON.tiktok, 'TikTok')}</div></div>${waBand()}`;
}

const enter = fn => `onkeydown="if(event.key==='Enter')${fn}()"`;
function login() {
  return `<div class="auth"><h2>${t('loginTitle')}</h2>
    <p>${t('newHere')} <a href="#/register" onclick="event.preventDefault();go('register')">${t('createLink')}</a></p>
    <input id="em" type="email" autocomplete="username" placeholder="${t('email')}" ${enter('doLogin')}>
    <input id="pw" type="password" autocomplete="current-password" placeholder="${t('password')}" ${enter('doLogin')}>
    <button class="btn" onclick="doLogin()">${t('enter')}</button></div>`;
}
function register() {
  return `<div class="auth"><h2>${t('registerTitle')}</h2>
    <p>${t('haveAccount')} <a href="#/login" onclick="event.preventDefault();go('login')">${t('signInLink')}</a></p>
    <input id="nm" type="text" autocomplete="name" placeholder="${t('fullName')}">
    <input id="em" type="email" autocomplete="username" placeholder="${t('email')}">
    <input id="pw" type="password" autocomplete="new-password" placeholder="${t('password')}" ${enter('doRegister')}>
    <button class="btn" onclick="doRegister()">${t('create')}</button></div>`;
}
async function doLogin() {
  const e = $('#em').value.trim(), p = $('#pw').value;
  if (!e || !p) return toast(t('enterData'));
  const r = await api('/api/auth/login', { method: 'POST', body: { email: e, password: p } });
  if (!r.ok) return toast(errMsg(r));
  S.user = { email: r.data.email, isAdmin: r.data.isAdmin, name: r.data.name };
  S.token = r.data.token;
  localStorage.setItem('token', r.data.token);
  toast(t(r.data.isAdmin ? 'welcomeAdmin' : 'loginSuccess'));
  go(r.data.isAdmin ? 'admin' : 'home');
}
async function doRegister() {
  const nm = $('#nm').value.trim(), e = $('#em').value.trim(), p = $('#pw').value;
  if (!nm || !e || !p) return toast(t('enterData'));
  if (p.length < 6) return toast(t('minPassword'));
  toast(t('creatingAccount'));
  const r = await api('/api/auth/register', { method: 'POST', body: { name: nm, email: e, password: p } });
  if (!r.ok) return toast(errMsg(r));
  toast(t('accountCreated'));
  go('login');
}
function out() { clearSession(); toast(t('loggedOut')); go('home'); }
async function verifyToken() {
  if (!S.token) return;
  const r = await api('/api/auth/verify');
  if (r.ok) S.user = { email: r.data.email, isAdmin: r.data.isAdmin, name: r.data.name };
  else if (r.status === 401) { S.token = null; localStorage.removeItem('token'); }
}

/* ================= image picker + cropper ================= */
function pickImage(aspect, outW, cb) {
  const fi = document.createElement('input');
  fi.type = 'file'; fi.accept = 'image/*';
  fi.onchange = () => {
    const f = fi.files[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) return toast(t('notImage'));
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => openCrop(im, aspect, outW, cb, url);
    im.onerror = () => toast(t('notImage'));
    im.src = url;
  };
  fi.click();
}
function openCrop(im, aspect, outW, cb, objUrl) {
  const outH = Math.round(outW / aspect);
  const el = document.createElement('div');
  el.className = 'md open'; el.id = 'md2';
  el.innerHTML = `<div class="mdb"><h3>${t('cropTitle')}</h3><div class="crop">
    <canvas id="cv" width="${outW}" height="${outH}"></canvas>
    <label style="width:100%;max-width:340px">${t('zoom')}<input id="zm" type="range" min="0.3" max="4" step="0.01" value="1"></label>
    <p class="hint">${t('cropHint')}</p></div>
    <div class="acts"><button class="btn ghost" id="cc">${t('cancel')}</button><button class="btn" id="cu">${t('useImage')}</button></div></div>`;
  document.body.appendChild(el);
  const cv = el.querySelector('#cv'), g = cv.getContext('2d'), zm = el.querySelector('#zm');
  const cover = Math.max(outW / im.width, outH / im.height);
  zm.min = Math.min(1, Math.min(outW / im.width, outH / im.height) / cover).toFixed(2);
  zm.value = 1;
  let f = 1, ox = 0, oy = 0, drag = null;
  const draw = () => {
    g.fillStyle = '#ece8e1'; g.fillRect(0, 0, outW, outH);
    const w = im.width * cover * f, h = im.height * cover * f;
    g.drawImage(im, outW / 2 + ox - w / 2, outH / 2 + oy - h / 2, w, h);
  };
  draw();
  zm.oninput = () => { f = +zm.value; draw(); };
  cv.addEventListener('wheel', e => {
    e.preventDefault();
    f = Math.min(4, Math.max(+zm.min, f - e.deltaY * 0.002)); zm.value = f; draw();
  }, { passive: false });
  cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); drag = { x: e.clientX, y: e.clientY, ox, oy }; };
  cv.onpointermove = e => {
    if (!drag) return;
    const k = outW / cv.getBoundingClientRect().width;
    ox = Math.max(-outW, Math.min(outW, drag.ox + (e.clientX - drag.x) * k));
    oy = Math.max(-outH, Math.min(outH, drag.oy + (e.clientY - drag.y) * k));
    draw();
  };
  cv.onpointerup = cv.onpointercancel = () => { drag = null; };
  const close = () => { URL.revokeObjectURL(objUrl); el.remove(); };
  el.querySelector('#cc').onclick = close;
  el.querySelector('#cu').onclick = async () => {
    const data = cv.toDataURL('image/jpeg', 0.88);
    close();
    toast(t('uploading'));
    const r = await api('/api/uploads', { method: 'POST', body: { data } });
    if (r.ok) cb(r.data.url, data); else toast(r.data?.error || t('uploadFailed'));
  };
}
function pickInto(inputId, pvId, aspect, outW) {
  pickImage(aspect, outW, (url, data) => {
    $('#' + inputId).value = url;
    $('#' + pvId).style.backgroundImage = `url("${data}")`;
  });
}
function clearImg(inputId, pvId) { $('#' + inputId).value = ''; $('#' + pvId).style.backgroundImage = ''; }

/* ================= admin ================= */
const closeMd = () => { $('#md').classList.remove('open'); $('#md').innerHTML = ''; };
let MD = { id: 0 };

function openProd(id) {
  const p = id ? S.prods.find(x => x.id === id) : null;
  MD = { id: id || 0 };
  const v = (x) => esc(x ?? '');
  $('#md').innerHTML = `<div class="mdb"><h3>${t(p ? 'editProduct' : 'addProduct')}</h3>
    <div class="two"><label>${t('watchName')}<input id="f-n" value="${v(p?.n)}"></label><label>${t('watchNameEn')}<input id="f-ne" value="${v(p?.n_en)}"></label></div>
    <div class="two"><label>${t('category')}<select id="f-c">${Object.values(CAT).map(c => `<option value="${c}" ${p?.c === c ? 'selected' : ''}>${c} / ${({ 'رجالي': 'Men', 'نسائي': 'Women', 'رياضي': 'Sports' })[c]}</option>`).join('')}</select></label>
      <label>${t('stock')}<input id="f-k" type="number" min="0" value="${v(p?.k ?? 10)}"></label></div>
    <div class="two"><label>${t('price')}<input id="f-p" type="number" min="1" value="${v(p?.p)}"></label><label>${t('oldPrice')}<input id="f-o" type="number" min="0" value="${v(p?.o || '')}"></label></div>
    <label>${t('colors')}<input id="f-col" placeholder="#111111, #9a9a9a" value="${v((p?.colors || []).join(', '))}"></label>
    <label>${t('descAr')}<textarea id="f-d">${v(p?.d)}</textarea></label>
    <label>${t('descEn')}<textarea id="f-de">${v(p?.d_en)}</textarea></label>
    <div class="imgbox"><div class="pv" id="f-pv" style="${bg(p?.img)}"></div><div class="bt">
      <button class="btn sm" type="button" onclick="pickInto('f-img','f-pv',4/5,800)">${t('chooseImg')}</button>
      <button class="lnk" type="button" onclick="clearImg('f-img','f-pv')">${t('removeImg')}</button></div></div>
    <label>${t('imageUrl')}<input id="f-img" value="${v(p?.img)}"></label>
    <div class="acts"><button class="btn ghost" onclick="closeMd()">${t('cancel')}</button><button class="btn" onclick="saveProdForm()">${t('save')}</button></div></div>`;
  $('#md').classList.add('open');
}
async function saveProdForm() {
  const g = id => $('#' + id).value.trim();
  const body = {
    name: g('f-n'), name_en: g('f-ne') || g('f-n'), category: g('f-c'), price: +g('f-p'), oldPrice: +g('f-o') || 0,
    stock: Math.max(0, Math.floor(+g('f-k') || 0)), colors: g('f-col'), description: g('f-d'), description_en: g('f-de'), img: g('f-img')
  };
  if (!body.name || !body.price) return toast(t('enterData'));
  const r = MD.id ? await api('/api/products/' + MD.id, { method: 'PUT', body }) : await api('/api/products', { method: 'POST', body });
  if (!r.ok) return toast(errMsg(r));
  const m = mapProd(r.data), i = S.prods.findIndex(x => x.id === m.id);
  i >= 0 ? (S.prods[i] = m) : S.prods.push(m);
  closeMd();
  toast(t(MD.id ? 'productUpdated' : 'productAdded'));
  render();
}
async function saveProd(id, field, val) {
  const body = field === 'price' ? { price: +val } : { stock: Math.floor(+val) };
  const r = await api('/api/products/' + id, { method: 'PUT', body });
  if (r.ok) { const i = S.prods.findIndex(x => x.id === id); if (i >= 0) S.prods[i] = mapProd(r.data); toast(t('productUpdated')); }
  else toast(errMsg(r));
  render();
}
async function delP(id) {
  if (!confirm(t('confirmDelete'))) return;
  const r = await api('/api/products/' + id, { method: 'DELETE' });
  if (r.ok) { S.prods = S.prods.filter(p => p.id !== id); S.cart = S.cart.filter(i => i.id !== id); save(); toast(t('productDeleted')); }
  else toast(errMsg(r));
  render();
}
async function saveSettings() {
  const g = id => $('#' + id).value.trim();
  const r = await api('/api/settings', { method: 'PUT', body: {
    whatsapp: g('s-wa'), instagram: g('s-ig'), tiktok: g('s-tt'), heroImg: g('s-hero'), aboutImg: g('s-about')
  } });
  if (r.ok) { S.settings = r.data; toast(t('saved')); render(); } else toast(errMsg(r));
}
async function updateOrderStatus(i, status) {
  const o = S.orders[i];
  if (!o) return;
  const r = await api('/api/orders/' + encodeURIComponent(o.orderId), { method: 'PUT', body: { status: +status } });
  if (r.ok) { o.status = r.data.status; toast(t('updateStatus')); } else toast(errMsg(r));
  render();
}

async function admin() {
  if (!S.user?.isAdmin) return `<div class="auth"><h2>${t('unauthorized')}</h2><p>${t('adminOnly')}</p><button class="btn" onclick="go('login')">${t('login')}</button></div>`;
  if (S.tab === 'ov' || S.tab === 'or') {
    const r = await api('/api/orders');
    if (r.ok) S.orders = r.data; else if (r.status !== 401) toast(errMsg(r));
    if (!S.user?.isAdmin) return admin();
  }
  const tabs = [['ov', t('tOv')], ['pr', t('tPr')], ['or', t('tOr')], ['st', t('tSt')]];
  const orders = S.orders;
  let b = '';

  if (S.tab === 'ov') {
    const sales = orders.reduce((s, o) => s + (o.total || 0), 0);
    const customers = new Set(orders.map(o => o.userEmail)).size;
    const now = new Date();
    const months = [...Array(7)].map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
      return { y: d.getFullYear(), m: d.getMonth(), label: d.toLocaleDateString(loc(), { month: 'short' }), sum: 0 };
    });
    orders.forEach(o => {
      const d = new Date(o.createdAt), m = months.find(x => x.y === d.getFullYear() && x.m === d.getMonth());
      if (m) m.sum += o.total || 0;
    });
    const max = Math.max(...months.map(m => m.sum), 1);
    b = `<div class="kp">${[[t('kSales'), sales, t('currency')], [t('kOrders'), orders.length, ''], [t('kCustomers'), customers, ''], [t('kProducts'), S.prods.length, '']]
      .map(([l, n, u]) => `<div><small>${l}</small><b data-n="${n}">0</b>${u}</div>`).join('')}</div>
      <div class="bars">${months.map((m, i) => `<i style="height:${Math.max(3, m.sum / max * 100)}%;animation-delay:${i * .1}s" data-m="${esc(m.label)}"></i>`).join('')}</div><div style="height:30px"></div>`;
  }
  if (S.tab === 'pr') {
    b = `<div class="row"><button class="btn" onclick="openProd(0)">+ ${t('addProduct')}</button></div>
    <table><tr><th></th><th>${t('watchName')}</th><th>${t('category')}</th><th>${t('price')}</th><th>${t('stock')}</th><th></th></tr>
    ${S.prods.map(p => `<tr><td><img class="tn" src="${esc(IMG_OK.test(p.img) ? p.img : PH)}" alt=""></td>
      <td>${esc(p.n)}<br><small style="color:var(--mu)">${esc(p.n_en)}</small></td><td>${esc(p.c)}</td>
      <td><input type="number" min="1" value="${p.p}" style="width:100px" onchange="saveProd(${p.id},'price',this.value)"></td>
      <td><input type="number" min="0" value="${p.k}" style="width:80px;${p.k <= 3 ? 'border-color:var(--red)' : ''}" onchange="saveProd(${p.id},'stock',this.value)">
        ${p.k <= 3 ? `<span class="tag">${t('lowStock')}</span>` : ''}</td>
      <td style="white-space:nowrap"><button class="lnk" onclick="openProd(${p.id})">${t('edit')}</button> &nbsp; <button class="lnk d" onclick="delP(${p.id})">${t('del')}</button></td></tr>`).join('')}</table>`;
  }
  if (S.tab === 'or') {
    const ST = I.status[L()];
    b = `<table><tr><th>${t('orderCol')}</th><th>${t('customerCol')}</th><th>${t('valueCol')}</th><th>${t('dateCol')}</th><th>${t('statusCol')}</th></tr>
    ${orders.map((o, i) => `<tr><td>${esc(o.orderId)}</td><td>${esc(o.userName)}<br><small>${esc(o.userPhone)}</small></td><td>${fmt(o.total)}</td>
      <td>${new Date(o.createdAt).toLocaleDateString(loc())}</td>
      <td><select onchange="updateOrderStatus(${i}, this.value)">${ST.map((x, j) => `<option value="${j}" ${o.status === j ? 'selected' : ''}>${x}</option>`).join('')}</select></td></tr>`).join('')}</table>`;
  }
  if (S.tab === 'st') {
    const st = S.settings, v = x => esc(x || '');
    b = `<div class="box" style="max-width:560px;display:grid;gap:14px">
      <label>${t('whatsappNum')}<input id="s-wa" value="${v(st.whatsapp)}" inputmode="numeric"></label>
      <label>${t('instagramUrl')}<input id="s-ig" value="${v(st.instagram)}"></label>
      <label>${t('tiktokUrl')}<input id="s-tt" value="${v(st.tiktok)}"></label>
      <div><div style="font-size:13px;margin-bottom:6px">${t('heroImage')}</div><div class="imgbox"><div class="pv wide" id="s-hero-pv" style="${bg(st.heroImg)}"></div>
        <div class="bt"><button class="btn sm" onclick="pickInto('s-hero','s-hero-pv',16/9,1600)">${t('chooseImg')}</button><button class="lnk" onclick="clearImg('s-hero','s-hero-pv')">${t('removeImg')}</button></div></div>
        <input id="s-hero" type="hidden" value="${v(st.heroImg)}"></div>
      <div><div style="font-size:13px;margin-bottom:6px">${t('aboutImage')}</div><div class="imgbox"><div class="pv wide" id="s-about-pv" style="${bg(st.aboutImg)}"></div>
        <div class="bt"><button class="btn sm" onclick="pickInto('s-about','s-about-pv',1,1000)">${t('chooseImg')}</button><button class="lnk" onclick="clearImg('s-about','s-about-pv')">${t('removeImg')}</button></div></div>
        <input id="s-about" type="hidden" value="${v(st.aboutImg)}"></div>
      <div><button class="btn" onclick="saveSettings()">${t('save')}</button></div></div>`;
  }
  return `<div class="adm"><div class="side">${tabs.map(([k, l]) => `<button class="${S.tab === k ? 'on' : ''}" onclick="S.tab='${k}';render()">${l}</button>`).join('')}</div><div class="cont">${b}</div></div>`;
}
function count() {
  document.querySelectorAll('[data-n]').forEach(e => {
    const n = +e.dataset.n, t0 = performance.now();
    (function f(now) {
      const k = Math.min(1, (now - t0) / 1100);
      e.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString(loc());
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  });
}

/* ================= checkout & orders ================= */
function track(s) {
  return `<div class="trk">${I.status[L()].map((x, i) => `<div class="${i <= s ? 'on' : ''}"><i></i><small>${x}</small></div>`).join('')}</div>`;
}
function checkoutView() {
  if (!S.cart.length || !cartLines().length) return `<div class="auth"><h2>${t('emptyCart')}</h2><button class="btn" onclick="go('shop')">${t('shopNow')}</button></div>`;
  const { lines } = totals(50);
  setTimeout(updTotal, 0);
  return `<div class="auth" style="max-width:560px"><h2>${t('checkout')}</h2>
    <input id="nm" autocomplete="name" placeholder="${t('fullName')}" value="${esc(S.user.name || '')}">
    <input id="ph" type="tel" autocomplete="tel" placeholder="${t('phone')}">
    <input id="ad" autocomplete="street-address" placeholder="${t('address')}">
    <select id="sh" onchange="updTotal()"><option value="50">${t('shipNormal')}</option><option value="120">${t('shipFast')}</option></select>
    <select id="pm"><option>${t('cod')}</option><option disabled>${t('card')}</option></select>
    <p>${lines.map(i => esc(pname(i)) + ' × ' + i.q).join(' · ')}</p><div id="sum"></div>
    <button class="btn" id="placeBtn" onclick="place()">${t('placeOrder')}</button></div>`;
}
function updTotal() {
  const el = $('#sum'), sh = $('#sh');
  if (!el || !sh) return;
  const x = totals(+sh.value);
  el.innerHTML = `<p>${t('subtotal')}: ${fmt(x.sub)}</p>${x.disc ? `<p>${t('discount')}: − ${fmt(x.disc)}</p>` : ''}<p>${t('shipping')}: ${fmt(x.ship)}</p>
    <p style="color:var(--tx);font-weight:600;font-size:18px">${t('total')}: ${fmt(x.total)}</p>`;
}
let placing = false;
async function place() {
  if (placing) return;
  const nm = $('#nm').value.trim(), ph = $('#ph').value.trim(), ad = $('#ad').value.trim();
  if (!nm || !ph || !ad) return toast(t('completeData'));
  if (!/^[0-9+\-\s()]{7,20}$/.test(ph)) return toast(t('badPhone'));
  placing = true;
  const btn = $('#placeBtn'); btn.disabled = true;
  const r = await api('/api/orders', { method: 'POST', body: {
    userName: nm, userPhone: ph, userAddress: ad, shipping: +$('#sh').value,
    coupon: Q.cp ? 'ALANO10' : '', items: S.cart.map(i => ({ id: i.id, qty: i.q }))
  } });
  placing = false;
  if (!r.ok) {
    btn.disabled = false;
    toast(r.data?.error || t('orderFailed'));
    if (r.status === 409 || r.status === 400) loadProducts();
    return;
  }
  Q.last = r.data; S.cart = []; Q.cp = 0; save();
  loadProducts();
  go('done');
}
async function done() {
  if (!Q.last) return orders();
  return `<div class="auth" style="text-align:center"><h2>${t('orderConfirmed')}</h2><p>${t('orderNumber')} ${esc(Q.last.orderId)}</p>${track(Q.last.status)}
    <button class="btn" onclick="go('orders')">${t('trackOrders')}</button></div>`;
}
async function orders() {
  if (!S.user) return login();
  const r = await api('/api/orders/my');
  if (!r.ok) { toast(t('ordersError')); return `<div class="ordpage"><h2>${t('myOrders')}</h2><p>${t('ordersError')}</p></div>`; }
  return `<div class="ordpage"><h2>${t('myOrders')}</h2><p style="color:var(--mu);margin-bottom:20px">${esc(S.user.email)}</p>
    ${r.data.map(o => `<div class="box"><b>${esc(o.orderId)}</b> — ${fmt(o.total)}
      <small style="display:block;color:var(--mu);margin-top:4px">${(o.items || []).map(i => esc(lang === 'ar' ? i.name : (i.name_en || i.name)) + ' × ' + i.qty).join(' · ')}</small>${track(o.status)}</div>`).join('') || `<p>${t('noOrders')}</p>`}</div>`;
}

const VIEWS = { home, shop, product, about, contact, login, register, admin, checkout: checkoutView, orders, done };

/* ================= toast & countdown ================= */
let toastTimer;
function toast(m) {
  const el = $('#ts');
  el.textContent = m;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 2600);
}
function cdEnd() {
  let e = +localStorage.getItem('cdEnd') || 0;
  if (e < Date.now()) { e = Date.now() + 8 * 36e5; try { localStorage.setItem('cdEnd', e); } catch (x) {} }
  return e;
}
setInterval(() => {
  const el = $('#cd');
  if (!el) return;
  const s = Math.max(0, cdEnd() - Date.now()) / 1e3 | 0;
  el.textContent = [s / 3600 | 0, s / 60 % 60 | 0, s % 60].map(x => String(x | 0).padStart(2, '0')).join(':');
}, 1000);

/* ================= data & init ================= */
async function loadProducts() {
  const r = await api('/api/products');
  if (r.ok && Array.isArray(r.data)) { S.prods = r.data.map(mapProd); S.loadError = false; } else S.loadError = true;
}
async function loadSettings() {
  const r = await api('/api/settings');
  if (r.ok && r.data) S.settings = r.data;
}
async function retryLoad() { await loadProducts(); render(); }

async function init() {
  await Promise.all([verifyToken(), loadProducts(), loadSettings()]);
  const { v, id } = parseHash();
  if (id) S.pid = id;
  S.v = guard(v);
  await render();
}
init();
