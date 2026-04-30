import { memo, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { Portal as PortalType } from '../../types';

interface PortalProps {
  portal: PortalType;
  index: number;
  onEnter: (id: string) => void;
  onHover: (id: string | null) => void;
}

const Portal = memo(function Portal({ portal, index, onEnter, onHover }: PortalProps) {
  const [isHovered, setIsHovered] = useState(false);

  const floatY = useSpring(0, { stiffness: 15, damping: 12 });

  // Idle float
  useState(() => {
    let frame = 0;
    const offset = index * 2.1;
    const animate = () => {
      frame += 0.012;
      floatY.set(Math.sin(frame + offset) * 8);
      requestAnimationFrame(animate);
    };
    animate();
  });

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{ y: floatY, perspective: '800px' }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(`portal-${portal.id}`);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(null);
      }}
      onClick={() => onEnter(portal.id)}
    >
      <motion.div
        className="portal-arch w-60 md:w-72 h-80 md:h-96 flex flex-col items-center justify-center px-12 py-8 relative"
        animate={{
          rotateY: isHovered ? 3 : 0,
          scale: isHovered ? 1.04 : 1,
          translateZ: isHovered ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 12px 40px ${portal.glowColor}, 0 0 60px ${portal.glowColor}, 0 4px 16px rgba(8, 42, 22, 0.1)`
            : '0 6px 24px rgba(8, 42, 22, 0.08), 0 2px 8px rgba(8, 42, 22, 0.04)',
        }}
      >
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-4 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${portal.glowColor} 0%, transparent 70%)`,
            animation: 'portalRingPulse 4s ease-in-out infinite',
          }}
          animate={{ opacity: isHovered ? 0.6 : 0.2 }}
        />

        {/* Vault number label */}
        <p
          className="absolute top-5 left-1/2 -translate-x-1/2 tracking-widest uppercase select-none"
          style={{
            color: 'var(--color-accent-emerald)',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            opacity: 0.7,
          }}
        >
          Vault {['I', 'II', 'III', 'IV', 'V'][index]}
        </p>

        {/* Portal icon — rune symbol */}
        <motion.span
          className="text-3xl mb-5 relative z-10 select-none"
          style={{ color: portal.accentColor, fontFamily: 'var(--font-heading)', opacity: 0.85 }}
          animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 15 : 0, opacity: isHovered ? 1 : 0.85 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {portal.icon}
        </motion.span>

        {/* Title */}
        <h2
          className="text-xl md:text-2xl font-bold text-center relative z-10 leading-snug"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)' }}
        >
          {portal.title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-xs mt-3 font-medium relative z-10 tracking-wider uppercase"
          style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
        >
          {portal.subtitle}
        </p>

        {/* Entry prompt — pinned to bottom */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium z-10"
          style={{ color: portal.accentColor, fontFamily: 'var(--font-mono)' }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
        >
          [ ENTER ]
        </motion.div>

        {/* Ornamental border glow line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
          style={{ backgroundColor: portal.accentColor }}
          animate={{ width: isHovered ? '60%' : '30%', opacity: isHovered ? 0.8 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
});

export default Portal;
