import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PhotoSphere = ({ imageUrls }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ visible: false });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 8;

    const loader = new THREE.TextureLoader();

    function fibonacciSphere(samples, radius) {
      const points = [];
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y) * radius;
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        points.push(new THREE.Vector3(x, y * radius, z));
      }
      return points;
    }

    const positions = fibonacciSphere(imageUrls.length, 5.1);

    imageUrls.forEach((url, index) => {
      const planeGeo = new THREE.PlaneGeometry(2.5, 2.5);
      const planeMat = new THREE.MeshBasicMaterial({
        map: loader.load(url),
        side: THREE.DoubleSide,
        transparent: true
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);

      plane.position.copy(positions[index]);
      plane.lookAt(0, 0, 0);

      sphere.add(plane);
    });

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', onResize);
    onResize();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
    };
  }, [imageUrls]);

  return <div ref={containerRef} style={{ width: '140%', height: '140%' ,


    position: 'relative',

    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}} />;
};

export default PhotoSphere;