import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import RPGDialogBox from './RPGDialogBox';

interface GuideSpriteProps {
  dialogText: string | null;
  showDialog: boolean;
}

const GuideSprite = memo(function GuideSprite({ dialogText, showDialog }: GuideSpriteProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const floatY = useSpring(0, { stiffness: 20, damping: 15 });
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Gentle idle float animation
  useEffect(() => {
    const animate = () => {
      frameRef.current += 0.015;
      floatY.set(Math.sin(frameRef.current) * 6);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [floatY]);

  const handleClick = useCallback(() => {
    if (isBouncing) return;
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  }, [isBouncing]);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-1" id="guide-sprite">
      {/* Dialog Box — positioned above sprite */}
      <RPGDialogBox text={dialogText} isVisible={showDialog} />

      {/* Sprite Character */}
      <motion.div
        onClick={handleClick}
        className="cursor-pointer select-none relative"
        style={{ y: floatY }}
        animate={isBouncing ? {
          scaleY: [1, 0.85, 1.12, 0.95, 1],
          scaleX: [1, 1.08, 0.92, 1.03, 1],
        } : {}}
        transition={isBouncing ? { duration: 0.45, ease: 'easeInOut' } : {}}
      >
        {/* Glow base under sprite */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: '160px',
            height: '22px',
            background: 'radial-gradient(ellipse, rgba(162, 225, 195, 0.5) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        {/* The actual sprite illustration */}
        <div style={{ height: '50vh', width: 'auto' }} className="relative">
          <img
            src="/guide-sprite.png"
            alt="Harshita — Guide"
            className="w-full h-full object-contain drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 4px 16px rgba(26, 92, 56, 0.2))',
            }}
          />

          {/* Subtle glow ring around character */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 80%, rgba(162, 225, 195, 0.1) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Small label */}
        <div
          className="text-center mt-1 px-3 py-0.5 rounded-sm"
          style={{
            color: 'var(--color-accent-emerald)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            background: 'radial-gradient(ellipse, rgba(201, 168, 76, 0.12) 0%, transparent 70%)',
            textShadow: '0 0 10px rgba(201, 168, 76, 0.5)',
          }}
        >
          GUIDE
        </div>
      </motion.div>
    </div>
  );
});

export default GuideSprite;
