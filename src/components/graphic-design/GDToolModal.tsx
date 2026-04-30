import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ToolData } from './GDToolsSection';

interface GDToolModalProps {
  tool: ToolData | null;
  onClose: () => void;
}

const GDToolModal = memo(function GDToolModal({ tool, onClose }: GDToolModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!tool) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [tool, onClose]);

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          className="gd-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${tool.name} works gallery`}
        >
          <motion.div
            className="gd-modal"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 28px 20px',
                borderBottom: '1px solid rgba(26, 92, 56, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-accent-forest)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent-emerald)',
                      fontSize: '10px',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      margin: '2px 0 0',
                      opacity: 0.6,
                    }}
                  >
                    Selected Works
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(26, 92, 56, 0.15)',
                  background: 'transparent',
                  color: 'var(--color-accent-emerald)',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(26, 92, 56, 0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Gallery body */}
            <div style={{ padding: '24px 28px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                }}
              >
                {tool.works.map((work, i) => (
                  <motion.div
                    key={i}
                    className="gd-image-placeholder"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    style={{ flexDirection: 'column', gap: '8px', padding: '24px' }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {work.type === 'video' ? (
                        <>
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </>
                      ) : (
                        <>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </>
                      )}
                    </svg>
                    <span>{work.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px 28px 28px',
              }}
            >
              {tool.seeMoreUrl ? (
                <a
                  href={tool.seeMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gd-see-more-btn"
                >
                  See More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <span
                  className="gd-see-more-btn"
                  style={{ opacity: 0.4, cursor: 'default' }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default GDToolModal;
