import { PageHeader, CommandGrid, CommandPanel } from "@/components/portal/CommandPanel";
import { Badge } from "@/components/ui/Badge";

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Roles, permissions, and integrations." />
      <CommandGrid>
        <CommandPanel title="Roles">
          <ul className="space-y-2 type-body-sm">
            <li className="flex justify-between text-slate"><span>Super Admin</span><Badge variant="accent">1 user</Badge></li>
            <li className="flex justify-between text-slate"><span>Admin</span><Badge variant="outline">3 users</Badge></li>
            <li className="flex justify-between text-slate"><span>Mentor</span><Badge variant="outline">5 users</Badge></li>
          </ul>
        </CommandPanel>
        <CommandPanel title="Integrations">
          <ul className="space-y-2 type-body-sm text-slate">
            <li>Google OAuth — pending Supabase setup</li>
            <li>Google Calendar — pending OAuth scopes</li>
            <li>Email (Resend) — configured for inquiries</li>
          </ul>
        </CommandPanel>
      </CommandGrid>
    </>
  );
}
