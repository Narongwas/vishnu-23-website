import Icon from "@/components/Icon";
import Button from "@/components/Button";

export default function LoginButton() {
  return (
    <Button
      className="bg-red z-50 w-[129px] h-[44px]"
      aria-label="login button"
      type="button"
    >
      <div className="flex flex-col justify-center items-center w-3 h-6 py-[2px]">
        <Icon name={"login"} size={20} className={"text-white"} />
      </div>
      <span className="type-title-medium text-white">เข้าสู่ระบบ</span>
    </Button>
  );
}
