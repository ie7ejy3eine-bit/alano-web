# الرفع على منصة الاستضافة (Bonto)

> ⚠️ المميزات والحدود والروابط الخاصة بـ Bonto (مثل ساعات التشغيل المجانية ووقت الـ sleep) كانت في الدليل القديم ولم أتأكد منها. راجع وثائق المنصة الرسمية قبل الاعتماد عليها. الخطوات التالية تنطبق على أي استضافة Node.js.

## 1) جهّز المشروع
- المشروع لازم يحتوي على: `server.js` و`package.json` ومجلد `public/` (فيه `index.html` و`style.css` و`app.js`).
- **لا ترفع `.env`**. وحط القيم في Environment Variables.

## 2) ارفع الكود (الأفضل Git)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/alano-watch-store.git
git push -u origin main
```

ثم في المنصة: New Project → Node.js → Import from Git → اختر المستودع.

## 3) Environment Variables

```
MONGODB_URI=mongodb+srv://alano_admin:YOUR_PASSWORD@alano-cluster.xxxxx.mongodb.net/alano
JWT_SECRET=<نص عشوائي طويل>
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<كلمة مرور قوية>
NODE_ENV=production
```

- ولّد `JWT_SECRET` بالأمر: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- متحطش `PORT` يدويًا إلا لو المنصة طلبت، لأن أغلب المنصات بتحدده لوحدها.

## 4) الأوامر
- Install: `npm install`
- Start: `npm start`

## 5) أول تشغيل
- المنتجات وحساب المدير بيتعملوا تلقائيًا. **مفيش `/api/seed`**.
- ادخل بـ `ADMIN_EMAIL` و`ADMIN_PASSWORD` من صفحة الدخول.

## 6) دومين مخصص (اختياري)
أضف الدومين من إعدادات المنصة، ثم أضف سجل CNAME عند مزود الدومين بالقيمة اللي المنصة تعطيها لك.

## مشاكل شائعة
- **السيرفر مش بيشتغل:** شوف الـ Logs. غالبًا `MONGODB_URI` غلط أو `JWT_SECRET` ناقص (في الإنتاج السيرفر بيقف عمدًا لو ناقص).
- **MongoDB connection error:** راجع Network Access في Atlas.
- **صفحة فاضية:** تأكد إن `index.html` و`app.js` و`style.css` جوه `public/`.
- **أول طلب بطيء:** بعض الخطط المجانية بتنيّم التطبيق بعد فترة خمول.
