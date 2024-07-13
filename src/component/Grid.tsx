import Column from "./Column"
import Color from "../types/Color"


interface GridProps {
    grid: Color[][]
    click?: Function
}

const Grid = ({grid, click}: GridProps) => {
    const onCellClick = (col: number) => {
        try {
            click && click(col)
        } catch (e) {
            console.error((e as Error).message)
        }
    }

    return (
        <div className='flex justify-center items-center'>
            {grid.map((row, i) => {
                return <Column key={i} row={row} onCellClick={(column: number) => onCellClick(i)} />
            })}
        </div>
    )
}

export default Grid;