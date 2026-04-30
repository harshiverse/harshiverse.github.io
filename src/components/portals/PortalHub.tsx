import { memo } from 'react';
import { motion } from 'framer-motion';
import Portal from './Portal';
import { portals } from '../../data/content';

interface PortalHubProps {
  onEnterPortal: (id: string) => void;
  onHoverElement: (id: string | null) => void;
}

const PortalHub = memo(function PortalHub({ onEnterPortal, onHoverElement }: PortalHubProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 md:px-12 relative"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Header — top section, offset below fixed navbar (~64px) */}
      <motion.div
        className="text-center relative z-10"
        style={{ paddingTop: '96px' }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Decorative top rune */}
        <motion.div
          className="text-2xl mb-4 select-none"
          style={{ color: 'var(--color-highlight-gold)', opacity: 0.7 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          ◈
        </motion.div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)' }}
        >
          Portfolio Site
        </h1>

        <p
          className="mt-3 text-sm md:text-base font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
        >
          Harshita Mittal — Frontend Developer & Designer
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
          <span style={{ color: 'var(--color-highlight-gold)', fontSize: '10px' }}>◇</span>
          <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
        </div>
      </motion.div>

      {/* Spacer between header and portals */}
      <div className="flex-1 min-h-12 md:min-h-16" />

      <motion.p
        className="text-center relative z-10"
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)',
          fontSize: 'clamp(20px, 2.5vw, 24px)',
          fontWeight: 600,
          letterSpacing: '1.5px',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
      >
        Choose one to continue
      </motion.p>

      {/* Spacer between CTA and portals */}
      <div className="min-h-8 md:min-h-12" />

      {/* Portal Grid — row 1: first 3, row 2: last 2 centered */}
      <div className="flex flex-col items-center gap-10 md:gap-14 relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-14 lg:gap-20">
          {portals.slice(0, 3).map((portal, index) => (
            <Portal
              key={portal.id}
              portal={portal}
              index={index}
              onEnter={onEnterPortal}
              onHover={onHoverElement}
            />
          ))}
        </div>
        {/* Bottom row — centered */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-14 lg:gap-20">
          {portals.slice(3).map((portal, index) => (
            <Portal
              key={portal.id}
              portal={portal}
              index={index + 3}
              onEnter={onEnterPortal}
              onHover={onHoverElement}
            />
          ))}
        </div>
      </div>

      {/* Spacer between portals and footer text */}
      <div className="flex-1 min-h-8 md:min-h-12" />

      {/* Bottom instruction */}
      <motion.p
        className="pb-6 md:pb-8 text-xs tracking-wider uppercase select-none"
        style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', opacity: 0.55 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Click a portal to enter · Hover for details · Press [S] for stats
      </motion.p>
    </div>
  );
});

export default PortalHub;
