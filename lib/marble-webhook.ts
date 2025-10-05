import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import type { PostEventData } from "@/lib/marble-types";

export function verifySignature(secret: string, signatureHeader: string, bodyText: string) {
  // Strip possible "sha256=" prefix
  const expectedHex = signatureHeader.replace(/^sha256=/, "");

  const computedHex = createHmac("sha256", secret).update(bodyText).digest("hex");

  // Convert to buffers for constant-time compare
  const expected = Buffer.from(expectedHex, "hex");
  const computed = Buffer.from(computedHex, "hex");

  // lengths must match for timingSafeEqual
  if (expected.length !== computed.length) return false;

  return timingSafeEqual(expected, computed);
}

export async function handleWebhookEvent(payload: PostEventData) {
  const event = payload.event;
  const data = payload.data;

  // Handle any post.* events (published, updated, deleted, etc.)
  if (event.startsWith("post")) {
    // Revalidate the blog index and the single post page
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);

    // If your data fetches use tags, revalidate that tag as well:
    // e.g. fetch(..., { next: { tags: ["posts"] } })
    revalidateTag("posts");

    return {
      revalidated: true,
      now: Date.now(),
      message: "Post event handled",
    };
  }

  return {
    revalidated: false,
    now: Date.now(),
    message: "Event ignored",
  };
}
