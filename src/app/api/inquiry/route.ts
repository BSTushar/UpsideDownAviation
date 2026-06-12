import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Honeypot triggered -> pretend success before schema validation.
    if (typeof data?.company === "string" && data.company.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = inquirySchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // TODO: wire delivery (Resend email + optional Google Sheet / CRM).
    // await sendEmail(parsed.data);
    // await appendToSheet(parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
