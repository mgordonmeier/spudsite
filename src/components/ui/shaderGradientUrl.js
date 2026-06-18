export const SHADER_GRADIENT_BASE_URL = 'https://www.shadergradient.co/customize';

export const DEFAULT_SHADER_GRADIENT_PARAMS = {
  animate: 'on',
  axesHelper: 'off',
  bgColor1: '#000000',
  bgColor2: '#000000',
  brightness: 1.2,
  cAzimuthAngle: 200,
  cDistance: 2.8,
  cPolarAngle: 90,
  cameraZoom: 1,
  color1: '#ff6bda',
  color2: '#85ffa9',
  color3: '#54ffff',
  destination: 'onCanvas',
  embedMode: 'off',
  envPreset: 'lobby',
  format: 'gif',
  fov: 50,
  frameRate: 10,
  gizmoHelper: 'hide',
  grain: 'off',
  lightType: 'env',
  pixelDensity: 2,
  positionX: 0.2,
  positionY: 0.1,
  positionZ: 0,
  range: 'enabled',
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 10,
  rotationY: -10,
  rotationZ: -110,
  shader: 'defaults',
  toggleAxis: false,
  type: 'waterPlane',
  uDensity: 1.3,
  uFrequency: 5.5,
  uSpeed: 0.01,
  uStrength: 3.5,
  uTime: 0,
  wireframe: false,
  zoomOut: false,
};

export const SHADER_GRADIENT_NUMERIC_PARAMS = new Set([
  'brightness',
  'cAzimuthAngle',
  'cDistance',
  'cPolarAngle',
  'cameraZoom',
  'fov',
  'frameRate',
  'pixelDensity',
  'positionX',
  'positionY',
  'positionZ',
  'rangeEnd',
  'rangeStart',
  'reflection',
  'rotationX',
  'rotationY',
  'rotationZ',
  'uAmplitude',
  'uDensity',
  'uFrequency',
  'uSpeed',
  'uStrength',
  'uTime',
]);

export const SHADER_GRADIENT_BOOLEAN_PARAMS = new Set([
  'toggleAxis',
  'wireframe',
  'zoomOut',
]);

export function buildShaderGradientUrl(params) {
  const url = new URL(SHADER_GRADIENT_BASE_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export function readShaderGradientUrl(urlString) {
  const url = new URL(urlString);
  const params = {};

  url.searchParams.forEach((value, key) => {
    if (SHADER_GRADIENT_NUMERIC_PARAMS.has(key)) {
      params[key] = Number(value);
      return;
    }

    if (SHADER_GRADIENT_BOOLEAN_PARAMS.has(key)) {
      params[key] = value === 'true';
      return;
    }

    params[key] = value;
  });

  return params;
}

export const DEFAULT_SHADER_GRADIENT_URL = buildShaderGradientUrl(DEFAULT_SHADER_GRADIENT_PARAMS);
