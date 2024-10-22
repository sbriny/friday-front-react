import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const CanvasContainer = styled.div`
  width: 120%;
  padding-bottom: 120%; /* 使容器保持1:1的宽高比 */
  position: relative;
  max-width: 800px; /* 可以设置最大宽度，防止在大屏幕上过大 */
  max-height: 800px;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const KeywordCloud = () => {
  const [keywordsData, setKeywordsData] = useState([]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKeywords();
    window.addEventListener('resize', initializeTagCanvas);
    return () => window.removeEventListener('resize', initializeTagCanvas);
  }, []);

  useEffect(() => {
    if (keywordsData.length > 0) {
      initializeTagCanvas();
    }
  }, [keywordsData]);

  const loadKeywords = async () => {
    try {
      const response = await fetch('/node/api/keywords');
      const data = await response.json();
      setKeywordsData(data.keywords);
    } catch (error) {
      console.error('Error loading keywords:', error);
    }
  };

  const initializeTagCanvas = () => {
    if (!window.TagCanvas || !canvasRef.current || keywordsData.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const size = Math.min(container.offsetWidth, container.offsetHeight);

    canvas.width = size;
    canvas.height = size;

    const keywordList = document.getElementById('keyword-list');
    keywordList.innerHTML = '';

    const maxFreq = Math.max(...keywordsData.map(item => item.freq));
    const minFreq = Math.min(...keywordsData.map(item => item.freq));

    keywordsData.forEach(({ word, freq }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = word;

      const normalizedFreq = (freq - minFreq) / (maxFreq - minFreq);
      const fontSize = 1 + normalizedFreq * 24; // 12px to 36px
    //   const hue = 200 - normalizedFreq * 200; // Blue to Red
      const saturation = 80 + normalizedFreq * 20; // 80% to 100%
      const lightness = 60 - normalizedFreq * 20; // 60% to 40%

      a.style.fontSize = `${fontSize}px`;
    //   a.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      a.style.color = `#aaa`;

      li.appendChild(a);
      keywordList.appendChild(li);
    });

    window.TagCanvas.Start('keyword-canvas', 'keyword-list', {
      textColour: null,
      outlineMethod: 'none',
      reverse: true,
      depth: 1.8,
      maxSpeed: 0.09,
      weight: true,
      wheelZoom: false,
      fadeIn: 1000,
      initial: [0.1, -0.1],
      clickToFront: 600,
      lock: 'xy',
      imageScale: null,
      fadeIn: 1000,
      dragControl: true,
      decel: 0.95,
      repeatTags: 0,
      shuffleTags: true,
      stretchX: 1,
      stretchY: 1,
      shape: 'sphere',
      minBrightness: 0.1,
      maxBrightness: 1,
      radiusX: 1,
      radiusY: 1,
      radiusZ: 1,
    });
  };

  return (
    <CanvasContainer ref={containerRef}>
      <Canvas id="keyword-canvas" ref={canvasRef}>
        <ul id="keyword-list"></ul>
      </Canvas>
    </CanvasContainer>
  );
};

export default KeywordCloud;