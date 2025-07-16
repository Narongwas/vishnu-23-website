import SubPageHeader from "@/components/SubPageHeader";
import BackButton from "@/app/[locale]/admin/bingo/components/BackButton";
import DownloadButton from "@/app/[locale]/admin/bingo/components/DownloadButton";
import SortButton from "@/app/[locale]/admin/bingo/components/SortButton";

const PageHeader = () => {
  return (
    <>
      {/* Header ปุ่มซ้าย-ขวา */}
      <div className="z-20 flex w-full items-center justify-between px-4 pt-7">
        <BackButton />
        <div className="flex gap-2">
          <DownloadButton />
          <SortButton />
        </div>
      </div>
      {/* Section ตรงกลาง */}
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
};

export default PageHeader;
