import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import AddToCartPanel from "@/components/AddToCartPanel";

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-teal-light">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-ink/50">{product.category}</span>
          <h1 className="mt-2 font-display text-3xl font-600 text-ink">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-2xl font-semibold text-ink">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="font-mono text-lg text-ink/40 line-through">₹{product.mrp}</span>
            )}
          </div>
          <p className="mt-5 leading-relaxed text-ink/70">{product.description}</p>
          <p className="mt-3 text-sm text-teal-dark">
            {product.stock > 0 ? `स्टॉक में (${product.stock} उपलब्ध)` : "स्टॉक में नहीं है"}
          </p>
          <AddToCartPanel product={product} />
        </div>
      </div>
    </div>
  );
  }
