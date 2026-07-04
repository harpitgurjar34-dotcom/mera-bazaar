import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", receipt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "अमान्य राशि" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `order_rcpt_${Date.now()}`,
    });

    return NextResponse.json({ order });
  } catch (err) {
    console.error("Razorpay order बनाने में गड़बड़ी:", err);
    return NextResponse.json({ error: "ऑर्डर नहीं बन पाया" }, { status: 500 });
  }
}
