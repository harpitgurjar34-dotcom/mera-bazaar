"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id");

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-light text-3xl text-teal">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl font-600 text-ink">ऑर्डर हो गया कन्फ़र्म!</h1>
      <p className="mt-3 text-ink/70">
        आपका पेमेंट सफलतापूर्वक हो गया है। जल्द ही आपको ऑर्डर की जानकारी SMS/ईमेल पर मिलेगी।
      </p>
      {paymentId && (
        <p className="mt-4 font-mono text-sm text-ink/50">पेमेंट ID: {paymentId}</p>
      )}
      <Link
        href="/"
        className="focus-ring mt-8 inline-block rounded-full bg-teal px-6 py-2.5 font-medium text-white hover:bg-teal-dark"
      >
        शॉपिंग जारी रखें
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
  }
