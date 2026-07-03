# मेरा बाज़ार — Razorpay के साथ पूरी शॉपिंग साइट

Next.js में बनी एक पूरी ई-कॉमर्स साइट: प्रोडक्ट लिस्टिंग, कार्ट, चेकआउट और **असली Razorpay पेमेंट**।

## इसमें क्या है

- होमपेज पर सभी प्रोडक्ट (कपड़े, इलेक्ट्रॉनिक्स, घरेलू सामान, किराना — मिक्स कैटेगरी)
- प्रोडक्ट डिटेल पेज
- कार्ट (localStorage में सेव होता है, पेज रीलोड पर नहीं मिटता)
- चेकआउट फॉर्म + Razorpay का सिक्योर पेमेंट पॉपअप
- सर्वर-साइड पेमेंट सिग्नेचर वेरिफिकेशन (ताकि कोई पेमेंट को फ़र्ज़ी तरीके से "सफल" न दिखा सके)

## शुरू करने से पहले: Razorpay अकाउंट बनाएं

1. https://dashboard.razorpay.com/signup पर जाकर अकाउंट बनाएं
2. **Test Mode** में रहते हुए Settings → API Keys से `Key Id` और `Key Secret` जनरेट करें
3. असली पेमेंट लेने के लिए बाद में KYC पूरा करके **Live Mode** में keys generate करनी होंगी

## लोकल में चलाना

```bash
npm install
cp .env.local.example .env.local
```

अब `.env.local` फ़ाइल खोलकर अपनी असली Razorpay keys डालें:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

फिर:

```bash
npm run dev
```

http://localhost:3000 पर साइट खुल जाएगी। Test mode में पेमेंट टेस्ट करने के लिए Razorpay का टेस्ट कार्ड इस्तेमाल करें:
कार्ड नंबर `4111 1111 1111 1111`, कोई भी future expiry, कोई भी CVV।

## डिप्लॉय कैसे करें (Vercel — सबसे आसान तरीका)

1. इस फ़ोल्डर को GitHub पर एक नए रिपॉज़िटरी में push करें
2. https://vercel.com पर जाकर "New Project" से वह रिपॉज़िटरी import करें
3. Environment Variables सेक्शन में तीनों keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`) डालें
4. Deploy दबाएं — कुछ ही मिनट में आपकी साइट लाइव हो जाएगी

## असली (Live) पेमेंट शुरू करने से पहले

- Razorpay डैशबोर्ड में KYC/बिज़नेस वेरिफिकेशन पूरा करें
- Test keys को Live keys से बदलें
- अपने प्रोडक्ट्स `lib/products.js` में असली डेटा से अपडेट करें, या किसी डेटाबेस (जैसे Supabase, MongoDB) से जोड़ें
- ऑर्डर की जानकारी सेव करने के लिए एक डेटाबेस जोड़ें — अभी ऑर्डर कहीं सेव नहीं होते, सिर्फ पेमेंट होता है
  (`app/api/verify-payment/route.js` में TODO कमेंट देखें — वहीं डेटाबेस सेव करने का लॉजिक जोड़ें)
- ऑर्डर कन्फ़र्मेशन ईमेल/SMS भेजने के लिए कोई सर्विस (जैसे Resend, Twilio) जोड़ें

## प्रोजेक्ट स्ट्रक्चर

```
app/
  page.js                    → होमपेज (प्रोडक्ट लिस्टिंग)
  product/[id]/page.jsx      → प्रोडक्ट डिटेल पेज
  cart/page.jsx              → कार्ट पेज
  checkout/page.jsx          → चेकआउट + Razorpay पेमेंट
  order-success/page.jsx     → पेमेंट सफल होने पर
  api/create-order/route.js  → Razorpay ऑर्डर बनाने वाला API
  api/verify-payment/route.js→ पेमेंट सिग्नेचर वेरिफाई करने वाला API
lib/
  products.js                → प्रोडक्ट डेटा (यहां अपने प्रोडक्ट डालें)
  cart-context.jsx           → कार्ट का state management
components/
  Navbar.jsx, ProductCard.jsx, AddToCartPanel.jsx
```

## प्रोडक्ट कैसे जोड़ें/बदलें

`lib/products.js` खोलें और उसी फ़ॉर्मेट में नए प्रोडक्ट जोड़ें या मौजूदा बदलें। बड़ी कैटलॉग के लिए इसे डेटाबेस से बदलने की सलाह दी जाती है।
