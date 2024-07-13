import React from 'react'
import Color from "../types/Color";

type CellProps = {
  fill: Color;
  onCellClick: Function;
}

const Cell = ({fill, onCellClick}: CellProps) => {
  let classes: string = '';
  switch (fill) {
    case Color.RED:
      classes = 'red disabled'
      break;
    case Color.YELLOW:
      classes = 'yellow disabled'
      break;
    case Color.NONE:
      break;
  }
  return <div onClick={() => onCellClick()} className={`cell ${classes}`}>{}</div>
}


export default Cell;