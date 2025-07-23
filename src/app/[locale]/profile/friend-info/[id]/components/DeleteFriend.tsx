"use client";

import { StyleableFC } from "@/lib/types/misc";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "@/i18n/navigation";

type DeleteFriendProps = {
  friendId: string;
};

const DeleteFriend: StyleableFC<DeleteFriendProps> = ({ friendId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("คุณต้องการลบเพื่อนคนนี้ใช่หรือไม่?")) return;
    try {
      const res = await fetch("/api/v1/friends", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("ลบเพื่อนสำเร็จ");
        router.push("/profile");
      } else {
        alert(data.error || "เกิดข้อผิดพลาดในการลบเพื่อน");
      }
    } catch (e) {
      console.error("Error deleting friend:", e);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  return (
    <Button Size="small" Appearance="primary" onClick={handleDelete}>
      <Icon name="person_remove" />
    </Button>
  );
};

export default DeleteFriend;
