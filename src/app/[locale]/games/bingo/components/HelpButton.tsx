import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const HelpButton: StyleableFC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Button
      Size="Small"
      Appearance="Secondary"
      icon="Help"
      className={cn("text-black", className)}
    />
  );
};

export default HelpButton;
