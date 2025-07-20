import { StyleableFC } from "@/lib/types/misc";
import TopOneBadge from "@/app/[locale]/components/TopOneBadge";
import TopTwoBadge from "@/app/[locale]/components/TopTwoBadge";
import Cell from "@/app/[locale]/components/Cell";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import type { Group } from "@/lib/types/group";
import TopThreeBadge from "@/app/[locale]/components/TopThreeBadge";
import DuckBackground from "@/app/[locale]/components/DuckBackground";
import TopFourBadge from "@/app/[locale]/components/TopFourBadge";
import TopFiveBadge from "@/app/[locale]/components/TopFiveBadge";

const ScoreSection: StyleableFC = async () => {
  const maskDuck: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  /*const groupIsDarker: Record<string, boolean> = {
     A: false,     // กะปุ๊กลุก
     B: true,      // กะดาย
     C: true,      // กะแล็กซี่
     Dog: true,    // กะเรียน
     E: true,      // กะวี
     F: true,      // กะต๊าก
     G: false,     // กะแซะ
     H: true,      // กะลอจี๊
     J: true,      // กะตุกจิต
     K: true,      // กะบะซิ่ง
     L: true,      // กะวิสค่อน
     M: false,     // กะใจ
     N: true,      // กะเตี๋ยวเรือ
     P: true,      // กะดึ๊บ
     Q: true,      // กะบี่
    R: true,      // กะซิบ
     S: true,      // กะลาสี
     T: true,      // กะจั๊วบิน
   };*/

  const { token } = await getServerAuth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group/info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const mappedGroups = data.groups.map((g: Group) => ({
    id: g.id,
    name: g.groupName,
    totalScore: g.totalScore,
  }));

  const totalCells = 356;
  const totalScore = mappedGroups.reduce(
    (sum: number, g: Group) => sum + g.totalScore,
    0
  ); // รวม Admin

  const filteredGroups = mappedGroups.filter((g: Group) => g.id !== "Admin"); // ไม่โชว์ Admin
  const groupCellCounts = filteredGroups.map((g: Group) => ({
    ...g,
    cellCount:
      totalScore > 0 ? Math.floor((g.totalScore * totalCells) / totalScore) : 0,
  }));

  const getGroupColors = () => {
    const colors: string[] = [];

    groupCellCounts.forEach((group: { id: string; cellCount: number }) => {
      for (let i = 0; i < group.cellCount; i++) {
        colors.push(`${group.id}`);
      }
    });

    while (colors.length < 356) {
      colors.push("yellow-white");
    }

    return colors;
  };

  const groupColors = getGroupColors();

  return (
    <div className="relative z-10 mt-20 flex flex-col items-center justify-center gap-4">
      <div className="mb-2 text-center">
        <div className="text-red text-2xl leading-tight font-bold">
          แผนที่แห่งยุทธภพ
        </div>
        <div className="text-red mt-1 text-lg">ศึก 18 ก๊ก ยุทธภพสยบดินแดน</div>
      </div>
      <DuckBackground>
        <div className="grid h-[324px] w-[252px] grid-cols-[repeat(21,12px)] grid-rows-[repeat(27,12px)] bg-[url('/decorating/texture/stain.png')] [mask-image:url('/decorating/shapes/Duck.svg')] bg-contain [mask-size:252px_300px] [mask-position:center] [mask-repeat:no-repeat] shadow-[0_0_10px_rgba(0,0,0,0.5)] [webkit-mask-image:url('/decorating/shapes/Duck.svg')] [webkit-mask-position:center] [webkit-mask-repeat:no-repeat] [webkit-mask-size:247px_308px]">
          {(() => {
            let visibleCellIndex = 0;
            return maskDuck.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                if (!cell) {
                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="h-3 w-3 bg-transparent"
                    />
                  );
                }
                const cellColor = groupColors[visibleCellIndex++];
                console.log(
                  `Cell Color: ${cellColor} at ${visibleCellIndex} at row ${rowIdx} col ${colIdx}`
                );
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`h-3 w-3`}
                    style={{
                      zIndex: rowIdx * 100 + colIdx + rowIdx,
                    }}
                  >
                    <Cell color={cellColor} />
                  </div>
                );
              })
            );
          })()}
        </div>
      </DuckBackground>
      {/* Kingdom Flag Section */}
      <div className="flex w-90 flex-col items-center gap-4">
        <div className="flex h-77 w-full justify-between gap-4">
          <div className="h-full w-full pt-4">
            <TopTwoBadge
              color="C"
              groupName="กะเตี๋ยวเรือ"
              point="8,400 ไร่"
              isDarker={true}
              ranking={2}
            />
          </div>
          <div className="h-full w-full">
            <TopOneBadge
              color="C"
              groupName="กะเตี๋ยวเรือ"
              point="8,400 ไร่"
              isDarker={true}
              ranking={1}
            />
          </div>
          <div className="h-full w-full pt-4">
            <TopThreeBadge
              color="C"
              groupName="กะเตี๋ยวเรือ"
              point="8,400 ไร่"
              isDarker={true}
              ranking={3}
            />
          </div>
        </div>
        <TopFourBadge
          color="C"
          groupName="กะเตี๋ยวเรือ"
          point="8,400 ไร่"
          isDarker={true}
          ranking={4}
        />
        <TopFiveBadge
          color="C"
          groupName="กะเตี๋ยวเรือ"
          point="8,400 ไร่"
          isDarker={true}
          ranking={5}
        />
      </div>
    </div>
  );
};

export default ScoreSection;
