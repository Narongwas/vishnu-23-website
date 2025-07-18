type GroupRow = {
  id: string;
  bingoScore: number;
  groupName: string;
  scoreRank: number;
};

type TableProps = {
  groupData: GroupRow[];
};

const Table = ({ groupData }: TableProps) => {
  if (!Array.isArray(groupData)) {
    return <div>ไม่พบข้อมูลกลุ่ม</div>;
  }
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full">
        <thead className="type-title-medium gap-2">
          <tr className="bg-yellow bg-[url('/decorating/texture/fabric.png')] bg-cover bg-blend-soft-light">
            <th className="w-1/5 px-4 py-2 text-left font-bold">อันดับ</th>
            <th className="w-1/5 px-4 py-2 text-left font-bold">กรุ๊ป</th>
            <th className="w-3/10 px-4 py-2 text-left font-bold">ก๊ก</th>
            <th className="w-3/10 px-4 py-2 text-left font-bold">คะแนน</th>
          </tr>
        </thead>
        <tbody className="type-body-medium">
          {groupData.map((row) => (
            <tr key={row.id} className="border-yellow border-b">
              <td className="w-1/5 px-4 py-2 text-left">{row.scoreRank}</td>
              <td className="w-1/5 px-4 py-2 text-left">{row.id}</td>
              <td className="w-3/10 px-4 py-2 text-left">{row.groupName}</td>
              <td className="w-3/10 px-4 py-2 text-left">
                {row.bingoScore.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
