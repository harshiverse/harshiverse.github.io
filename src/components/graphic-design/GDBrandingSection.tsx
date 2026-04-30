import { memo } from 'react';
import { motion } from 'framer-motion';

interface GDBrandingSectionProps {
  sectionId: string;
}

const GDBrandingSection = memo(function GDBrandingSection({ sectionId }: GDBrandingSectionProps) {
  return (
    <section id={sectionId} className="gd-section">
      <div className="gd-container">
        <motion.h2
          className="gd-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          Branding
        </motion.h2>

        <div className="gd-divider" style={{ marginTop: '0', marginBottom: '32px' }}>
          <div className="gd-divider-line" />
          <span className="gd-divider-dot">◇</span>
          <div className="gd-divider-line" />
        </div>

        <motion.div
          className="gd-case-study"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="gd-case-label">Case Study</span>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)', fontSize: '1.75rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px', lineHeight: 1.2 }}>
            Tarai
          </h3>

          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)', fontSize: '14px', lineHeight: 1.7, maxWidth: '640px', marginBottom: '28px' }}>
            A brand identity system designed for an innovative startup concept — blending minimal aesthetics with strategic visual storytelling to create a cohesive and memorable brand presence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--gd-gap-md)', marginBottom: '32px' }}>
            <div className="gd-card">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>▸ Problem</p>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)', fontSize: '13px', lineHeight: 1.65 }}>
                The startup lacked a unified visual identity — inconsistent colors, typography, and messaging across touchpoints diluted brand recognition and trust among the target audience.
              </p>
            </div>
            <div className="gd-card">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>▸ Solution</p>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)', fontSize: '13px', lineHeight: 1.65 }}>
                Developed a comprehensive brand system including logo, color palette, typography rules, social media templates, and brand guidelines — ensuring consistency and professional appeal across all platforms.
              </p>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--color-text-secondary)', marginBottom: '16px' }}>▸ Visual Previews</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {['Brand Mark', 'Color System', 'Typography', 'Social Templates'].map((label, i) => (
              <motion.div key={label} className="gd-image-placeholder" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i, duration: 0.4 }} style={{ flexDirection: 'column' as const, gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default GDBrandingSection;
