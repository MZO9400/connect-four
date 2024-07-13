import Color from "../types/Color";
import Grid from "./Grid";

interface WinscreenProps {
    winner: Color
    grid: Color[][]
}

const Winscreen = ({winner, grid}: WinscreenProps) => {
    const style = winner === Color.YELLOW ? "bg-yellow-300" : "bg-red-300"
    return (
      <div className={`flex h-screen flex flex-col justify-center items-center ${style}`}>
        <Grid grid={grid} />
      </div>
    )
}

export default Winscreen