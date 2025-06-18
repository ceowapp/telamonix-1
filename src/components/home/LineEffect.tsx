import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Road } from './Road';
import InfiniteLights from './InfiniteLights';
import { deepDistortion } from './Distortion';

interface LineEffectProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const LineEffect: React.FC<LineEffectProps> = ({ containerRef }) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      onSpeedUp: (ev) => {},
      onSlowDown: (ev) => {},
      distortion: deepDistortion,

      length: 400,
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,

      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,

      totalSideLightSticks: 50,
      lightPairsPerRoadWay: 50,

      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,

      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],

      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],

      carLightsLength: [400 * 0.05, 400 * 0.15],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.2, 0.2],
      carFloorSeparation: [0.05, 1],

      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        leftCars: [0xE2173C, 0x841010, 0xF23D3D],
        rightCars: [0xffffff, 0x7686BF, 0x1338B5],
        sticks: 0xDCE0EE,
      }
    };

    const scene = new InfiniteLights(containerRef.current, options);

    scene.loadAssets().then(() => {
      scene.init();
    });

    return () => {
      if (scene.dispose) scene.dispose();
    };
  }, [containerRef]);

  return null;
};

export default LineEffect;
