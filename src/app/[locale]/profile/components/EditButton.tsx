import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";

const LogoutButton: StyleableFC = ({ className }) => {
  return (
    <Button
      icon="edit"
      label="แก้ไข"
      Size="Small"
      Appearance="Secondary"
      className={cn(className)}
    />
  );
};

export default LogoutButton;
