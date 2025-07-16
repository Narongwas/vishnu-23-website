import PageHeader from "@/app/[locale]/admin/bingo/components/PageHeader";
import Table from "@/app/[locale]/admin/bingo/components/Table";
import AdminBingoPageAction from "@/app/[locale]/admin/bingo/components/AdminBingoPageAction";

export default function Page() {
  return (
    <div>
      <PageHeader />
      <div className="relative z-10 mx-auto -mt-28 max-w-200 px-4">
        <Table />
      </div>
      <AdminBingoPageAction icon="qr_code_scanner" text="สแกนให้สแตมป์" />
    </div>
  );
}
