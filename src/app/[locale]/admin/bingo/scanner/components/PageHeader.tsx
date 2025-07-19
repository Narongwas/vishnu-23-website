import BackButton from "@/components/BackButton";
import SelectDropDown from "@/app/[locale]/admin/bingo/scanner/components/SelectDropDown";
import { StyleableFC } from "@/lib/types/misc";

type PageHeaderProps = {
  onClubSelect: (clubId: number) => void;
};

const PageHeader: StyleableFC<PageHeaderProps> = ({ onClubSelect }) => {
  return (
    <div className="relative z-10 flex justify-between px-4 pt-4 pb-10">
      <BackButton variants="tertiary" />
      <SelectDropDown onClubSelect={onClubSelect} />
    </div>
  );
};

export default PageHeader;
