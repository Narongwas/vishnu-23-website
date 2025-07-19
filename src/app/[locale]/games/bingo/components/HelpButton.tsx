import Button from "@/components/Button";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const HelpButton: StyleableFC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Button
      Size="small"
      Appearance="secondary"
      className={cn("text-black", className)}
    >
      <Icon name="help" />
    </Button>
  );
};

export default HelpButton;
