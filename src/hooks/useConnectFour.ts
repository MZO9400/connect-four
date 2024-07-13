import { useState } from "react";
import Color from "../types/Color";
import FilledRowException from '../exception/FilledRowException'


const useConnectFour = (color: Color) => {
  const [grid, setGrid] = useState(Array.from({length: 7}, () => Array.from({length: 6}, () => Color.NONE)))
  const [turn, setTurn] = useState<Color>(color);
  const [winner, setWinner] = useState<Color>(Color.NONE);
  const [winStats, setWinStats] = useState({
    [Color.RED]: 0,
    [Color.YELLOW]: 0 
  })


  const reload = () => {
    setGrid(Array.from({length: 7}, () => Array.from({length: 6}, () => Color.NONE)))
    setTurn(color)
    setWinner(Color.NONE)
  }


  const checkWin = (column: number): Color => {
    let rowNumber: number = grid[column].findIndex(value => value === Color.NONE) - 1

    if (rowNumber === -2) {
      rowNumber = grid[column].length - 1;
    }

    return lookupVictory(column, rowNumber) ? grid[column][rowNumber] : Color.NONE;
  }

  const hasConsecutive = (array: Color[], checkCount: number): boolean => {

    return array.reduce((acc, i, ind) => {
      const slice = array.slice(Math.max(ind - checkCount, 0), checkCount)
      if (slice.length === checkCount && slice.every(value => value === i)) {
        return true
      }
      return acc
    }, false)
  }

  const lookupVictory = (column: number, row: number): boolean => {
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
      return true;
    }

    return false;
  }

  const click = (col: number): void => {
    const newGrid = [...grid]
    const rowNumber: number = grid[col].findIndex(value => value === Color.NONE)
    if (rowNumber === -1) {
      throw new FilledRowException(`Column ${col} has no empty rows`);
    }
    newGrid[col][rowNumber] = turn === Color.YELLOW ? Color.YELLOW : Color.RED;
    setGrid(newGrid)

    const _winner: Color = checkWin(col);

    const nextTurn = _winner !== Color.NONE ? 
          Color.NONE : 
          turn === Color.RED ? 
                Color.YELLOW : 
                Color.RED

    if (_winner !== Color.NONE) {
      setWinner(_winner)
      setWinStats({...winStats, [_winner]: winStats[_winner] + 1})
    }

    setTurn(nextTurn)
  }


  return {grid, turn, click, winner, reload, winStats}
}

export default useConnectFour;