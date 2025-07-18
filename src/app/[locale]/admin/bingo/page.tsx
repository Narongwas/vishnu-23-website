import TableSortWrapper from "@/app/[locale]/admin/bingo/components/TableSortWrapper";
import AdminBingoPageAction from "@/app/[locale]/admin/bingo/components/AdminBingoPageAction";
import { getServerAuth } from "@/lib/firebase/getServerAuth";

export default async function Page() {
  const { token } = await getServerAuth();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bingo/scores`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const groupData = await res.json();

  return (
    <div>
      <TableSortWrapper groupData={groupData} />
      <AdminBingoPageAction icon="qr_code_scanner" text="สแกนให้สแตมป์" />
    </div>
  );
}
