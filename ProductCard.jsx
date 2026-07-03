"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5">
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-teal-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-clay px-2.5 py-1 font-mono text-xs text-white">
            {discount}% छूट
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs uppercase tracking-wide text-ink/50">{product.category}</span>
        <Link href={`/product/${product.id}`} className="focus-ring">
          <h3 className="font-display text-lg leading-snug text-ink line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-lg font-semibold text-ink">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="font-mono text-sm text-ink/40 line-through">₹{product.mrp}</span>
          )}
        </div>
        <button
          onClick={() => addItem(product, 1)}
          className="focus-ring mt-2 rounded-full bg-teal px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-dark"
        >
          कार्ट में डालें
        </button>
      </div>
    </div>
  );
}
