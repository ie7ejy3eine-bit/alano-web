# إعداد MongoDB Atlas

1. أنشئ حساب على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) واختر الخطة المجانية (Shared / M0) وأنشئ Cluster (مثلاً `alano-cluster`).
2. **Database Access:** أضف مستخدم (مثلاً `alano_admin`) بكلمة مرور قوية، بصلاحية Read and write.
3. **Network Access:** أضف عنوان IP.
   - للتجربة المحلية: IP بتاعك.
   - للاستضافة: لو مزوّد الاستضافة IP بتاعه مش ثابت هتضطر تستخدم `0.0.0.0/0`. ده مقبول للتجربة فقط، وفي الإنتاج الأفضل IP محدد مع كلمة مرور قوية جدًا.
4. **Connect → Drivers:** انسخ الـ Connection String.
5. حط اسم قاعدة البيانات `alano` في آخر الرابط، وحطه في `.env`:

```env
MONGODB_URI=mongodb+srv://alano_admin:YOUR_PASSWORD@alano-cluster.xxxxx.mongodb.net/alano
```

> لو كلمة المرور فيها رموز خاصة (`@ : / ?`) لازم تتحوّل بـ URL-encoding.

6. شغّل `npm start`. لازم تشوف:

```
✓ Connected to MongoDB
✓ Seeded initial products
🚀 Server running on port 3000
```

## مشاكل شائعة
- **Authentication failed:** راجع اسم المستخدم وكلمة المرور (والـ encoding).
- **Timeout / IP not allowed:** راجع Network Access.
- السيرفر بيقف برسالة خطأ لو الاتصال فشل (بدل ما يشتغل بـ API مكسور).

## أمان
- لا ترفع `.env` على GitHub.
- فعّل المصادقة الثنائية على حساب Atlas.
