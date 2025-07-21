import DuckBackground from "@/app/[locale]/components/DuckBackground";
import DuckGraphic from "@/app/[locale]/components/DuckGraphic";
import MyKingdomBadge from "@/app/[locale]/components/MyKingdomBadge";
import TopFiveBadge from "@/app/[locale]/components/TopFiveBadge";
import TopFourBadge from "@/app/[locale]/components/TopFourBadge";
import TopOneBadge from "@/app/[locale]/components/TopOneBadge";
import TopThreeBadge from "@/app/[locale]/components/TopThreeBadge";
import TopTwoBadge from "@/app/[locale]/components/TopTwoBadge";
import { getServerAuth } from "@/lib/firebase/getServerAuth";
import type { Group } from "@/lib/types/group";
import { StyleableFC } from "@/lib/types/misc";
import { getTranslations } from "next-intl/server";

type GroupWithCellCount = Group & { cellCount: number };

const ScoreSection: StyleableFC = async () => {
  const t = await getTranslations("");
  // Get authentication token from server
  const { token } = await getServerAuth();
  if (!token) {
    return null; // Return null if no token is available
  }
  // Mask definition for the duck shape
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

  // Map to determine if a group's color should be darker for styling purposes
  const groupIsDarker: Record<string, boolean> = {
    A: false, // กะปุ๊กลุก
    B: true, // กะดาย
    C: true, // กะแล็กซี่
    Dog: true, // กะเรียน
    E: true, // กะวี
    F: true, // กะต๊าก
    G: false, // กะแซะ
    H: true, // กะลอจี๊
    J: true, // กะตุกจิต
    K: true, // กะบะซิ่ง
    L: true, // กะวิสค่อน
    M: false, // กะใจ
    N: true, // กะเตี๋ยวเรือ
    P: true, // กะดึ๊บ
    Q: true, // กะบี่
    R: true, // กะซิบ
    S: true, // กะลาสี
    T: true, // กะจั๊วบิน
  };

  // Fetch group information from the API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/group/info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Do not cache this request
    }
  );
  const data = await res.json();
  // Map raw group data to a more usable format
  const mappedGroups = data.groups.map((g: Group) => ({
    id: g.id,
    name: g.groupName,
    totalScore: g.totalScore,
  }));
  const resMe = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Do not cache this request
    }
  );

  const me = await resMe.json();

  // Calculate the total number of visible cells in the mask
  const totalCells = maskDuck.flat().filter((cell) => cell === 1).length;
  // Calculate the total score of all groups (including Admin for overall total)
  const totalScore = mappedGroups.reduce(
    (sum: number, g: Group) => sum + g.totalScore,
    0
  );

  // Filter out the "Admin" group as it should not be displayed on the map or rankings
  const filteredGroups = mappedGroups.filter((g: Group) => g.id !== "Admin");

  const ADMIN_CELL_COUNT =
    (mappedGroups.find((g: Group) => g.id === "Admin")?.totalScore *
      totalCells) /
    totalScore;
  // Calculate the number of cells each group should occupy based on their score
  let groupCellCounts: GroupWithCellCount[] = filteredGroups.map(
    (g: Group) => ({
      ...g,
      cellCount:
        totalScore > 0
          ? Math.floor((g.totalScore * totalCells) / totalScore)
          : 0,
    })
  );

  const allocatedCellsByGroups = groupCellCounts.reduce(
    (sum: number, g: GroupWithCellCount) => sum + g.cellCount,
    0
  );
  const totalAllocatedCells =
    allocatedCellsByGroups + Math.floor(ADMIN_CELL_COUNT);
  // 4. calculate space box (shortfall)
  const shortfall = totalCells - totalAllocatedCells;
  // 5. split space box to J and T
  if (shortfall > 0) {
    const halfShortfallForJ = Math.ceil(shortfall / 2);
    const halfShortfallForT = Math.floor(shortfall / 2);

    // update T and J
    groupCellCounts = groupCellCounts.map((g: GroupWithCellCount) => {
      if (g.id === "J") {
        return { ...g, cellCount: g.cellCount + halfShortfallForJ };
      }
      if (g.id === "T") {
        return { ...g, cellCount: g.cellCount + halfShortfallForT };
      }
      return g;
    });
  }

  const myGroupId = me?.user?.group;
  const myGroup = groupCellCounts.find((g: Group) => g.id === myGroupId);
  /**
   * Generates a 2D grid of colors for each cell based on group scores and
   * the specified filling logic (A-J top-to-bottom, K-T bottom-to-top).
   * @returns {string[][]} A 2D array representing the color for each cell.
   */
  const getGroupColorsGrid = () => {
    // Initialize the colors grid with a default empty color
    const colorsGrid: string[][] = maskDuck.map((row) =>
      row.map(() => "yellow-white")
    );

    // Collect all coordinates of visible cells (where maskDuck has a 1)
    const cellsByRow: Record<string, { row: number; col: number }[]> = {};
    for (let rowIdx = 0; rowIdx < maskDuck.length; rowIdx++) {
      for (let colIdx = 0; colIdx < maskDuck[rowIdx].length; colIdx++) {
        if (maskDuck[rowIdx][colIdx] === 1) {
          if (!cellsByRow[rowIdx]) {
            cellsByRow[rowIdx] = [];
          }
          cellsByRow[rowIdx].push({ row: rowIdx, col: colIdx });
        }
      }
    }

    // Create the final sorted list with a snake-like (boustrophedon) order
    const visibleCellCoords: { row: number; col: number }[] = [];
    // Get row numbers and sort them to process from top to bottom
    const sortedRowKeys = Object.keys(cellsByRow)
      .map(Number)
      .sort((a, b) => a - b);

    for (const rowIdx of sortedRowKeys) {
      const rowCells = cellsByRow[rowIdx];
      // For even rows, sort left-to-right. For odd rows, sort right-to-left.
      if (rowIdx % 2 === 0) {
        rowCells.sort((a, b) => a.col - b.col); // LTR
      } else {
        rowCells.sort((a, b) => b.col - a.col); // RTL
      }
      // Add the sorted row to the final list
      visibleCellCoords.push(...rowCells);
    }

    // Pointers for filling cells from the top and from the bottom
    let ascPointer = 0; // For A-J groups (filling from top-to-bottom)
    let descPointer = visibleCellCoords.length - 1; // For K-T groups (filling from bottom-to-top)

    // Define which group IDs fall into A-J and K-T categories
    const groupAJ_ids = ["A", "B", "C", "Dog", "E", "F", "G", "H", "J"];
    const groupKT_ids = ["K", "L", "M", "N", "P", "Q", "R", "S", "T"];

    // Separate group data into A-J and K-T categories
    const groupsAJ = groupCellCounts.filter((g: Group) =>
      groupAJ_ids.includes(g.id)
    );
    const groupsKT = groupCellCounts.filter((g: Group) =>
      groupKT_ids.includes(g.id)
    );

    // Fill cells for A-J groups (from top-to-bottom)
    for (const group of groupsAJ) {
      let cellsToFill = group.cellCount;
      while (cellsToFill > 0 && ascPointer <= descPointer) {
        const cell = visibleCellCoords[ascPointer];
        colorsGrid[cell.row][cell.col] = group.id;
        ascPointer++;
        cellsToFill--;
      }
    }

    // Fill cells for K-T groups (from bottom-to-top)
    // Ensure that K-T groups do not overwrite cells already filled by A-J groups
    for (const group of groupsKT) {
      let cellsToFill = group.cellCount;
      while (cellsToFill > 0 && descPointer >= ascPointer) {
        const cell = visibleCellCoords[descPointer];
        // Only fill if the cell has not been assigned a color yet
        if (colorsGrid[cell.row][cell.col] === "yellow-white") {
          colorsGrid[cell.row][cell.col] = group.id;
        }
        descPointer--;
        cellsToFill--;
      }
    }

    return colorsGrid;
  };

  // Get the populated color grid
  const groupColorsGrid = getGroupColorsGrid();

  // Sort groups by totalScore (descending), then by ID (ascending) for tie-breaking
  const sortedGroupsForBadges = [...filteredGroups].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore; // Sort by score first
    }
    return a.id.localeCompare(b.id); // If scores are equal, sort by ID
  });

  // Assign custom ranks based on score, with ties sharing ranks
  let currentRank = 1;
  let previousScore = -1; // Initialize with a score that won't match any actual score
  const rankedGroups = sortedGroupsForBadges.map((group, index) => {
    if (group.totalScore !== previousScore) {
      currentRank = index + 1; // Assign new rank if score changes
    }
    previousScore = group.totalScore; // Update previous score
    return { ...group, ranking: currentRank }; // Add ranking to the group object
  });

  const top5Groups = rankedGroups.slice(0, 5);

  return (
    <div className="relative z-10 mt-20 flex flex-col items-center justify-center gap-4">
      <div className="mb-2 flex flex-col gap-1 text-center">
        <div className="text-red">
          {t.rich("Home.Leaderboard.header", {
            title: (chunks) => (
              <p className="type-headline-medium font-bold">{chunks}</p>
            ),
            subtitle: (chunks) => <p className="type-title-large">{chunks}</p>,
          })}
        </div>
      </div>
      <DuckBackground>
        <div
          className="relative h-81 w-63"
          style={{
            filter: "drop-shadow(0 0 10px rgba(255, 0, 0, 0.4))",
          }}
        >
          <div className="relative h-81 w-63 overflow-hidden bg-[url('/decorating/texture/stain.png')] [mask-image:url('/decorating/shapes/Duck.svg')] bg-contain [mask-size:247px_308px] [mask-position:center] [mask-repeat:no-repeat] [webkit-mask-image:url('/decorating/shapes/Duck.svg')] [webkit-mask-repeat:no-repeat] [webkit-mask-size:247px_308px]">
            <div className="absolute inset-0">
              <DuckGraphic colorsGrid={groupColorsGrid} mask={maskDuck} />
            </div>
          </div>
        </div>
      </DuckBackground>
      <MyKingdomBadge
        color={myGroupId ?? ""}
        colorText={t("Home.KingdomCard.color", {
          kingdom: "q",
        })}
        groupName={t(`Common.Kingdom.${myGroupId.toLowerCase()}`)}
        point={t("Home.KingdomCard.score", { score: myGroup?.totalScore ?? 0 })}
        isDarker={groupIsDarker[myGroupId] ?? false}
        className="relative z-10 -mt-10"
      />
      {/* Kingdom Flag Section - Display Top 5 Groups */}
      <div className="flex w-90 flex-col items-center gap-4">
        <div className="flex h-77 w-full justify-between gap-4">
          <div className="h-full w-full pt-4">
            {/* Top 2 Badge */}
            {top5Groups[1] && (
              <TopTwoBadge
                color={top5Groups[1].id}
                groupName={t(
                  `Common.Kingdom.${top5Groups[1].id.toLowerCase()}`
                )}
                point={t("Home.KingdomCard.score", {
                  score: top5Groups[1].totalScore,
                })}
                isDarker={groupIsDarker[top5Groups[1].id]}
                ranking={t("Home.KingdomCard.rank.long", {
                  rank: top5Groups[1].ranking,
                })} // Use the custom ranking
              />
            )}
          </div>
          <div className="h-full w-full">
            {/* Top 1 Badge */}
            {top5Groups[0] && (
              <TopOneBadge
                color={top5Groups[0].id}
                groupName={t(
                  `Common.Kingdom.${top5Groups[0].id.toLowerCase()}`
                )}
                point={t("Home.KingdomCard.score", {
                  score: top5Groups[0].totalScore,
                })}
                isDarker={groupIsDarker[top5Groups[0].id]}
                ranking={t("Home.KingdomCard.rank.long", {
                  rank: top5Groups[0].ranking,
                })} // Use the custom ranking
              />
            )}
          </div>
          <div className="h-full w-full pt-4">
            {/* Top 3 Badge */}
            {top5Groups[2] && (
              <TopThreeBadge
                color={top5Groups[2].id}
                groupName={t(
                  `Common.Kingdom.${top5Groups[2].id.toLowerCase()}`
                )}
                point={t("Home.KingdomCard.score", {
                  score: top5Groups[2].totalScore,
                })}
                isDarker={groupIsDarker[top5Groups[2].id]}
                ranking={t("Home.KingdomCard.rank.long", {
                  rank: top5Groups[2].ranking,
                })} // Use the custom ranking
              />
            )}
          </div>
        </div>
        {/* Top 4 Badge */}
        {top5Groups[3] && (
          <TopFourBadge
            color={top5Groups[3].id}
            groupName={t(`Common.Kingdom.${top5Groups[3].id.toLowerCase()}`)}
            point={t("Home.KingdomCard.score", {
              score: top5Groups[3].totalScore,
            })}
            isDarker={groupIsDarker[top5Groups[3].id]}
            ranking={t("Home.KingdomCard.rank.short", {
              rank: top5Groups[3].ranking,
            })} // Use the custom ranking
          />
        )}
        {/* Top 5 Badge */}
        {top5Groups[4] && (
          <TopFiveBadge
            color={top5Groups[4].id}
            groupName={t(`Common.Kingdom.${top5Groups[4].id.toLowerCase()}`)}
            point={t("Home.KingdomCard.score", {
              score: top5Groups[4].totalScore,
            })}
            isDarker={groupIsDarker[top5Groups[4].id]}
            ranking={t("Home.KingdomCard.rank.short", {
              rank: top5Groups[4].ranking,
            })} // Use the custom ranking
          />
        )}
      </div>
    </div>
  );
};

export default ScoreSection;
