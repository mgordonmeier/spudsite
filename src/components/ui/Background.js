import React, { useEffect, useState } from 'react';
import BackgroundControls from './BackgroundControls';
import {
  DEFAULT_SHADER_GRADIENT_PARAMS,
  buildShaderGradientUrl,
} from './shaderGradientUrl';

function Background({ spuddieEnabled = true, onToggleSpuddie }) {
  const [modules, setModules] = useState(null);
  const [shaderParams, setShaderParams] = useState(DEFAULT_SHADER_GRADIENT_PARAMS);

  useEffect(() => {
    const setViewportHeight = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-viewport-height', `${viewportHeight}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    window.visualViewport?.addEventListener('resize', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      window.visualViewport?.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('shadergradient'),
      import('@react-spring/three'),
      import('@react-three/drei'),
      import('@react-three/fiber')
    ]).then(([shadergradient, reactSpring, drei, fiber]) => {
      if (!mounted) return;
      setModules({ shadergradient, reactSpring, drei, fiber });
    }).catch((err) => {
      console.error('Background load failed', err);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!modules) return null;

  const { ShaderGradientCanvas, ShaderGradient } = modules.shadergradient;
  const importedFiber = { ...modules.fiber, ...modules.drei, ...modules.reactSpring };
  const shaderUrl = buildShaderGradientUrl(shaderParams);

  return (
    <>
      <ShaderGradientCanvas
        importedFiber={importedFiber}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: 'var(--app-viewport-height, 100vh)',
          minHeight: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <ShaderGradient
          key={shaderUrl}
          control="query"
          urlString={shaderUrl}
        />
      </ShaderGradientCanvas>
      <BackgroundControls
        params={shaderParams}
        onChange={setShaderParams}
        onReset={() => setShaderParams(DEFAULT_SHADER_GRADIENT_PARAMS)}
        spuddieEnabled={spuddieEnabled}
        onToggleSpuddie={onToggleSpuddie}
      />
    </>
  );
}

export default Background;
