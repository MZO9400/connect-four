import React from 'react'
import Cell from './Cell';
import Color from '../types/Color';

type ColumnProps = {
    row: Color[];
    onCellClick: Function;
}

const Column = ({row, onCellClick}: ColumnProps) => {
    return (
      <div className="column">
        {row.map((fill, i) => {
          return <div key={i} className='border-2'><Cell onCellClick={() => onCellClick(i)} fill={fill} /></div>
        })}
      </div>
    )
}

export default Column;