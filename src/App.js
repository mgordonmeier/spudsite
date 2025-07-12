import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/ui/NavBar';
import Home from './components/pages/Home';
import Spuds from './components/pages/Spuds';
import Music from './components/pages/Music';
import Games from './components/games/Games';
import Shows from './components/pages/Shows';
import Merch from './components/merch/Merch';
import Contact from './components/pages/Contact';
import NotFound from './components/ui/NotFound';
//import WanderingSpuddie from './components/pages/WanderingSpuddie';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
import './App.css';

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
          zIndex: 0,
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=200&cDistance=2.8&cPolarAngle=90&cameraZoom=1&color1=%23ff6bda&color2=%2385ffa9&color3=%2354ffff&destination=onCanvas&embedMode=off&envPreset=lobby&format=gif&fov=50&frameRate=10&gizmoHelper=hide&grain=off&lightType=env&pixelDensity=2&positionX=0.2&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=10&rotationY=-10&rotationZ=-110&shader=defaults&toggleAxis=false&type=waterPlane&uDensity=1.3&uFrequency=5.5&uSpeed=0.01&uStrength=3.5&uTime=0&wireframe=false&zoomOut=false'
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
          <Route path="/merch" element={<Merch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
