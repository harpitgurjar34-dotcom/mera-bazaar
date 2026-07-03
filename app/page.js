import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <section className="mb-10 rounded-3xl bg-teal-light px-8 py-12 text-center">
        <h1 className="font-display text-3xl font-600 text-ink sm:text-4xl">
          हर ज़रूरत का सामान, एक ही बाज़ार में
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          कपड़े, इलेक्ट्रॉनिक्स, घरेलू सामान और किराना — भरोसेमंद क्वालिटी, सीधे आपके घर तक।
        </p>
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
