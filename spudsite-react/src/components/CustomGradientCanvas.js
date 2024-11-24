import React from 'react';
import { GradientCanvas } from 'shadergradient';

// CustomGradientCanvas accepts children, gradientProps, and other props.
const CustomGradientCanvas = ({ children, ...props }) => {

  // Forward gradientProps and other props to the GradientCanvas component.
  return (
    <GradientCanvas pointerEvents="auto" {...props}>
      {children}
    </GradientCanvas>
  );
};

export default CustomGradientCanvas;
