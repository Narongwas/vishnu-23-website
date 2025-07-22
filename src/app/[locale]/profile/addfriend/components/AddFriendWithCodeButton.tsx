"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";

type CodeStampButtonProps = {
  onClick: () => void;
};

const CodeStampButton: StyleableFC<CodeStampButtonProps> = ({ onClick }) => {
  return (
    <Button
      Size="small"
      Appearance="secondary"
      className="relative z-10"
      onClick={onClick}
    >
      <Icon name="pin" />
      <p className="type-title-medium">สแตมป์ด้วยรหัส</p>
    </Button>
  );
};

export default CodeStampButton;
