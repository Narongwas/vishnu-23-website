export default function countBingoTable(bingoCounter: boolean[]) {
  let onePointSquareCount = 0;
  let fivePointSquareCount = 0;
  let fiftyPointSquareCount = 0;
  let specialSquareCount = 0;
  let totalScore = 0;

  const ROW = 5;
  const COLUMN = 5;

  // one point squares
  for (let i = 0; i < 25; i++) {
    if (bingoCounter[i]) {
      onePointSquareCount += 1;
    }
  }

  // five point squares
  // check all row
  for (let i = 0; i < ROW; i++) {
    let isRowCompleted = true;
    for (let j = 0; j < COLUMN; j++) {
      if (!bingoCounter[i * COLUMN + j]) {
        isRowCompleted = false;
        break;
      }
    }
    if (isRowCompleted) {
      fivePointSquareCount += 5;
    }
  }

  // check all column
  for (let i = 0; i < COLUMN; i++) {
    let isColumnCompleted = true;
    for (let j = 0; j < ROW; j++) {
      if (!bingoCounter[j * COLUMN + i]) {
        isColumnCompleted = false;
        break;
      }
    }
    if (isColumnCompleted) {
      fivePointSquareCount += 5;
    }
  }

  // fifty point squares
  for (let i = 0; i < 25; i++) {
    if (!bingoCounter[i]) {
      break;
    } else if (i == 24) {
      fiftyPointSquareCount += 50;
    }
  }

  // check diagonal
  let isDiagonalCompleted = true;
  for (let i = 0; i < ROW; i++) {
    if (!bingoCounter[i * COLUMN + i]) {
      isDiagonalCompleted = false;
      break;
    }
  }
  if (isDiagonalCompleted) {
    fivePointSquareCount += 5;
  }

  // check anti diagonal
  let isAntiDiagonalCompleted = true;
  for (let i = 0; i < ROW; i++) {
    if (!bingoCounter[i * COLUMN + COLUMN - 1 - i]) {
      isAntiDiagonalCompleted = false;
      break;
    }
  }
  if (isAntiDiagonalCompleted) {
    fivePointSquareCount += 5;
  }

  // special squares
  for (let i = 25; i < 28; i++) {
    if (bingoCounter[i]) {
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
