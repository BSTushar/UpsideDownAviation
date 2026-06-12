import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = inquirySchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    // Honeypot triggered -> pretend success, drop silently.
    if (parsed.data.company) return NextResponse.json({ ok: true });

    // TODO: wire delivery (Resend email + optional Google Sheet / CRM).
    // await sendEmail(parsed.data);
    // await appendToSheet(parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
