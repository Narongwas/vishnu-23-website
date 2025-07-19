import NavBarItem from "@/components/NavBarItem";
import { getUserRole } from "@/lib/middleware/checkUserAccess";

export default async function NavBar() {
  let role = await getUserRole();
  if (role == null) {
    role = "camper";
  }
  // noted that I saw your useTranslation doesn't work both in prod and when im testing so I removed that
  return (
    <nav className="bg-red fixed bottom-0 left-0 z-40 flex h-16 w-full items-center px-4">
      <div className="flex w-full flex-row *:grow">
        <NavBarItem icon="home" label={"home"} href="/" />
        <NavBarItem icon="explore" label={"explore"} href="/explore" />
        {/* <NavBarItem icon="sports_esports" label={t("games")} href="/games" /> */}
        {role != "camper" && (
          <NavBarItem icon="security" label={"admin"} href="/admin" />
        )}
      </div>
    </nav>
  );
}
