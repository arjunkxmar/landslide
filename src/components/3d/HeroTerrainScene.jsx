import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroTerrainScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 22, 45);
    camera.lookAt(0, 0, -5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Mountain Terrain Geometry with Mathematical Procedural Elevation
    const gridX = 90;
    const gridY = 90;
    const sizeX = 85;
    const sizeY = 85;
    const geometry = new THREE.PlaneGeometry(sizeX, sizeY, gridX, gridY);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Natural mountain elevation function combining frequencies
      const distFromCenter = Math.sqrt(x * x + z * z);
      const falloff = Math.max(0, 1 - distFromCenter / 45);
      
      const wave1 = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 5.5;
      const wave2 = Math.sin(x * 0.25 + 1.2) * Math.cos(z * 0.22) * 2.8;
      const wave3 = Math.sin(x * 0.45) * Math.cos(z * 0.5) * 1.2;
      const peak = Math.exp(-((x + 6) * (x + 6) + (z + 4) * (z + 4)) / 160) * 12.0;
      const peak2 = Math.exp(-((x - 14) * (x - 14) + (z - 8) * (z - 8)) / 220) * 9.5;

      const y = (wave1 + wave2 + wave3 + peak + peak2) * falloff;
      pos.setY(i, y);
    }
    geometry.computeVertexNormals();

    // Terrain Surface Material: Sleek dark surface with subtle specular shine
    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.75,
      metalness: 0.25,
      flatShading: true,
      wireframe: false,
    });
    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    scene.add(terrainMesh);

    // Glowing Contour Lines (Wireframe overlay)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.position.y += 0.04;
    scene.add(wireframeMesh);

    // Floating Atmospheric Data Particles (Sensors & Moisture)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x06b6d4);
    const emeraldColor = new THREE.Color(0x10b981);
    const orangeColor = new THREE.Color(0xf97316);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 70;
      particlePos[i * 3 + 1] = Math.random() * 20 + 2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 70;

      const rnd = Math.random();
      const col = rnd > 0.7 ? orangeColor : (rnd > 0.35 ? cyanColor : emeraldColor);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    mainLight.position.set(20, 40, 20);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    rimLight.position.set(-25, 20, -25);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Slow terrain rotation with subtle tilt
      terrainMesh.rotation.y = time * 0.04 + mouseX;
      wireframeMesh.rotation.y = terrainMesh.rotation.y;
      
      terrainMesh.rotation.x = mouseY * 0.2;
      wireframeMesh.rotation.x = terrainMesh.rotation.x;

      // Gentle floating particles
      particleSystem.rotation.y = -time * 0.02;
      const pPos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3 + 1] += Math.sin(time + i) * 0.015;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      terrainMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full h-full min-h-[420px] overflow-hidden pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
