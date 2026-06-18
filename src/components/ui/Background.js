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
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
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
