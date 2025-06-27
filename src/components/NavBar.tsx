import NavBarItem from "@/components/NavBarItem";

export default function NavBar() {
  const NavBarPages = [
    { icon: "home", label: "Home", href: "/" },
    { icon: "explore", label: "Explore", href: "/explore" },
    { icon: "sports_esports", label: "Games", href: "/games" },
  ];

  return (
    <nav className="bg-red fixed bottom-0 z-40 flex h-16 w-full items-center px-4">
      <div className="flex w-full flex-row justify-around">
        {NavBarPages.map((item) => (
          <NavBarItem
            key={item.icon}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </nav>
  );
}
