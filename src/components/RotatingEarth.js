import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateDay = keyframes`
  0% { background-position: 120% 0; }
  100% { background-position: -80% 0; }
`;

const rotateNight = keyframes`
  0% { background-position: calc(120% + 120px) 0; }
  100% { background-position: calc(-80% + 120px) 0; }
`;

const spinClouds = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(20deg); }
  100% { transform: rotate(0deg); }
`;

const PlanetContainer = styled.div`
  border-radius: 50%;
  box-shadow: 5px -3px 10px 3px #5e90f1;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  z-index: 1;
`;

const Night = styled.div`
  animation: ${rotateNight} 80s linear infinite;
  background-image: url(https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg);
  background-size: 200%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Day = styled.div`
  animation: ${rotateDay} 80s linear infinite;
  background-image: url(https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg);
  background-size: 200%;
  border-left: solid 1px black;
  border-radius: 50%;
  box-shadow: 5px 0 20px 10px #040615 inset; 
  position: absolute;
  top: 0;
  left: 22%;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const Clouds = styled.div`
  animation: ${rotateDay} 50s linear infinite, ${spinClouds} 100s ease infinite;
  background-image: url(https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg);
  background-size: 200%;
  border-radius: 50%;    
  box-shadow: 5px 0 20px 10px #040615 inset, -9px 0px 20px 10px #5e90f1 inset;
  position: absolute;
  top: 0;
  left: 20%;
  width: 100%;
  height: 100%;
  opacity: 0.45;
  z-index: 4;
`;

const InnerShadow = styled.div`
  background: transparent;
  border-radius: 50%;
  box-shadow: -5px 0 10px 1px #152b57 inset, 5px 0 10px 1px #040615 inset;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const RotatingEarth = () => {
  return (
    <PlanetContainer>
      <Night />
      <Day />
      <Clouds />
      <InnerShadow />
    </PlanetContainer>
  );
};

export default RotatingEarth;