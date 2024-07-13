import useConnectFour from "../hooks/useConnectFour"
import Color from "../types/Color"
import Grid from "./Grid"

interface GameProps {
    firstPlayer: Color
    ai: boolean
}

const Game = ({firstPlayer, ai}: GameProps) => {
  const {grid, turn, click, winner, reload} = useConnectFour(firstPlayer, ai)

  const bgColor = winner === Color.NONE ? "bg-white" : 
                  winner === Color.RED  ? "bg-red-300" : "bg-yellow-600"

  return (
    <span className={`animate-fade h-screen flex flex-col justify-center items-center transition-all duration-1000 ${bgColor}`}>
      <Grid grid={grid} turn={turn} click={click} />
      {winner !== Color.NONE && (
        <button
        type="button"
        onClick={reload}
        className="mt-5 rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Play again
      </button>
      )}
    </span>
  )
}


export default Game