import { getCurrentUser } from "@/lib/user";
import { ProfileForms } from "@/components/dashboard/ProfileForms";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Profile</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">Your details</h1>
        <p className="text-sm text-text-muted">Update your name, contact details and avatar.</p>
      </header>

      <ProfileForms
        defaults={{
          name: user?.name ?? "",
          phone: user?.phone ?? "",
          image: user?.image ?? "",
          email: user?.email ?? "",
        }}
        hasPassword={Boolean(user?.passwordHash)}
      />
    </div>
  );
}
