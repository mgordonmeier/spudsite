import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Ground } from './MApp-components/Ground';
import { Player } from './MApp-components/Player';
import { FPV } from './MApp-components/FPV';
import { Cubes } from './MApp-components/Cubes';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import { TextureSelector } from './MApp-components/TextureSelector';
import { Menu } from './MApp-components/Menu';
import "./MApp.css";

function MApp() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      <Canvas>
        <ShaderGradientCanvas>
          <ShaderGradient />
        </ShaderGradientCanvas>
        <ambientLight intensity={0.5} />
        <FPV />        
        <Ground />
        <Player/>
        <Cubes />
      </Canvas>
      {/* <div className='absolute centered cursor'>+</div> */}
      <TextureSelector />
      <Menu />
    </>
  );
}

export default MApp;
