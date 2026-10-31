# Alano - متجر ساعات فاخرة

متجر إلكتروني (Node.js + Express + MongoDB) بواجهة عربية RTL مع إنجليزي، سلة، طلبات، ولوحة تحكم للمدير.

## المتطلبات
- Node.js 18 أو أحدث
- قاعدة MongoDB (مثلاً Atlas المجاني، شوف `MONGODB_SETUP.md`)

## التشغيل المحلي (بدء سريع)

```bash
npm install
npm run setup      # ينشئ .env ويولّد JWT_SECRET عشوائي
```

افتح `.env` وعدّل:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/alano
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=كلمة-مرور-قوية-8-أحرف-على-الأقل
```

ثم:

```bash
npm start          # أو npm run dev أثناء التطوير
```

افتح http://localhost:3000

- المنتجات الأولية بتتضاف **تلقائيًا** أول مرة (لو الجدول فاضي). مفيش `/api/seed`.
- حساب المدير بيتعمل تلقائيًا من `ADMIN_EMAIL` و`ADMIN_PASSWORD`. مفيش بيانات دخول ثابتة في الكود.
- أي حد يسجّل من الموقع بيبقى عميل عادي دايمًا.

## إدارة المحتوى من لوحة التحكم
- **المنتجات:** إضافة وتعديل كل البيانات (الاسم عربي/إنجليزي، الفئة، السعر، المخزون، الألوان، الوصف) وحذف.
- **الصور:** زر "اختيار صورة من الجهاز" يفتح ملفات جهازك، وبعد الاختيار تظهر نافذة لضبط الصورة (سحب + شريط تكبير وتصغير)، ثم تُرفع وتتخزن في MongoDB.
- **إعدادات الموقع:** رقم واتساب، روابط انستجرام وتيك توك، صورة خلفية الهيرو، وصورة قسم الجودة.

## متغيرات اختيارية
- `RESEED=true` يمسح المنتجات ويعيد زرع المنتجات التجريبية الجديدة عند التشغيل. شغّله مرة واحدة ثم احذفه.

## هيكل المشروع

```
alano-watch-store/
├── server.js
├── package.json
├── setup.js
├── .env.example
├── .gitignore
├── README.md / MONGODB_SETUP.md / BONTO_DEPLOY.md
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

## API

| Method | Path | الصلاحية |
|---|---|---|
| GET | `/api/products`, `/api/products/:id` | عام |
| POST/PUT/DELETE | `/api/products[/:id]` | مدير |
| POST | `/api/auth/register`, `/api/auth/login` | عام (محدود المحاولات) |
| GET | `/api/auth/verify` | مسجّل |
| POST | `/api/orders` | مسجّل (السيرفر يحسب الأسعار والخصم والشحن والمخزون) |
| GET | `/api/orders/my` | مسجّل (طلباته هو فقط) |
| GET | `/api/orders` | مدير |
| PUT | `/api/orders/:id` | مدير (الحالة من 0 إلى 3) |
| POST | `/api/uploads` | مدير (رفع صورة) |
| GET | `/api/images/:id` | عام |
| GET/PUT | `/api/settings` | عام / مدير |
| GET | `/api/health` | عام |

## ملاحظات
- كلمات المرور متخزنة بـ bcrypt. الحسابات القديمة بنص عادي بتتحوّل لـ hash تلقائيًا عند أول دخول.
- في الإنتاج لازم `JWT_SECRET` (16 حرف على الأقل) وإلا السيرفر مش هيشتغل.
- الدفع حاليًا عند الاستلام فقط. الدفع بالبطاقة محتاج بوابة دفع حقيقية.
- المنتجات والأسعار والمخزون بتتعدل من لوحة التحكم وبتتحفظ في قاعدة البيانات.

## الترخيص
MIT
