"use client";
import DownloadButton from "@/app/[locale]/admin/bingo/components/DownloadButton";
import SortButton from "@/app/[locale]/admin/bingo/components/SortButton";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";
type PageHeaderProps = {
  sortType: "id" | "score";
  onToggleSort: () => void;
};

const PageHeader = ({ sortType, onToggleSort }: PageHeaderProps) => (
  <>
    <div className="relative z-20 flex w-full items-center justify-between px-4 pt-7">
      <BackButton variants="tertiary" />
      <div className="flex gap-2">
        <DownloadButton />
        <SortButton sortType={sortType} onToggle={onToggleSort} />
      </div>
    </div>
    <div className="flex flex-col items-center justify-start">
      <div className="relative -top-10 flex min-h-[200px] w-full flex-col items-center">
        <SubPageHeader
          title="BINGO"
          curvedText="MANAGE"
          background="bg-blue mix-blend-hard-light"
          cloudcolor="red"
          curveTextColor="fill-white"
          className="text-white"
        />
      </div>
    </div>
  </>
);

export default PageHeader;
