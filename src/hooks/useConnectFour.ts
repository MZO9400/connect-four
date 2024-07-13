import { useEffect, useState } from "react";
import Color from "../types/Color";
import { getBestMove } from '../Player/AI'
import { checkWin, getNextBoard } from "../Game/API";


const useConnectFour = (color: Color, withAI = false) => {
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


  const playTurn = (col: number) => {
    let rowNumber: number = grid[col].findIndex(value => value === Color.NONE) - 1;

    if (rowNumber === -2) {
        rowNumber = grid[col].length - 1;
    }

    const newGrid = getNextBoard(grid, col, turn)
    setGrid(newGrid)

    const _winner: Color = checkWin(newGrid, col, rowNumber);

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

  const click = (col: number): void => {
    playTurn(col)

    if (withAI) {
      const AiColor = color === Color.RED ? Color.YELLOW : Color.RED;
      
      playTurn(getBestMove(grid, AiColor))
    }
  }


  return {grid, turn, click, winner, reload, winStats}
}

export default useConnectFour;