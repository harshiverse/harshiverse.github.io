import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortalTransitionProps {
  isActive: boolean;
  portalId: string | null;
  direction: 'enter' | 'exit';
}

const accentColors: Record<string, string> = {
  gallery: 'rgba(201, 168, 76, 0.15)',
  forest: 'rgba(90, 184, 160, 0.15)',
  forge: 'rgba(26, 92, 56, 0.15)',
};

const PortalTransition = memo(function PortalTransition({ isActive, portalId, direction }: PortalTransitionProps) {
  const accent = portalId ? accentColors[portalId] || 'rgba(162, 225, 195, 0.15)' : 'rgba(162, 225, 195, 0.15)';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Expanding radial mask */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${accent} 0%, var(--color-canvas) 60%)`,
            }}
            initial={{ 
              clipPath: direction === 'enter' ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)',
              scale: direction === 'enter' ? 1 : 1,
            }}
            animate={{ 
              clipPath: direction === 'enter' ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
              scale: direction === 'enter' ? 1.2 : 1,
            }}
            exit={{
              clipPath: 'circle(100% at 50% 50%)',
            }}
            transition={{ duration: direction === 'enter' ? 2 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Speed lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.8, 0] }}
            transition={{ duration: direction === 'enter' ? 2 : 1.2, times: [0, 0.3, 0.7, 1] }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '2px',
                  height: '40vh',
                  background: `linear-gradient(180deg, transparent, rgba(162, 225, 195, 0.3), transparent)`,
                  transformOrigin: '50% 0%',
                  transform: `rotate(${i * 30}deg)`,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1.5, 0] }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>

          {/* Center flash */}
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'var(--color-highlight-teal)' }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 8, 40], opacity: [1, 0.6, 0] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default PortalTransition;
