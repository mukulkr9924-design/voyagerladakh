import { NextResponse } from "next/server";
import { Resend } from "resend";
import { hasLocale, LANGUAGES } from "@/lib/i18n";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_KEY);
const destinationEmail = "tsewangmessi10@gmail.com";
const senderEmail = "contact@voyagerladakh.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

// A real visitor needs a few seconds to fill in the form; bots post instantly.
const MIN_FILL_MS = 3000;

export async function POST(request: Request) {
  const limit = rateLimit(`send:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "Too many messages. Please try again in a few minutes, or reach us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const type = payload?.type ?? "contact";

    // Spam trap: bots fill the hidden "website" field or submit too fast.
    // Pretend it worked so they don't adapt, but send nothing.
    const elapsed = Number(payload?.elapsedMs);
    if (String(payload?.website ?? "") !== "" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
      return NextResponse.json({ success: true, id: null });
    }

    const contactName = String(payload?.name ?? "").trim();
    const contactEmail = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").trim();
    const message = String(payload?.message ?? "").trim();
    const activity = String(payload?.activity ?? "").trim();
    const travelMonth = String(payload?.travelMonth ?? "").trim();
    // The site language the visitor wrote from, so the team knows which language to reply in.
    const language = hasLocale(payload?.language) ? LANGUAGES[payload.language as keyof typeof LANGUAGES].name : "English";

    if (!contactName || !contactEmail) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const subject = type === "plan_trip"
      ? `Voyager Ladakh: Plan your trip request from ${contactName}`
      : `Voyager Ladakh: Contact message from ${contactName}`;

    const text = [
      `Type: ${type}`,
      `Name: ${contactName}`,
      `Email: ${contactEmail}`,
      `Phone: ${phone || "Not provided"}`,
      `Activity: ${activity || "Not provided"}`,
      `Travel month: ${travelMonth || "Not provided"}`,
      `Site language: ${language}`,
      `Message: ${message || "Not provided"}`,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #172033;">
        <div style="background: #f8f4ea; padding: 24px; border-bottom: 4px solid #bc7a35;">
          <h1 style="margin: 0 0 8px; font-size: 26px; color: #172033;">Voyager Ladakh Enquiry</h1>
          <p style="margin: 0; color: #4c575f;"><strong>Type:</strong> ${escapeHtml(type)}</p>
        </div>
        <div style="padding: 24px; background: white;">
          <p><strong>Name:</strong> ${escapeHtml(contactName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(contactEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Activity:</strong> ${escapeHtml(activity || "Not provided")}</p>
          <p><strong>Travel month:</strong> ${escapeHtml(travelMonth || "Not provided")}</p>
          <p><strong>Site language:</strong> ${escapeHtml(language)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f7f7f3; padding: 18px; border-left: 3px solid #bc7a35; white-space: pre-wrap;">${escapeHtml(message || "Not provided")}</div>
        </div>
      </div>
    `;

    const response = await resend.emails.send({
      from: senderEmail,
      to: [destinationEmail],
      replyTo: contactEmail,
      subject,
      text,
      html,
    });

    if (response.error) {
      return NextResponse.json(
        { success: false, error: response.error.message ?? "Unable to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id ?? null });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unable to send email." },
      { status: 500 }
    );
  }
}
