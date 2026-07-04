"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, hydrated } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">आपका कार्ट खाली है</h1>
        <p className="mt-2 text-ink/60">कुछ प्रोडक्ट जोड़ें और यहाँ वापस आएं।</p>
        <Link
          href="/"
          className="focus-ring mt-6 inline-block rounded-full bg-teal px-6 py-2.5 font-medium text-white hover:bg-teal-dark"
        >
          शॉपिंग शुरू करें
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-600 text-ink">आपका कार्ट</h1>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-teal-light">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-base text-ink">{item.name}</h3>
              <p className="font-mono text-sm text-ink/60">₹{item.price}</p>
            </div>
            <div className="flex items-center rounded-full border border-ink/15">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="focus-ring h-9 w-9 rounded-full text-ink/70 hover:text-ink"
                aria-label="मात्रा घटाएं"
              >
                −
              </button>
              <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="focus-ring h-9 w-9 rounded-full text-ink/70 hover:text-ink"
                aria-label="मात्रा बढ़ाएं"
              >
                +
              </button>
            </div>
            <span className="w-20 text-right font-mono font-medium text-ink">
              ₹{item.price * item.quantity}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="focus-ring text-sm text-clay hover:underline"
            >
              हटाएं
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-teal-light px-6 py-5">
        <span className="font-display text-lg text-ink">कुल राशि</span>
        <span className="font-mono text-xl font-semibold text-ink">₹{subtotal}</span>
      </div>

      <Link
        href="/checkout"
        className="focus-ring mt-6 block w-full rounded-full bg-teal py-3 text-center font-medium text-white hover:bg-teal-dark"
      >
        चेकआउट पर जाएं
      </Link>
    </div>
  );
         }
