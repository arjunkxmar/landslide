import React, { useEffect, useRef } from 'react';

export default function WeatherEffectsOverlay({ effect = 'rain', intensity = 'medium', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Particles array
    const drops = [];
    const count = intensity === 'heavy' ? 70 : (intensity === 'light' ? 25 : 45);

    for (let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 18 + 10,
        speed: Math.random() * 5 + 4,
        opacity: Math.random() * 0.35 + 0.15
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.speed * 0.4, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * 0.4;

        if (d.y > height) {
          d.y = -d.length;
          d.x = Math.random() * (width + 50);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [effect, intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none z-[1] opacity-60 ${className}`}
      aria-hidden="true"
    />
  );
}
