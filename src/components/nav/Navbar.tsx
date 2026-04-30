import { memo } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onStatsOpen: () => void;
  showStats: boolean;
  currentView: string;
  isMuted: boolean;
  onToggleAudio: () => void;
}

const Navbar = memo(function Navbar({ onStatsOpen, showStats, currentView, isMuted, onToggleAudio }: NavbarProps) {
  if (currentView !== 'hub' || showStats) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 36px',
        backgroundColor: 'transparent',
      }}
    >
      {/* Left — icon + brand */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexShrink: 0 }}>
        {/* Small glyph icon */}
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '1.5px solid rgba(26, 92, 56, 0.4)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1px',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'var(--color-accent-emerald)', fontSize: '16px', lineHeight: 1 }}>◈</span>
        </div>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-accent-forest)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.3px',
              lineHeight: 1.2,
            }}
          >
            harshiverse
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent-emerald)',
              fontSize: '10.5px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              opacity: 0.8,
              marginTop: '2px',
            }}
          >
            My Portfolio
          </p>
        </div>
      </div>

      {/* Right — Player Stats + Audio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <motion.button
          onClick={onStatsOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1.5px solid rgba(20, 85, 48, 0.25)',
            borderRadius: '999px',
            padding: '9px 22px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            background: 'rgba(140, 185, 140, 0.45)',
            boxShadow: 'none',
          }}
          whileHover={{ scale: 1.03, y: -2, background: 'rgba(130, 175, 130, 0.55)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-highlight-gold)',
              flexShrink: 0,
              animation: 'portalRingPulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
            }}
          >
            Player Stats
          </span>
        </motion.button>

        <motion.button
          onClick={onToggleAudio}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(26, 92, 56, 0.35)',
            cursor: 'pointer',
            flexShrink: 0,
            backgroundColor: 'transparent',
          }}
          whileHover={{ borderColor: 'rgba(26, 92, 56, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          title={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent-emerald)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMuted ? (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </>
            )}
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
});

export default Navbar;
