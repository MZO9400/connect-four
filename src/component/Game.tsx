import useConnectFour from "../hooks/useConnectFour"
import Color from "../types/Color"
import Grid from "./Grid"

interface GameProps {
    firstPlayer: Color
}

const Game = ({firstPlayer}: GameProps) => {
  const {grid, turn, click, winner} = useConnectFour(firstPlayer)

  return (
    <span className='h-screen flex flex-col justify-center items-center'>
      {winner !== Color.NONE && <div>Winner is {winner}</div>}
      <Grid grid={grid} turn={turn} click={click} />
    </span>
  )
}


export default Game