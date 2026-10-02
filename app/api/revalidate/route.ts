import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/sanity/lib/client";

// Called by a Sanity webhook on every publish so changes appear immediately instead of within a minute.
// Set SANITY_REVALIDATE_SECRET to the same value as the webhook's secret.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);
    if (!isValidSignature) return Response.json({ message: "Invalid signature" }, { status: 401 });
    // Every query shares one tag: menus, cards and pages all show trip data, so refresh everything.
    revalidateTag(SANITY_TAG, { expire: 0 });
    return Response.json({ revalidated: true, type: body?._type ?? null });
  } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}
