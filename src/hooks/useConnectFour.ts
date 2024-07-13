import { useCallback, useEffect, useState } from "react";
import Color from "../types/Color";
import { checkWin, getNextBoard } from "../Game/API";


const useConnectFour = (color: Color, withAI = false) => {
  const [grid, setGrid] = useState(Array.from({length: 7}, () => Array.from({length: 6}, () => Color.NONE)))
  const [turn, setTurn] = useState<Color>(color);
  const [winner, setWinner] = useState<Color>(Color.NONE);
  const [winStats, setWinStats] = useState({
    [Color.RED]: 0,
    [Color.YELLOW]: 0 
  })
  const aiColor = color === Color.RED ? Color.YELLOW : Color.RED;

  const reload = () => {
    setGrid(Array.from({length: 7}, () => Array.from({length: 6}, () => Color.NONE)))
    setTurn(color)
    setWinner(Color.NONE)
  }


  const playMove = useCallback((col: number) => {
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
  }, [grid, turn, winStats])

    const click = useCallback((col: number) => {
    if (withAI && color !== turn) {
      return false;
    }
    playMove(col)
  }, [color, playMove, turn, withAI])

  useEffect(() => {
    if (withAI && turn === aiColor && winner === Color.NONE) {
        const aiWorker = new Worker(new URL("../Player/AI.ts", import.meta.url))
        aiWorker.postMessage({grid, aiColor})
        aiWorker.onmessage = function (event) {
          const bestMove = event.data
          if (bestMove >= 0) {
            playMove(bestMove)
            aiWorker.terminate()
          }
        };
    }
  }, [grid, turn, aiColor, winner, withAI, click, playMove])


  return {grid, turn, click, winner, reload, winStats}
}

export default useConnectFour;