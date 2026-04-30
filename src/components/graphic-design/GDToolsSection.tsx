import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import GDToolModal from './GDToolModal';

// Import tool logo images
import canvaLogo from '../../assets/tools/canva.png';
import photoshopLogo from '../../assets/tools/photoshop.png';
import figmaLogo from '../../assets/tools/figma.png';
import illustratorLogo from '../../assets/tools/illustrator.png';
import framerLogo from '../../assets/tools/framer.png';

export interface ToolData {
  id: string;
  name: string;
  logo: string;
  works: { title: string; type: 'image' | 'video'; src?: string }[];
  seeMoreUrl?: string;
}

const TOOLS: ToolData[] = [
  {
    id: 'canva',
    name: 'Canva',
    logo: canvaLogo,
    works: [
      { title: 'Social Media Creative #1', type: 'image' },
      { title: 'Marketing Banner', type: 'image' },
      { title: 'LinkedIn Carousel', type: 'image' },
    ],
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    logo: photoshopLogo,
    works: [
      { title: 'Photo Manipulation', type: 'image' },
      { title: 'Banner Design', type: 'image' },
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    logo: figmaLogo,
    works: [
      { title: 'UI Layout', type: 'image' },
      { title: 'Component Library', type: 'image' },
      { title: 'Wireframes', type: 'image' },
    ],
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    logo: illustratorLogo,
    works: [
      { title: 'Vector Illustration', type: 'image' },
      { title: 'Logo Design', type: 'image' },
    ],
  },
  {
    id: 'framer',
    name: 'Framer',
    logo: framerLogo,
    works: [
      { title: 'Interactive Prototype', type: 'image' },
      { title: 'Animation Demo', type: 'video' },
    ],
  },
];

interface GDToolsSectionProps {
  sectionId: string;
}

const GDToolsSection = memo(function GDToolsSection({ sectionId }: GDToolsSectionProps) {
  const [selectedTool, setSelectedTool] = useState<ToolData | null>(null);

  return (
    <>
      <section id={sectionId} className="gd-section gd-section-alt">
        <div className="gd-container">
          {/* Section title */}
          <motion.h2
            className="gd-section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            Tools
          </motion.h2>

          {/* Subtle sub-label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase' as const,
              marginTop: '-16px',
              marginBottom: '28px',
            }}
          >
            Click a tool to view selected works
          </motion.p>

          {/* Tool grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'var(--gd-gap-md)',
            }}
          >
            {TOOLS.map((tool, i) => (
              <motion.button
                key={tool.id}
                className="gd-tool-card"
                onClick={() => setSelectedTool(tool)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                aria-label={`View ${tool.name} works`}
              >
                <img src={tool.logo} alt={`${tool.name} logo`} />
                <span>{tool.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <GDToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </>
  );
});

export default GDToolsSection;
