import { NextResponse } from "next/server";
import type { PostEventData } from "@/lib/marble-types";
import { verifySignature, handleWebhookEvent } from "@/lib/marble-webhook";

export async function POST(request: Request) {
  const signature = request.headers.get("x-marble-signature");
  const secret = process.env.MARBLE_WEBHOOK_SECRET;

  // Basic checks: signature + secret must exist
  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Secret or signature missing" },
      { status: 400 },
    );
  }

  // Read the raw body text (we need the exact text for HMAC verification)
  const bodyText = await request.text();

  // Verify signature
  if (!verifySignature(secret, signature, bodyText)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Parse payload (we'll validate structure after parsing)
  let payload: PostEventData;
  try {
    payload = JSON.parse(bodyText) as PostEventData;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }
  
  if (!payload.event || !payload.data) {
    return NextResponse.json(
      { error: "Invalid payload structure" },
      { status: 400 },
    );
  }

  try {
    const result = await handleWebhookEvent(payload);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
