export default function countBingoTable(
  bingo: number[],
  bingoCounter: boolean[]
) {
  let onePointSquareCount = 0;
  let fivePointSquareCount = 0;
  let fiftyPointSquareCount = 0;
  let specialSquareCount = 0;
  let totalScore = 0;

  const ROW = 5;
  const COLUMN = 5;

  // one point squares (ช่อง 0-24)
  for (let i = 1; i <= 25; i++) {
    const clubIdx = bingo[i] - 1;
    if (bingoCounter[clubIdx]) {
      onePointSquareCount += 1;
    }
  }

  // five point squares (row)
  for (let i = 0; i < ROW; i++) {
    let isRowCompleted = true;
    for (let j = 0; j < COLUMN; j++) {
      const clubIdx = bingo[i * COLUMN + j] - 1;
      if (!bingoCounter[clubIdx]) {
        isRowCompleted = false;
        break;
      }
    }
    if (isRowCompleted) {
      fivePointSquareCount += 5;
    }
  }

  // five point squares (column)
  for (let i = 0; i < COLUMN; i++) {
    let isColumnCompleted = true;
    for (let j = 0; j < ROW; j++) {
      const clubIdx = bingo[j * COLUMN + i] - 1;
      if (!bingoCounter[clubIdx]) {
        isColumnCompleted = false;
        break;
      }
    }
    if (isColumnCompleted) {
      fivePointSquareCount += 5;
    }
  }

  // fifty point squares (ถ้าทุกช่องในตารางหลักเปิดหมด)
  let isAllRevealed = true;
  for (let i = 0; i < 25; i++) {
    const clubIdx = bingo[i] - 1;
    if (!bingoCounter[clubIdx]) {
      isAllRevealed = false;
      break;
    }
  }
  if (isAllRevealed) {
    fiftyPointSquareCount += 50;
  }

  // special squares (ช่อง 25-27)
  for (let i = 25; i < 28; i++) {
    const clubIdx = bingo[i] - 1;
    if (bingoCounter[clubIdx]) {
      specialSquareCount += 1;
    }
  }

  totalScore =
    onePointSquareCount +
    fivePointSquareCount +
    fiftyPointSquareCount +
    specialSquareCount;

  return {
    onePointSquareCount,
    fivePointSquareCount,
    fiftyPointSquareCount,
    specialSquareCount,
    totalScore,
  };
}
