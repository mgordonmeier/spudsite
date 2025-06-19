import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './MApp-components/Ground';
import { Player } from './MApp-components/Player';
import { FPV } from './MApp-components/FPV';
import { Cubes } from './MApp-components/Cubes';
import "./MApp.css";
import { TextureSelector } from './MApp-components/TextureSelector';
import { Menu } from './MApp-components/Menu';

function MApp() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPV />        
        <Physics>
          <Player/>
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      {/* <div className='absolute centered cursor'>+</div> */}
      <TextureSelector />
      <Menu />
    </>
  );
}

export default MApp;
