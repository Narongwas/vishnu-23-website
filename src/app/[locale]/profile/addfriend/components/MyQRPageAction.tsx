import PageAction from "@/components/PageAction";
import { StyleableFC } from "@/lib/types/misc";
import cn from "@/lib/helpers/cn";

interface MyQRPageActionProps {
  className?: string;
  onClick?: () => void;
}

const MyQRPageAction: StyleableFC<MyQRPageActionProps> = ({
  className,
  onClick,
}) => {
  return (
    <PageAction
      text="QR Code"
      icon="qr_code"
      onClick={() => onClick && onClick()}
      className={cn(`-bottom-165 z-10`, className)}
    />
  );
};

export default MyQRPageAction;
