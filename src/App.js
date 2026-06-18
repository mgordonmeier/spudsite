import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/ui/NavBar';
import './App.css';
import Background from './components/ui/Background';
import WanderingSpuddie from './components/spuddie/WanderingSpuddie';

const Home = lazy(() => import('./components/pages/Home'));
const Spuds = lazy(() => import('./components/pages/Spuds'));
const Music = lazy(() => import('./components/pages/Music'));
const Games = lazy(() => import('./components/games/Games'));
const Shows = lazy(() => import('./components/pages/Shows'));
const Merch = lazy(() => import('./components/merch/Merch'));
const Contact = lazy(() => import('./components/pages/Contact'));
const NotFound = lazy(() => import('./components/ui/NotFound'));

const SPUDDIE_ENABLED_STORAGE_KEY = 'spuddie-enabled';

function App() {
  const [spuddieEnabled, setSpuddieEnabled] = useState(() => {
    const savedPreference = window.localStorage.getItem(SPUDDIE_ENABLED_STORAGE_KEY);
    return savedPreference === null ? true : savedPreference === 'true';
  });

  useEffect(() => {
    window.localStorage.setItem(SPUDDIE_ENABLED_STORAGE_KEY, String(spuddieEnabled));
  }, [spuddieEnabled]);

  return (
    <BrowserRouter>
      <Background
        spuddieEnabled={spuddieEnabled}
        onToggleSpuddie={() => setSpuddieEnabled((enabled) => !enabled)}
      />
      <div id="main-content" style={{ position: 'relative' }}>
        <NavBar />
        <WanderingSpuddie enabled={spuddieEnabled} />
        <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
