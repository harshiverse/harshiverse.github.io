import { memo } from 'react';
import { motion } from 'framer-motion';

const GDHero = memo(function GDHero() {
  return (
    <section
      className="gd-section"
      style={{ paddingTop: '120px', paddingBottom: '24px', textAlign: 'center' }}
    >
      <div className="gd-container">
        {/* Decorative rune */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            color: 'var(--color-highlight-gold)',
            fontSize: '24px',
            marginBottom: '16px',
          }}
        >
          ◈
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent-forest)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '1px',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Graphic Design
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase' as const,
            marginTop: '12px',
          }}
        >
          Creative & Design Work • Selected Projects
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="gd-divider"
          style={{ marginTop: '24px', marginBottom: '0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="gd-divider-line" />
          <span className="gd-divider-dot">◇</span>
          <div className="gd-divider-line" />
        </motion.div>
      </div>
    </section>
  );
});

export default GDHero;
