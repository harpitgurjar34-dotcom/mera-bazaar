import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

export const metadata = {
  title: "मेरा बाज़ार — आपकी रोज़मर्रा की शॉपिंग साइट",
  description: "कपड़े, इलेक्ट्रॉनिक्स, घरेलू सामान और किराना — एक ही जगह पर।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={`${fraunces.variable} ${inter.variable} ${jbmono.variable} font-body`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
