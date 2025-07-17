import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { signOut } from "@/lib/firebase/auth";

const LogoutButton: StyleableFC = ({ className }) => {
  const handleLogout = async () => {
    try {
      await signOut();
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button
      Size="Small"
      Appearance="Primary"
      className={cn(className)}
      onClick={handleLogout}
    >
      <Icon name="logout" />
      <p className="type-title-medium">ออกจากระบบ</p>
    </Button>
  );
};

export default LogoutButton;
