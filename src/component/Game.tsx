import useConnectFour from "../hooks/useConnectFour"
import Color from "../types/Color"
import Grid from "./Grid"
import Winscreen from "./Winscreen"

interface GameProps {
    firstPlayer: Color
}

const Game = ({firstPlayer}: GameProps) => {
  const {grid, click, winner} = useConnectFour(firstPlayer)
  
  if (winner !== Color.NONE) {
    return <Winscreen winner={winner} grid={grid} />
  } 

  return (
    <span className='h-screen flex flex-col justify-center items-center'>
      <Grid grid={grid} click={click} />
    </span>
  )
}


export default Game