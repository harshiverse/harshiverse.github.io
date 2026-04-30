import { memo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import GDNavBar from './GDNavBar';
import GDHero from './GDHero';
import GDToolsSection from './GDToolsSection';
import GDBrandingSection from './GDBrandingSection';
import GDProjectsSection from './GDProjectsSection';

interface GraphicDesignViewProps {
  onExit: () => void;
}

const SECTION_IDS: Record<string, string> = {
  canva: 'gd-tools',
  figma: 'gd-tools',
  photoshop: 'gd-tools',
  illustrator: 'gd-tools',
  framer: 'gd-tools',
  branding: 'gd-branding',
  'ad creatives': 'gd-projects',
  'social media': 'gd-projects',
  marketing: 'gd-projects',
  logo: 'gd-branding',
  magazine: 'gd-projects',
  brochure: 'gd-projects',
};

const GraphicDesignView = memo(function GraphicDesignView({ onExit }: GraphicDesignViewProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleFilterSelect = useCallback((filter: string) => {
    if (!filter) return;
    const sectionId = SECTION_IDS[filter.toLowerCase()];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    // Check if query matches any known section
    for (const [key, sectionId] of Object.entries(SECTION_IDS)) {
      if (key.includes(q) || q.includes(key)) {
        scrollToSection(sectionId);
        return;
      }
    }
    // Check section keywords
    if (q.includes('tool')) scrollToSection('gd-tools');
    else if (q.includes('brand') || q.includes('tarai')) scrollToSection('gd-branding');
    else if (q.includes('project') || q.includes('work')) scrollToSection('gd-projects');
  }, [scrollToSection]);

  return (
    <motion.div
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <GDNavBar
        onExit={onExit}
        onFilterSelect={handleFilterSelect}
        onSearch={handleSearch}
      />

      <GDHero />

      <GDToolsSection sectionId="gd-tools" />

      <div className="gd-container">
        <div className="gd-divider">
          <div className="gd-divider-line" />
          <span className="gd-divider-dot">◇</span>
          <div className="gd-divider-line" />
        </div>
      </div>

      <GDBrandingSection sectionId="gd-branding" />

      <div className="gd-container">
        <div className="gd-divider">
          <div className="gd-divider-line" />
          <span className="gd-divider-dot">◇</span>
          <div className="gd-divider-line" />
        </div>
      </div>

      <GDProjectsSection sectionId="gd-projects" />

      {/* Bottom return prompt */}
      <div className="gd-container" style={{ textAlign: 'center', paddingBottom: '48px', paddingTop: '24px' }}>
        <motion.button
          onClick={onExit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ opacity: 0.9 }}
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent-emerald)',
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px',
          }}
        >
          ← Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
});

export default GraphicDesignView;
