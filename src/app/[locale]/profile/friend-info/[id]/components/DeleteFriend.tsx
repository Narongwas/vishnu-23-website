"use client";

import { StyleableFC } from "@/lib/types/misc";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const DeleteFriend: StyleableFC = () => {
  const handleDelete = () => {
    console.log("Friend deleted");
  };

  return (
    <Button Size="small" Appearance="primary" onClick={handleDelete}>
      <Icon name="person_remove" />
    </Button>
  );
};

export default DeleteFriend;
