import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, error: "ज़रूरी जानकारी गायब है" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({ verified: false, error: "सिग्नेचर मेल नहीं खाता" }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("पेमेंट वेरिफिकेशन में गड़बड़ी:", err);
    return NextResponse.json({ verified: false, error: "वेरिफिकेशन फेल हुआ" }, { status: 500 });
  }
  }
