// Replace this with your real product data, or fetch it from a database
// (e.g. MongoDB, Supabase, PlanetScale) as your catalog grows.

export const products = [
  {
    id: "p1",
    name: "हाथ से बुना हुआ कॉटन कुर्ता",
    category: "कपड़े",
    price: 899,
    mrp: 1299,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    description: "100% शुद्ध कॉटन से बना आरामदायक कुर्ता, रोज़ाना पहनने के लिए बेहतरीन।",
    stock: 24,
  },
  {
    id: "p2",
    name: "वायरलेस ब्लूटूथ ईयरबड्स",
    category: "इलेक्ट्रॉनिक्स",
    price: 1499,
    mrp: 2499,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    description: "30 घंटे की बैटरी लाइफ़ और नॉइज़ कैंसिलेशन के साथ प्रीमियम साउंड क्वालिटी।",
    stock: 40,
  },
  {
    id: "p3",
    name: "स्टेनलेस स्टील टिफ़िन बॉक्स (3-लेयर)",
    category: "घरेलू सामान",
    price: 649,
    mrp: 899,
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800",
    description: "लीक-प्रूफ़ और लंबे समय तक चलने वाला टिफ़िन, ऑफिस और स्कूल के लिए परफेक्ट।",
    stock: 60,
  },
  {
    id: "p4",
    name: "ऑर्गेनिक असम चाय पत्ती (500g)",
    category: "किराना",
    price: 349,
    mrp: 449,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800",
    description: "बागान से सीधे आई ताज़ा असम चाय, कड़क और खुशबूदार।",
    stock: 100,
  },
  {
    id: "p5",
    name: "योगा मैट (एंटी-स्लिप, 6mm)",
    category: "फिटनेस",
    price: 799,
    mrp: 1099,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    description: "एक्स्ट्रा कुशनिंग के साथ टिकाऊ और एंटी-स्लिप योगा मैट।",
    stock: 35,
  },
  {
    id: "p6",
    name: "LED डेस्क लैंप (टच कंट्रोल)",
    category: "घरेलू सामान",
    price: 1099,
    mrp: 1599,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    description: "3 ब्राइटनेस मोड और टच कंट्रोल के साथ आंखों के लिए आरामदायक रोशनी।",
    stock: 18,
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
