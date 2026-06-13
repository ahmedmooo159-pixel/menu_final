# بيتزا لذة الملوك — Digital Menu

قائمة منيو رقمية حديثة لمطعم **بيتزا لذة الملوك**، مصممة للعمل على GitHub Pages وفتحها عبر QR Code.

## المميزات

- تصميم متجاوب (موبايل، تابلت، ديسktop)
- 14 قسم منيو مع كل الأصناف والأسعار
- بحث سريع بالاسم
- تنقل بين الأقسام بدون إعادة تحميل
- أزرار واتساب وفيسبوك
- تحميل سريع مع lazy loading للصور

## هيكل المجلدات

```
/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js          ← عدّل الأسعار هنا فقط
│   ├── main.js
│   └── animations.js
└── assets/
    ├── logo/
    │   └── logo.svg     ← ضع هنا الشعار
    ├── images/          ← ضع هنا صور الأطباق
    └── icons/
        └── favicon.svg
```

## كيفية تعديل الأسعار

1. افتح ملف `js/data.js`
2. ابحث عن الصنف المطلوب
3. عدّل `price` (سعر واحد) أو `prices: { L, M, S }` (مقاسات)
4. احفظ الملف — لا حاجة لتعديل أي ملف آخر

## كيفية تغيير الشعار

1. ضع صورة الشعار في `assets/logo/logo.svg` (أو `.png`)
2. أو غيّر المسار في `js/data.js` → `restaurant.logo`

## كيفية استبدال الصور

1. ضع صور الأطباق في `assets/images/`
2. عدّل مسار `image` لكل صنف في `js/data.js`
3. استخدم نفس اسم الملف أو حدّث المسار في البيانات

## روابط التواصل

في `js/data.js` → `SOCIAL_LINKS`:

```javascript
const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/201034356136", // ضع هنا رابط الواتساب
  facebook: " https://www.facebook.com/share/1EJoeVnCjk/?mibextid=wwXIfr", // ضع هنا رابط الفيسبوك
};
```

## النشر على GitHub Pages

1. أنشئ repository جديد على GitHub
2. ارفع كل ملفات المشروع
3. اذهب إلى **Settings → Pages**
4. **Source:** Branch `main` — Folder `/ (root)`
5. انتظر دقيقة، الرابط: `https://username.github.io/repo-name/`
6. أنشئ QR Code للرابط

## التشغيل محلياً

افتح `index.html` مباشرة في المتصفح، أو:

```powershell
start index.html
```

## معلومات المطعم

- **الاسم:** بيتزا لذة الملوك
- **الهاتف:** 01034356136 | 01123889069 | 01034352138
- **العنوان:** سوق المنطقة السابعة بجوار ماركت أبو غزالة

---

© بيتزا لذة الملوك — جميع الحقوق محفوظة
