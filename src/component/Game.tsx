import useConnectFour from "../hooks/useConnectFour"
import Color from "../types/Color"
import Grid from "./Grid"

interface GameProps {
    firstPlayer: Color
}

const Game = ({firstPlayer}: GameProps) => {
  const {grid, turn, click, winner} = useConnectFour(firstPlayer)

  const bgColor = winner === Color.NONE ? "bg-white" : 
                  winner === Color.RED  ? "bg-red-300" : "bg-yellow-600"

  return (
    <span className={`animate-fade h-screen flex flex-col justify-center items-center transition-all duration-1000 ${bgColor}`}>
      <Grid grid={grid} turn={turn} click={click} />
    </span>
  )
}


export default Game