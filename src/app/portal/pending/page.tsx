import Link from "next/link";
import { CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function PortalPendingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <CommandPanel className="max-w-md text-center">
        <h1 className="type-heading-sm text-bone-white">Access pending</h1>
        <p className="mt-4 type-body text-slate">
          Your account is not yet authorized for the student portal. This platform is invitation-only —
          an admin must approve your enrollment before you can access classes, progress, and mentorship.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button href={`mailto:${SITE.email}`} variant="ghost" fullWidth>
            Contact support
          </Button>
          <Link href="/portal/login" className="type-body-sm text-iris hover:underline">
            Try a different account
          </Link>
        </div>
      </CommandPanel>
    </div>
  );
}
