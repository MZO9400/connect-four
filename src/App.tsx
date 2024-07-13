import React, { useState } from 'react';
import Game from './component/Game';
import Color from './types/Color';
import GameConfig from './component/GameConfig';

export default function App() {
  const [color, setColor] = useState(Color.NONE);
  const [withAI, setWithAI] = useState(false);

  return color === Color.NONE ? 
          <GameConfig setColor={setColor} withAI={setWithAI} /> : 
          <Game firstPlayer={color} ai={withAI} />
}