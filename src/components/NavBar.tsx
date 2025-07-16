import NavBarItem from "@/components/NavBarItem";
import { useTranslations } from "next-intl";

export default function NavBar() {
  const t = useTranslations("Common.Navigation");

  return (
    <nav className="bg-red fixed bottom-0 left-0 z-40 flex h-16 w-full items-center px-4">
      <div className="flex w-full flex-row justify-around">
        <NavBarItem icon="home" label={t("home")} href="/" />
        <NavBarItem icon="explore" label={t("explore")} href="/explore" />
        <NavBarItem icon="sports_esports" label={t("games")} href="/games" />
      </div>
    </nav>
  );
}
