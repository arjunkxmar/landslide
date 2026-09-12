import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShieldAlert, AlertTriangle, Info, RotateCcw, Eye, Compass } from 'lucide-react';

export default function TerrainRiskVisualization({ onSelectSector, className = '' }) {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState('sector-4'); // Default critical sector
  const [isRotating, setIsRotating] = useState(true);

  // Sector Data for Landslide Risk
  const SECTORS = [
    {
      id: 'sector-1',
      name: 'Sector 1 — Valley Base',
      riskLevel: 'LOW',
      riskScore: 22,
      color: 0x10b981,
      hex: '#10b981',
      slope: '14°',
      rain: '24 mm',
      status: 'Stable Overburden, Low Saturation'
    },
    {
      id: 'sector-2',
      name: 'Sector 2 — Mid-Eastern Flank',
      riskLevel: 'MODERATE',
      riskScore: 46,
      color: 0xf59e0b,
      hex: '#f59e0b',
      slope: '29°',
      rain: '68 mm',
      status: 'Elevated Pore Pressure Watch'
    },
    {
      id: 'sector-3',
      name: 'Sector 3 — Upper Ridge Pass',
      riskLevel: 'HIGH',
      riskScore: 71,
      color: 0xf97316,
      hex: '#f97316',
      slope: '39°',
      rain: '115 mm',
      status: 'Soil Creep Detected (4.2mm shear)'
    },
    {
      id: 'sector-4',
      name: 'Sector 4 — Steep Escarpment Peak',
      riskLevel: 'CRITICAL',
      riskScore: 92,
      color: 0xef4444,
      hex: '#ef4444',
      slope: '48°',
      rain: '184 mm',
      status: 'Immediate Failure Hazard • Saturated'
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.018);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(24, 28, 38);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050505, 1);
    container.appendChild(renderer.domElement);

    // Group for whole rotating mountain
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // Procedural Mountain Terrain with 4 Distinct Risk Slope Quadrants
    const gridRes = 80;
    const planeSize = 50;
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, gridRes, gridRes);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    // Color definitions
    const colLow = new THREE.Color(0x10b981);
    const colMod = new THREE.Color(0xf59e0b);
    const colHigh = new THREE.Color(0xf97316);
    const colCrit = new THREE.Color(0xef4444);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Distinct slope morphology: high ridge at +X, steep drop towards -X, -Z
      const dist = Math.sqrt(x * x + z * z);
      const mountainShape = Math.exp(-((x - 4) * (x - 4) + (z - 4) * (z - 4)) / 140) * 16.0;
      const ridge = Math.cos(x * 0.18) * Math.sin(z * 0.18) * 3.5;
      const ruggedness = Math.sin(x * 0.6) * Math.cos(z * 0.6) * 0.8;
      const edgeFalloff = Math.max(0, 1 - dist / 26);

      const y = Math.max(0, (mountainShape + ridge + ruggedness) * edgeFalloff);
      pos.setY(i, y);

      // Vertex color distribution based on hazard quadrants and elevation
      let c = colLow;
      if (x > 0 && z > 0) {
        // Upper steep peak: Critical (Red)
        c = y > 6 ? colCrit : colHigh;
      } else if (x > 0 && z <= 0) {
        // Upper Ridge: High (Orange)
        c = colHigh;
      } else if (x <= 0 && z > 0) {
        // Mid Flank: Moderate (Amber/Yellow)
        c = colMod;
      } else {
        // Valley: Low (Green)
        c = colLow;
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.computeVertexNormals();
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Base Mountain Material
    const terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.65,
      metalness: 0.15,
      flatShading: true
    });
    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    terrainGroup.add(terrainMesh);

    // Glowing wireframe contour lines
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    wireframeMesh.position.y += 0.05;
    terrainGroup.add(wireframeMesh);

    // Warning Markers on Risk Zones (3D Pin Beacons)
    const markerPositions = [
      { id: 'sector-1', pos: new THREE.Vector3(-10, 1.5, -10), color: 0x10b981 },
      { id: 'sector-2', pos: new THREE.Vector3(-8, 4.5, 8), color: 0xf59e0b },
      { id: 'sector-3', pos: new THREE.Vector3(10, 8.5, -8), color: 0xf97316 },
      { id: 'sector-4', pos: new THREE.Vector3(5, 14.5, 5), color: 0xef4444 }
    ];

    const beaconPointers = [];

    markerPositions.forEach((m) => {
      // Pin pole
      const poleGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8);
      const poleMat = new THREE.MeshBasicMaterial({ color: m.color });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.copy(m.pos);
      pole.position.y += 1.25;
      terrainGroup.add(pole);

      // Floating diamond beacon head
      const beaconGeo = new THREE.OctahedronGeometry(0.7, 0);
      const beaconMat = new THREE.MeshBasicMaterial({ 
        color: m.color, 
        wireframe: false 
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(m.pos);
      beacon.position.y += 2.8;
      terrainGroup.add(beacon);

      // Pulsing ring
      const ringGeo = new THREE.RingGeometry(0.6, 0.8, 16);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(m.pos);
      ring.position.y += 0.2;
      terrainGroup.add(ring);

      beaconPointers.push({ beacon, ring, color: m.color, id: m.id });
    });

    // Environmental Moisture / Rain Particle Flow
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pCoords[i * 3] = (Math.random() - 0.5) * 35;
      pCoords[i * 3 + 1] = Math.random() * 15 + 2;
      pCoords[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.45,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const rainParticles = new THREE.Points(particleGeo, pMat);
    terrainGroup.add(rainParticles);

    // Scene Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(30, 45, 25);
    scene.add(dirLight);

    const rim = new THREE.DirectionalLight(0x06b6d4, 0.9);
    rimLightPos: rim.position.set(-25, 30, -20);
    scene.add(rim);

    // Mouse drag rotation control
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      terrainGroup.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(10, Math.min(45, camera.position.y - deltaY * 0.1));
      camera.lookAt(0, 4, 0);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize handler
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
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Auto rotation if enabled and not dragging
      if (isRotating && !isDragging) {
        terrainGroup.rotation.y += 0.005;
      }

      // Pulse beacon heads & rings
      beaconPointers.forEach(({ beacon, ring }, idx) => {
        beacon.rotation.y = time * 2 + idx;
        const scale = 1 + Math.sin(time * 3 + idx) * 0.15;
        beacon.scale.set(scale, scale, scale);

        const ringScale = 1 + ((time * 1.5 + idx * 0.5) % 1) * 1.8;
        ring.scale.set(ringScale, ringScale, ringScale);
        ring.material.opacity = Math.max(0, 0.8 - (ringScale - 1) / 1.8);
      });

      // Flow environmental rain particles downward
      const pArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] -= 0.12;
        if (pArr[i * 3 + 1] < 0) {
          pArr[i * 3 + 1] = 16;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      terrainMaterial.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, [isRotating]);

  const activeSectorData = SECTORS.find(s => s.id === activeZone) || SECTORS[3];

  return (
    <div className={`relative rounded-2xl glass-panel border border-[#1f1f1f] overflow-hidden ${className}`}>
      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#080808]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#222222] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            3D Landslide Risk Terrain Model
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
              isRotating
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                : 'bg-[#111111] border-[#262626] text-[#A1A1AA] hover:text-white'
            }`}
            title="Toggle 3D auto rotation"
          >
            {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-[380px] sm:h-[420px] cursor-grab active:cursor-grabbing" 
      />

      {/* Interactive Sector Selector Strip */}
      <div className="p-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="text-xs font-mono text-[#71717A] mb-2 flex items-center justify-between">
          <span>Click a terrain quadrant to inspect localized sensor risk:</span>
          <span className="text-[10px] hidden sm:inline">Drag to rotate 3D view</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SECTORS.map((sec) => {
            const isSelected = activeZone === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveZone(sec.id);
                  if (onSelectSector) onSelectSector(sec);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151515] border-white/30 shadow-lg'
                    : 'bg-[#0f0f0f] border-[#1f1f1f] hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-white truncate">{sec.name.split('—')[0]}</span>
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: sec.hex }} 
                  />
                </div>
                <div className="text-xs font-mono font-bold" style={{ color: sec.hex }}>
                  {sec.riskLevel} ({sec.riskScore}%)
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Telemetry Detail Card */}
        <div className="mt-3 p-3 rounded-xl bg-[#111111] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <div className="text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSectorData.hex }} />
              <span>{activeSectorData.name}</span>
            </div>
            <p className="text-[#A1A1AA] text-[11px] mt-0.5">{activeSectorData.status}</p>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <div>
              <span className="text-[#71717A] block text-[9px]">Slope Angle</span>
              <span className="text-white font-bold">{activeSectorData.slope}</span>
            </div>
            <div>
              <span className="text-[#71717A] block text-[9px]">24h Rain</span>
              <span className="text-cyan-400 font-bold">{activeSectorData.rain}</span>
            </div>
            <div>
              <span className="text-[#71717A] block text-[9px]">Factor of Safety</span>
              <span className={activeSectorData.riskScore > 75 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {activeSectorData.riskScore > 75 ? '0.84 (Critical)' : '1.82 (Stable)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
