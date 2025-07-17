import Button from "@/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Icon from "@/components/Icon";

const HelpButton: StyleableFC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Button
      Size="Small"
      Appearance="Secondary"
      className={cn("text-black", className)}
    >
      <Icon name="help" />
    </Button>
  );
};

export default HelpButton;
