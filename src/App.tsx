import React from 'react';
import './App.css';
import Column from './component/Column'
import useGrid from './hooks/useGrid';
import Color from './types/Color';

export default function App() {
  const {grid, turn, click, winner} = useGrid()

  const onCellClick = (col: number) => {
    if (turn == null) {
      return;
    }
    click(col)
  }

  if (winner !== Color.NONE) {
    console.log(`Winner is ${winner}`)
  }

  return (
    <span className='h-screen flex justify-center items-center'>
      {grid.map((row, i) => {
        return <Column key={i} row={row} onCellClick={(column: number) => onCellClick(i)} />
      })}
    </span>
  )
}