import { memo } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface ParallaxLayerProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const runeSymbols = ['◇', '△', '⬡', '◈', '⟐', '⊕', '⊗', '⟡'];

const ParallaxLayer = memo(function ParallaxLayer({ mouseX, mouseY }: ParallaxLayerProps) {
  const farX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [12, -12]);
  const farY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [8, -8]);

  const midX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [20, -20]);
  const midY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [15, -15]);

  const nearX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [30, -30]);
  const nearY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [20, -20]);

  return (
    <div className="fixed inset-0 -z-8 pointer-events-none overflow-hidden" style={{ zIndex: -8 }}>
      {/* Far layer — large blurred rune shapes */}
      <motion.div style={{ x: farX, y: farY }} className="absolute inset-0">
        {[
          { top: '10%', left: '15%', size: 60, rotation: 20 },
          { top: '60%', left: '75%', size: 50, rotation: -15 },
          { top: '80%', left: '25%', size: 45, rotation: 35 },
        ].map((item, i) => (
          <div
            key={`far-${i}`}
            className="absolute font-heading select-none"
            style={{
              top: item.top,
              left: item.left,
              fontSize: `${item.size}px`,
              color: 'rgba(162, 225, 195, 0.08)',
              transform: `rotate(${item.rotation}deg)`,
              filter: 'blur(2px)',
              animation: `floatGentle ${7 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {runeSymbols[i]}
          </div>
        ))}
      </motion.div>

      {/* Mid layer — rune symbols */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0">
        {[
          { top: '20%', left: '60%', size: 28 },
          { top: '45%', left: '10%', size: 22 },
          { top: '70%', left: '85%', size: 24 },
          { top: '35%', left: '45%', size: 20 },
        ].map((item, i) => (
          <div
            key={`mid-${i}`}
            className="absolute font-mono select-none"
            style={{
              top: item.top,
              left: item.left,
              fontSize: `${item.size}px`,
              color: 'rgba(26, 92, 56, 0.06)',
              animation: `floatGentle ${5 + i * 1.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {runeSymbols[i + 3]}
          </div>
        ))}
      </motion.div>

      {/* Near layer — tiny sparkle dots */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`near-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: i % 3 === 0
                ? 'rgba(201, 168, 76, 0.25)'
                : 'rgba(162, 225, 195, 0.2)',
              animation: `pulseGlow ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
});

export default ParallaxLayer;
