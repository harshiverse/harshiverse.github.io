import { memo } from 'react';
import { motion } from 'framer-motion';
import ProjectScene from './ProjectScene';
import { portals } from '../../data/content';
import GraphicDesignView from '../graphic-design/GraphicDesignView';

interface LevelViewProps {
  portalId: string;
  onExit: () => void;
}

const LevelView = memo(function LevelView({ portalId, onExit }: LevelViewProps) {
  // Route gallery portal to dedicated Graphic Design view
  if (portalId === 'gallery') {
    return <GraphicDesignView onExit={onExit} />;
  }

  const portal = portals.find((p) => p.id === portalId);
  if (!portal) return null;

  return (
    <motion.div
      className="min-h-screen px-4 py-12 flex flex-col items-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <motion.button
        onClick={onExit}
        className="fixed top-6 left-6 z-40 text-xs font-medium px-4 py-2 rounded cursor-pointer hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: 'var(--color-rpg-bg)',
          border: '2px double var(--color-rpg-border)',
          color: 'var(--color-accent-forest)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          opacity: 0.8,
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Return to Archive
      </motion.button>

      {/* Level Header */}
      <motion.div
        className="text-center mb-10 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="text-3xl mb-2 block">{portal.icon}</span>
        <h1
          className="text-2xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)' }}
        >
          {portal.title}
        </h1>
        <p
          className="text-xs mt-2 tracking-widest uppercase"
          style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}
        >
          {portal.subtitle} · {portal.projects.length} Artifacts
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-8 h-px" style={{ backgroundColor: portal.accentColor, opacity: 0.5 }} />
          <span style={{ color: portal.accentColor, fontSize: '10px' }}>◇</span>
          <div className="w-8 h-px" style={{ backgroundColor: portal.accentColor, opacity: 0.5 }} />
        </div>
      </motion.div>

      {/* Projects */}
      <div className="w-full max-w-2xl">
        {portal.projects.map((project, index) => (
          <ProjectScene key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom return prompt */}
      <motion.button
        onClick={onExit}
        className="mt-8 text-xs tracking-wider uppercase cursor-pointer hover:opacity-100 transition-opacity"
        style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', opacity: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      >
        ← Return to the Jade Archive
      </motion.button>
    </motion.div>
  );
});

export default LevelView;
