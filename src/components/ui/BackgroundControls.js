import React, { useState } from 'react';
import './BackgroundControls.css';
import spudFront from "../../img/SpudFront.png";

const CONTROL_GROUPS = [
  {
    title: 'Colors',
    controls: [
      { key: 'color1', label: 'Color 1', type: 'color' },
      { key: 'color2', label: 'Color 2', type: 'color' },
      { key: 'color3', label: 'Color 3', type: 'color' },
    ],
  },
  {
    title: 'Shape',
    controls: [
      { key: 'type', label: 'Type', type: 'select', options: ['plane', 'sphere', 'waterPlane'] },
      { key: 'grain', label: 'Grain', type: 'select', options: ['off', 'on'] },
    ],
  },
  {
    title: 'Motion',
    controls: [
      { key: 'uSpeed', label: 'Speed', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'uStrength', label: 'Strength', type: 'range', min: 0, max: 8, step: 0.1 },
      { key: 'uDensity', label: 'Density', type: 'range', min: 0, max: 4, step: 0.1 },
      { key: 'uFrequency', label: 'Frequency', type: 'range', min: 0, max: 12, step: 0.1 },
      { key: 'uTime', label: 'Time', type: 'range', min: 0, max: 10, step: 0.1 },
    ],
  },
  {
    title: 'Position',
    controls: [
      { key: 'positionX', label: 'X', type: 'range', min: -3, max: 3, step: 0.1 },
      { key: 'positionY', label: 'Y', type: 'range', min: -3, max: 3, step: 0.1 },
      { key: 'positionZ', label: 'Z', type: 'range', min: -3, max: 3, step: 0.1 },
    ],
  },
  {
    title: 'Rotation',
    controls: [
      { key: 'rotationX', label: 'X', type: 'range', min: -180, max: 180, step: 1 },
      { key: 'rotationY', label: 'Y', type: 'range', min: -180, max: 180, step: 1 },
      { key: 'rotationZ', label: 'Z', type: 'range', min: -180, max: 180, step: 1 },
    ],
  },
  {
    title: 'Camera',
    controls: [
      { key: 'cAzimuthAngle', label: 'Azimuth', type: 'range', min: 0, max: 360, step: 1 },
      { key: 'cPolarAngle', label: 'Polar', type: 'range', min: 0, max: 180, step: 1 },
      { key: 'cDistance', label: 'Distance', type: 'range', min: 0.5, max: 10, step: 0.1 },
    ],
  },
];

function normalizeNumber(value) {
  if (Number.isInteger(value)) return value;
  return Number(value.toFixed(3));
}

function BackgroundControls({ params, onChange, onReset, spuddieEnabled = true, onToggleSpuddie }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateParam = (key, value) => {
    onChange({
      ...params,
      [key]: value,
    });
  };

  const renderControl = (control) => {
    const value = params[control.key];

    if (control.type === 'select') {
      return (
        <select
          id={`shader-gradient-${control.key}`}
          value={value}
          onChange={(event) => updateParam(control.key, event.target.value)}
        >
          {control.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (control.type === 'checkbox') {
      return (
        <input
          id={`shader-gradient-${control.key}`}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => updateParam(control.key, event.target.checked)}
        />
      );
    }

    if (control.type === 'color') {
      return (
        <input
          id={`shader-gradient-${control.key}`}
          type="color"
          value={value}
          onChange={(event) => updateParam(control.key, event.target.value)}
        />
      );
    }

    return (
      <div className="shader-gradient-range-row">
        <input
          id={`shader-gradient-${control.key}`}
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(event) => updateParam(control.key, normalizeNumber(Number(event.target.value)))}
        />
        <input
          type="number"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          aria-label={`${control.label} value`}
          onChange={(event) => updateParam(control.key, Number(event.target.value))}
        />
      </div>
    );
  };

  return (
    <div className="shader-gradient-control" data-spuddie-avoid="true">
      <div className="shader-gradient-actions">
        {onToggleSpuddie && (
          <button
            className={`shader-gradient-spuddie-toggle ${spuddieEnabled ? "is-enabled" : ""}`}
            type="button"
            onClick={onToggleSpuddie}
            aria-pressed={spuddieEnabled}
            aria-label={spuddieEnabled ? "Disable wandering Spuddie" : "Enable wandering Spuddie"}
            title={spuddieEnabled ? "Disable Spuddie" : "Enable Spuddie"}
          >
            <img src={spudFront} alt="" className="shader-gradient-spuddie-icon" />
          </button>
        )}
        <button
          className="shader-gradient-toggle"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="shader-gradient-menu"
          title="Background controls"
        >
          BG
        </button>
      </div>

      {isOpen && (
        <aside id="shader-gradient-menu" className="shader-gradient-menu" aria-label="Background controls">
          <div className="shader-gradient-menu-content">
            <div className="shader-gradient-menu-header">
              <h2>Background</h2>
              <button type="button" onClick={onReset}>
                Restore
              </button>
            </div>

            <div className="shader-gradient-groups">
              {CONTROL_GROUPS.map((group) => (
                <section className="shader-gradient-group" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.controls.map((control) => (
                    <label className="shader-gradient-field" key={control.key} htmlFor={`shader-gradient-${control.key}`}>
                      <span>{control.label}</span>
                      {renderControl(control)}
                    </label>
                  ))}
                </section>
              ))}
            </div>

            <div className="shader-gradient-preview">
              Changes apply live
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default BackgroundControls;
