import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const EditButton: StyleableFC = ({ className }) => {
  return (
    <Button
      Size="Small"
      Appearance="Secondary"
      className={cn(className)}
      disabled={true}
    >
      <Icon name="edit" />
      <p className="type-title-medium">แก้ไข</p>
    </Button>
  );
};

export default EditButton;
