"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Select, Textarea, Checkbox } from "@/components/ui/FormElements";
import { inquirySchema } from "@/lib/validation";
import { useLoading } from "@/components/motion/LoadingProvider";

const interests = [
  "Ground Training",
  "Technical & Regulatory",
  "Examination Preparation",
  "Career & Airline Readiness",
  "Mentorship",
  "General",
] as const;

export function InquiryForm() {
  const { startLoading } = useLoading();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const interestId = useId();
  const messageId = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      interest: fd.get("interest"),
      message: fd.get("message") || undefined,
      consent: fd.get("consent") === "on",
      company: fd.get("company") || undefined,
    };

    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])));
      setStatus("idle");
      return;
    }

    startLoading();
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <h3 className="type-heading-sm text-bone-white">Thank you.</h3>
        <p className="mt-2 type-body text-slate">An advisor will contact you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FormField label="Full name" error={errors.name} htmlFor={nameId}>
        <Input id={nameId} name="name" autoComplete="name" aria-invalid={!!errors.name} />
      </FormField>
      <FormField label="Phone number" error={errors.phone} htmlFor={phoneId}>
        <Input id={phoneId} name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
      </FormField>
      <FormField label="Email address" error={errors.email} htmlFor={emailId}>
        <Input id={emailId} name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
      </FormField>
      <FormField label="Area of interest" htmlFor={interestId}>
        <Select id={interestId} name="interest" defaultValue="General">
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Message (optional)" htmlFor={messageId}>
        <Textarea id={messageId} name="message" rows={4} placeholder="Tell us about your background or questions…" />
      </FormField>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <Checkbox
        name="consent"
        required
        label={
          <>
            I agree to be contacted and accept the{" "}
            <a href="/privacy" className="text-accent underline">Privacy Policy</a>.
          </>
        }
      />
      {errors.consent && (
        <p role="alert" className="type-body-sm text-error">
          {errors.consent}
        </p>
      )}

      <Button variant="primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request advisory call"}
      </Button>
      {status === "error" && (
        <p role="alert" className="type-body-sm text-error">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
