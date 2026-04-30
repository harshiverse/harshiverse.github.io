import { memo } from 'react';
import { motion } from 'framer-motion';
import { portals } from '../../data/content';

interface GDProjectsSectionProps {
  sectionId: string;
}

const GDProjectsSection = memo(function GDProjectsSection({ sectionId }: GDProjectsSectionProps) {
  const gallery = portals.find((p) => p.id === 'gallery');
  if (!gallery) return null;

  return (
    <section id={sectionId} className="gd-section gd-section-alt">
      <div className="gd-container">
        <motion.h2
          className="gd-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="gd-divider" style={{ marginTop: '0', marginBottom: '32px' }}>
          <div className="gd-divider-line" />
          <span className="gd-divider-dot">◇</span>
          <div className="gd-divider-line" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gd-gap-md)' }}>
          {gallery.projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="gd-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' as const, marginTop: '4px' }}>
                    {project.role}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontSize: '10px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(20, 85, 48, 0.08)', border: '1px solid rgba(20, 85, 48, 0.15)', textDecoration: 'none', transition: 'opacity 0.2s' }}>
                      [GitHub]
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-highlight-teal)', fontSize: '10px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(61, 168, 136, 0.08)', border: '1px solid rgba(61, 168, 136, 0.15)', textDecoration: 'none', transition: 'opacity 0.2s' }}>
                      [Live]
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)', fontSize: '13.5px', lineHeight: 1.7, marginBottom: '14px' }}>
                {project.description}
              </p>

              {/* Impact */}
              <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(20, 85, 48, 0.06)', border: '1px solid rgba(20, 85, 48, 0.12)', marginBottom: '14px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
                  <span style={{ color: 'var(--color-highlight-gold)' }}>▸ Impact:</span> {project.impact}
                </p>
              </div>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '4px', background: 'rgba(150, 192, 145, 0.3)', color: 'var(--color-text-secondary)', border: '1px solid rgba(150, 192, 145, 0.5)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default GDProjectsSection;
