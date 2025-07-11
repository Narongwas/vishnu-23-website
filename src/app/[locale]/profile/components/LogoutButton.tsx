import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";

const LogoutButton: StyleableFC = ({ className }) => {
  return (
    <Button
      icon="logout"
      label="ออกจากระบบ"
      Size="Small"
      Appearance="Primary"
      className={cn(className)}
    />
  );
};

export default LogoutButton;
