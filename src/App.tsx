import React from 'react';
import './App.css';
import Grid from './component/Grid'
import useGrid from './hooks/useGrid';
import Color from './types/Color';

export default function App() {
  const {grid, turn, click, winner} = useGrid(Color.YELLOW)

  return (
    <span className='h-screen flex flex-col justify-center items-center'>
      {winner !== Color.NONE && <div>Winner is {winner}</div>}
      <Grid grid={grid} turn={turn} click={click} />
    </span>
  )
}