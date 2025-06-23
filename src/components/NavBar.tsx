import NavBarItem from "./NavBarItem";

export default function NavBar() {
  const NavBarPages = [
    { icon: "home", label: "Home", href: "/" },
    { icon: "explore", label: "Explore", href: "/explore" },
    { icon: "sports_esports", label: "Games", href: "/games" },
  ];

  return (
    <nav className="fixed w-full h-16 bg-red flex items-center px-4 bottom-0 z-40">
      <div className="w-full flex flex-row justify-around">
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
