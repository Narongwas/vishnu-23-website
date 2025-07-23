import { StyleableFC } from "@/lib/types/misc";
import PageAction from "@/components/PageAction";

type ConfirmationPageActionProps = {
  className?: string;
  Action: () => void;
};

const ConfirmationPageAction: StyleableFC<ConfirmationPageActionProps> = ({
  Action,
}) => {
  return (
    <PageAction
      onClick={Action}
      icon="done"
      text="บันทึก"
      className="-bottom-165"
    />
  );
};

export default ConfirmationPageAction;
