import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";

const HelpButton: StyleableFC<{
  className?: string;
  onClick?: () => void;
}> = ({ className, onClick }) => {
  return (
    <Button
      Size="small"
      Appearance="secondary"
      onClick={onClick}
      className={className}
    >
      <Icon name="help" />
    </Button>
  );
};

export default HelpButton;
