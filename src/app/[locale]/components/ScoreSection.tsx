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
import { getTranslations } from "next-intl/server";
import MyKingdomBadge from "@/app/[locale]/components/MyKingdomBadge";

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
  console.log("me", me);

  // Calculate the total number of visible cells in the mask
  const totalCells = maskDuck.flat().filter((cell) => cell === 1).length;
  // Calculate the total score of all groups (including Admin for overall total)
  const totalScore = mappedGroups.reduce(
    (sum: number, g: Group) => sum + g.totalScore,
    0
  );

  // Filter out the "Admin" group as it should not be displayed on the map or rankings
  const filteredGroups = mappedGroups.filter((g: Group) => g.id !== "Admin");
  // Calculate the number of cells each group should occupy based on their score
  const groupCellCounts = filteredGroups.map((g: Group) => ({
    ...g,
    cellCount:
      totalScore > 0 ? Math.floor((g.totalScore * totalCells) / totalScore) : 0,
  }));
  console.log("groupCellCounts", groupCellCounts);
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
    const visibleCellCoords: { row: number; col: number }[] = [];
    for (let rowIdx = 0; rowIdx < maskDuck.length; rowIdx++) {
      for (let colIdx = 0; colIdx < maskDuck[rowIdx].length; colIdx++) {
        if (maskDuck[rowIdx][colIdx] === 1) {
          visibleCellCoords.push({ row: rowIdx, col: colIdx });
        }
      }
    }

    // Sort visible cells once from top-left to bottom-right (row-major order)
    visibleCellCoords.sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      return a.col - b.col;
    });

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
      <div className="mb-2 text-center">
        {/* <div className="type-title-large text-red">{t("Leaderboard.header",{
          title: (chunks) => "<title>"
        })}</div> */}
      </div>
      <DuckBackground>
        <div
          className="relative h-81 w-63"
          style={{
            filter: "drop-shadow(0 0 10px rgba(255, 0, 0, 0.4))",
          }}
        >
          <div className="[webkit-mask-position:center 10px] grid h-81 w-63 grid-cols-[repeat(21,12px)] grid-rows-[repeat(27,12px)] bg-[url('/decorating/texture/stain.png')] [mask-image:url('/decorating/shapes/Duck.svg')] bg-contain [mask-size:247px_308px] [mask-position:center] [mask-repeat:no-repeat] [webkit-mask-image:url('/decorating/shapes/Duck.Duck.svg')] [webkit-mask-repeat:no-repeat] [webkit-mask-size:247px_308px]">
            {/* Render cells based on maskDuck and the calculated colorsGrid */}
            {maskDuck.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                if (!cell) {
                  // If cell is 0 in maskDuck, render an empty div to maintain grid structure
                  return (
                    <div key={`${rowIdx}-${colIdx}`} className="h-3 w-3" />
                  );
                }
                // Get color from the generated colorsGrid
                const cellColor = groupColorsGrid[rowIdx][colIdx];
                // Determine if the cell's color should be darker based on groupIsDarker ma
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`relative h-3 w-3 overflow-visible`}
                    style={{
                      zIndex: colIdx + rowIdx * 100, // Z-index for layering, if needed
                      transform: "translate(-3px, -3px)", // Adjust position for visual alignment
                    }}
                  >
                    {/* Pass the calculated color and isDarker prop to the Cell component */}
                    <Cell color={cellColor} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DuckBackground>
      <MyKingdomBadge
        color={myGroupId?.toLowerCase() ?? ""}
        colorText={t("Home.KingdomCard.color", {
          kingdom: "q",
        })}
        groupName={t("Common.Kingdom.kingdom", {
          kingdom: t(`Common.Kingdom.${myGroupId?.toLowerCase()}`),
        })}
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
                groupName={t("Common.Kingdom.kingdom", {
                  kingdom: t(
                    `Common.Kingdom.${top5Groups[1].id.toLowerCase()}`
                  ),
                })}
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
                groupName={t("Common.Kingdom.kingdom", {
                  kingdom: t(
                    `Common.Kingdom.${top5Groups[0].id.toLowerCase()}`
                  ),
                })}
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
                groupName={t("Common.Kingdom.kingdom", {
                  kingdom: t(
                    `Common.Kingdom.${top5Groups[2].id.toLowerCase()}`
                  ),
                })}
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
            groupName={t("Common.Kingdom.kingdom", {
              kingdom: t(`Common.Kingdom.${top5Groups[3].id.toLowerCase()}`),
            })}
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
            groupName={t("Common.Kingdom.kingdom", {
              kingdom: t(`Common.Kingdom.${top5Groups[4].id.toLowerCase()}`),
            })}
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
