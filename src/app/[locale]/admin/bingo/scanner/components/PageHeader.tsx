import BackButton from "@/app/[locale]/admin/bingo/components/BackButton";
import SelectDropDown from "@/app/[locale]/admin/bingo/scanner/components/SelectDropDown";

const PageHeader = () => {
  return (
    <div className="flex justify-between px-4 pt-4 pb-10">
      <BackButton />
      <SelectDropDown />
    </div>
  );
};

export default PageHeader;
