import Icon from "@/components/Icon";
import Button from "@/components/Button";

export default function LanguageSwitcher() {
  return (
    <Button
      className="bg-white z-10 w-[78px] h-[44px]"
      aria-label="change language button"
      type="button"
    >
      <div className="flex flex-col justify-center items-center w-3 h-6 py-[2px]">
        <Icon name={"language"} size={20} className={"text-red"} />
      </div>
      <span className="type-title-medium text-red">TH</span>
    </Button>
  );
}
