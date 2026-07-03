"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function AddToCartPanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center rounded-full border border-ink/15">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="focus-ring h-10 w-10 rounded-full text-lg text-ink/70 hover:text-ink"
          aria-label="मात्रा घटाएं"
        >
          −
        </button>
        <span className="w-8 text-center font-mono">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="focus-ring h-10 w-10 rounded-full text-lg text-ink/70 hover:text-ink"
          aria-label="मात्रा बढ़ाएं"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addItem(product, quantity)}
        className="focus-ring rounded-full bg-teal px-6 py-2.5 font-medium text-white hover:bg-teal-dark"
      >
        कार्ट में डालें
      </button>
      <button
        onClick={() => {
          addItem(product, quantity);
          router.push("/checkout");
        }}
        className="focus-ring rounded-full border border-clay px-6 py-2.5 font-medium text-clay hover:bg-clay-light"
      >
        अभी खरीदें
      </button>
    </div>
  );
}
