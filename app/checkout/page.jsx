"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handlePayment(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.address) {
      setError("कृपया नाम, फ़ोन नंबर और पता भरें।");
      return;
    }
    if (items.length === 0) {
      setError("आपका कार्ट खाली है।");
      return;
    }

    setLoading(true);
    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, receipt: `rcpt_${Date.now()}` }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "ऑर्डर नहीं बन पाया");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "मेरा बाज़ार",
        description: "ऑर्डर पेमेंट",
        order_id: orderData.order.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#0F6E62" },
        handler: async function (response) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            clearCart();
            router.push(`/order-success?payment_id=${response.razorpay_payment_id}`);
          } else {
            setError("पेमेंट वेरिफाई नहीं हो पाया। कृपया सपोर्ट से संपर्क करें।");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError("पेमेंट फेल हो गया: " + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "कुछ गड़बड़ हो गई, दोबारा कोशिश करें।");
      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="font-display text-3xl font-600 text-ink">चेकआउट</h1>

        <form onSubmit={handlePayment} className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-ink/70">पूरा नाम</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="focus-ring mt-1 w-full rounded-xl border border-ink/15 px-4 py-2.5"
                placeholder="राहुल शर्मा"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">ईमेल (वैकल्पिक)</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="focus-ring mt-1 w-full rounded-xl border border-ink/15 px-4 py-2.5"
                placeholder="rahul@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">फ़ोन नंबर</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="focus-ring mt-1 w-full rounded-xl border border-ink/15 px-4 py-2.5"
                placeholder="98765 43210"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">पूरा पता</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="focus-ring mt-1 w-full rounded-xl border border-ink/15 px-4 py-2.5"
                placeholder="मकान नं., गली, शहर, पिनकोड"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 h-fit">
            <h2 className="font-display text-lg text-ink">ऑर्डर सारांश</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-ink/70">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-mono">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-ink/10 pt-2 text-sm text-ink/70">
              <span>शिपिंग</span>
              <span className="font-mono">{shipping === 0 ? "मुफ़्त" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-2 font-medium text-ink">
              <span>कुल राशि</span>
              <span className="font-mono">₹{total}</span>
            </div>

            {error && <p className="text-sm text-clay">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-2 rounded-full bg-teal py-3 font-medium text-white hover:bg-teal-dark disabled:opacity-60"
            >
              {loading ? "प्रोसेस हो रहा है…" : `₹${total} का पेमेंट करें`}
            </button>
            <p className="text-center text-xs text-ink/50">
              पेमेंट Razorpay द्वारा सुरक्षित रूप से संसाधित किया जाता है।
            </p>
          </div>
        </form>
      </div>
    </>
  );
    }
