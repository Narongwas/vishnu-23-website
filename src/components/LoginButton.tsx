import Icon from "@/components/Icon";
import Button from "@/components/Button";

export default function LoginButton() {
  return (
    <Button
      className="bg-red z-50 h-[44px] w-[129px]"
      aria-label="login button"
      type="button"
    >
      <div className="flex h-6 w-3 flex-col items-center justify-center py-[2px]">
        <Icon name={"login"} size={20} className={"text-white"} />
      </div>
      <span className="type-title-medium text-white">เข้าสู่ระบบ</span>
    </Button>
  );
}
