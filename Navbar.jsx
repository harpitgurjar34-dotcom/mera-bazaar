"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl font-600 tracking-tight text-ink focus-ring">
          मेरा <span className="text-teal">बाज़ार</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-ink/70 hover:text-ink focus-ring">
            सभी प्रोडक्ट
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:border-teal hover:text-teal focus-ring"
          >
            कार्ट
            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 font-mono text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
