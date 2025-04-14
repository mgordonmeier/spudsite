import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Spuds from './components/Spuds';
import Music from './components/Music';
import Games from './components/Games';
import Shows from './components/Shows';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import WanderingSpuddie from './components/WanderingSpuddie';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

function App() {
  return (
    <BrowserRouter>
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '105%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.3&cPolarAngle=90&cameraZoom=1&color1=%2359ffdb&color2=%23dbba95&color3=%23cc9ee1&embedMode=off&envPreset=city&fov=45&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1.2&positionX=-1.4&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=-30&shader=defaults&type=plane&uDensity=1.6&uFrequency=5.5&uSpeed=0.2&uStrength=4.3&uTime=0&wireframe=false&zoomOut=false'
        />
      </ShaderGradientCanvas>
      {/*<WanderingSpuddie />*/}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spuds" element={<Spuds />} />
          <Route path="/music" element={<Music />} />
          <Route path="/games" element={<Games />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
