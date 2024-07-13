import FilledRowException from "../exception/FilledRowException";
import Color from "../types/Color";

export const getNextBoard = (grid: Color[][], col: number, turn: Color): Color[][] => {
    const newGrid = grid.map(val => val.slice())
    
    const rowNumber: number = grid[col].findIndex(value => value === Color.NONE)
    if (rowNumber === -1) {
      throw new FilledRowException(`Column ${col} has no empty rows`);
    }
    newGrid[col][rowNumber] = turn === Color.YELLOW ? Color.YELLOW : Color.RED;
    return newGrid;
}

export const checkWin = (grid: Color[][], column: number, row: number): Color => {
    const columnCheck = grid[column].slice(Math.max(row - 4, 0), 4);

    const rowCheck: Color[] = []
    const diagonalLeftCheck: Color[] = []
    const diagonalRightCheck: Color[] = []
    for (let i = column - 3; i <= column + 3; i++) {
      const currentDiagonalDistance = Math.abs(column - i);
      const rowNeg = row - currentDiagonalDistance
      const rowPos = row + currentDiagonalDistance
      try {
        diagonalLeftCheck.push(grid[i][i <= 0 ? rowPos : rowNeg])
      } catch (e) {}
      try {
        diagonalRightCheck.push(grid[i][i <= 0 ? rowNeg : rowPos])
      } catch (e) {}
      try {
        rowCheck.push(grid[i][row]);
      } catch (e) {}
    }
    if (hasConsecutive(columnCheck, 4) || hasConsecutive(rowCheck, 4) || hasConsecutive(diagonalLeftCheck, 4) || hasConsecutive(diagonalRightCheck, 4)) {
        return grid[column][row];
    }
    return Color.NONE
}

const hasConsecutive = (array: Color[], checkCount: number): boolean => {
    return array.reduce((acc, i, ind) => {
        const slice = array.slice(Math.max(ind - checkCount, 0), checkCount)
        if (slice.length === checkCount && slice.every(value => value === i) && [Color.RED, Color.YELLOW].includes(i)) {
            return true
        }
        return acc
    }, false)
}