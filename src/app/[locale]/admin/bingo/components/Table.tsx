const data = [
  { rank: 16, group: "A", kok: "กะปุ๊กลุก", score: 5000 },
  { rank: 9, group: "B", kok: "กะดาย", score: 7000 },
  { rank: 14, group: "C", kok: "กะแล็กซี่", score: 6000 },
  { rank: 18, group: "Dog", kok: "กะเรียน", score: 4000 },
  { rank: 5, group: "E", kok: "กะวี", score: 9000 },
  { rank: 7, group: "F", kok: "กะต๊าก", score: 7800 },
  { rank: 3, group: "G", kok: "กะแซะ", score: 10000 },
  { rank: 1, group: "H", kok: "กะลอจี๊", score: 13500 },
  { rank: 4, group: "J", kok: "กะตุกจิต", score: 10000 },
];

const Table = () => {
  return (
    <div className="overflow-x-auto bg-[#FFF7E1]">
      <table className="min-w-full text-center">
        <thead className="type-title-medium">
          <tr className="bg-[#FFE5A3]">
            <th className="px-4 py-2 font-bold">อันดับ</th>
            <th className="px-4 py-2 font-bold">กรุ๊ป</th>
            <th className="px-4 py-2 font-bold">ก๊ก</th>
            <th className="px-4 py-2 font-bold">คะแนน</th>
          </tr>
        </thead>
        <tbody className="type-body-small">
          {data.map((row) => (
            <tr key={row.group} className="border-yellow border-b">
              <td className="px-4 py-2">{row.rank}</td>
              <td className="px-4 py-2">{row.group}</td>
              <td className="px-4 py-2">{row.kok}</td>
              <td className="px-4 py-2">{row.score.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
