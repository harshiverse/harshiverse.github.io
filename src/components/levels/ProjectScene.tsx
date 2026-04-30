import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectSceneProps {
  project: Project;
  index: number;
}

const ProjectScene = memo(function ProjectScene({ project, index }: ProjectSceneProps) {
  return (
    <motion.div
      className="rpg-dialog mb-6 text-left"
      style={{ padding: '20px 24px' }}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
    >
      <span className="corner-bl" />
      <span className="corner-br" />

      {/* Project header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3
            className="text-base md:text-lg font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-forest)' }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs mt-0.5 font-medium uppercase tracking-wider"
            style={{ color: 'var(--color-accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
          >
            {project.role}
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-2 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-2 py-1 rounded hover:opacity-100 transition-opacity"
              style={{
                color: 'var(--color-accent-emerald)',
                backgroundColor: 'rgba(26, 92, 56, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                opacity: 0.8,
              }}
            >
              [GitHub]
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-2 py-1 rounded hover:opacity-100 transition-opacity"
              style={{
                color: 'var(--color-highlight-teal)',
                backgroundColor: 'rgba(90, 184, 160, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                opacity: 0.8,
              }}
            >
              [Live]
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ color: 'var(--color-accent-forest)', opacity: 0.9 }}
      >
        {project.description}
      </p>

      {/* Impact callout */}
      <div
        className="text-xs px-3 py-2 rounded mb-3"
        style={{
          backgroundColor: 'rgba(26, 92, 56, 0.06)',
          border: '1px solid rgba(26, 92, 56, 0.1)',
          color: 'var(--color-accent-emerald)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
        }}
      >
        <span style={{ color: 'var(--color-highlight-gold)' }}>▸ Impact:</span> {project.impact}
      </div>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              backgroundColor: 'rgba(162, 225, 195, 0.2)',
              color: 'var(--color-accent-emerald)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              border: '1px solid rgba(162, 225, 195, 0.3)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

export default ProjectScene;
