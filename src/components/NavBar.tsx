import NavBarItem from "@/components/NavBarItem";
import { getUserRole } from "@/lib/middleware/checkUserAccess";
import { getTranslations } from "next-intl/server";

export default async function NavBar() {
  const t = await getTranslations("Common.Navigation");
  let role = await getUserRole();
  if (role == null) {
    role = "camper";
  }

  return (
    <nav className="bg-red fixed bottom-0 left-0 z-40 flex h-16 w-full items-center px-4">
      <div className="flex w-full flex-row *:grow">
        <NavBarItem icon="home" label={t("home")} href="/" />
        {role != "camper" ? (
          <NavBarItem icon="security" label={t("admin")} href="/admin" />
        ) : (
          <>
            <NavBarItem icon="explore" label={t("explore")} href="/explore" />
            <NavBarItem
              icon="sports_esports"
              label={t("games")}
              href="/games"
            />
          </>
        )}
      </div>
    </nav>
  );
}
