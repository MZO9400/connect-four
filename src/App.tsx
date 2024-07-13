import React, { useState } from 'react';
import Game from './component/Game';
import Color from './types/Color';
import AskColor from './component/AskColor';

export default function App() {
  const [color, setColor] = useState(Color.NONE);

  return color === Color.NONE ? 
          <AskColor setColor={setColor} /> : 
          <Game firstPlayer={color} />
}