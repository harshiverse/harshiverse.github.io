import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playerStats } from '../../data/content';

interface PlayerStatsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Categorized skill groups for the stats overlay */
const skillGroups = [
  {
    label: 'LANGUAGES',
    skills: [
      { name: 'HTML / CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 72 },
      { name: 'Python', level: 78 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    label: 'FRAMEWORKS & LIBRARIES',
    skills: [
      { name: 'React', level: 82 },
      { name: 'Vite / Webpack', level: 75 },
      { name: 'TensorFlow / Keras', level: 60 },
    ],
  },
  {
    label: 'DESIGN TOOLS',
    skills: [
      { name: 'Figma', level: 88 },
      { name: 'Canva', level: 95 },
      { name: 'Adobe Suite', level: 72 },
      { name: 'UI/UX Design', level: 85 },
    ],
  },
  {
    label: 'DEV TOOLS',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'VS Code', level: 90 },
    ],
  },
];

const PlayerStatsOverlay = memo(function PlayerStatsOverlay({ isOpen, onClose }: PlayerStatsOverlayProps) {
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateSkills(true), 400);
      return () => clearTimeout(timer);
    } else {
      setAnimateSkills(false);
    }
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 's' || e.key === 'S') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  const monoStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '1.8px',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-emerald)',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: 'rgba(10, 46, 26, 0.55)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Stats Panel */}
          <motion.div
            className="relative z-10 w-full overflow-y-auto"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              maxWidth: '820px',
              maxHeight: '88vh',
              backgroundColor: 'rgba(208, 228, 204, 0.95)',
              border: '2px solid rgba(26, 92, 56, 0.18)',
              borderRadius: '6px',
              padding: '28px 32px 22px',
              boxShadow: '0 16px 56px rgba(10, 46, 26, 0.3)',
            }}
          >
            {/* ─── HEADER ─── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ ...monoStyle, fontSize: '9px', marginBottom: '4px', opacity: 0.5 }}>
                  PLAYER STATS · LEDGER
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-accent-forest)',
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    margin: '0 0 4px 0',
                  }}
                >
                  {playerStats.name}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--color-accent-emerald)',
                  opacity: 0.7,
                }}>
                  {playerStats.title} · {playerStats.location}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="cursor-pointer hover:opacity-100 transition-opacity"
                style={{
                  color: 'var(--color-accent-emerald)',
                  opacity: 0.5,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  background: 'none',
                  border: 'none',
                  marginTop: '2px',
                }}
              >
                [ESC]
              </button>
            </div>

            {/* Thin divider */}
            <div style={{ height: '1px', backgroundColor: 'rgba(26, 92, 56, 0.12)', marginBottom: '22px' }} />

            {/* ═══════ TWO-COLUMN BODY ═══════ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>

              {/* ──── LEFT: SKILL MATRIX + ACADEMY ──── */}
              <div>
                <p style={{ ...monoStyle, fontSize: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '14px', height: '1.5px', backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
                  SKILL MATRIX
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {skillGroups.map((group) => {
                    let globalIdx = 0;
                    skillGroups.forEach((g) => { if (g.label !== group.label) globalIdx += g.skills.length; else return; });
                    return (
                      <div key={group.label} style={{ marginBottom: '8px' }}>
                        {/* Category label */}
                        <p style={{ ...monoStyle, fontSize: '9px', marginBottom: '6px', opacity: 0.55 }}>
                          {group.label}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {group.skills.map((skill, idx) => (
                            <div key={skill.name}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                                <span style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '12.5px',
                                  fontWeight: 500,
                                  color: 'var(--color-accent-forest)',
                                }}>
                                  {skill.name}
                                </span>
                                <span style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10.5px',
                                  color: 'var(--color-accent-emerald)',
                                  opacity: 0.7,
                                }}>
                                  {skill.level}%
                                </span>
                              </div>
                              <div style={{
                                width: '100%',
                                height: '12px',
                                borderRadius: '2px',
                                backgroundColor: 'rgba(26, 92, 56, 0.1)',
                                overflow: 'hidden',
                              }}>
                                <motion.div
                                  style={{
                                    height: '100%',
                                    borderRadius: '2px',
                                    background: 'linear-gradient(90deg, #3a6b6b, #5a9e8f, #8edbc6)',
                                  }}
                                  initial={{ width: '0%' }}
                                  animate={{ width: animateSkills ? `${skill.level}%` : '0%' }}
                                  transition={{ duration: 0.8, delay: (globalIdx + idx) * 0.05, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── ACADEMY (education, separated from jobs) ── */}
                <div style={{ marginTop: '20px' }}>
                  <p style={{ ...monoStyle, fontSize: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '14px', height: '1.5px', backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
                    ACADEMY
                  </p>
                  {playerStats.educationEntries.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.35 }}
                    >
                      <p style={{ ...monoStyle, fontSize: '9px', marginBottom: '2px', opacity: 0.6 }}>
                        {edu.period}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: 'var(--color-accent-forest)',
                        margin: '0 0 1px',
                      }}>
                        {edu.degree}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11.5px',
                        fontStyle: 'italic',
                        color: 'var(--color-accent-emerald)',
                        opacity: 0.8,
                        margin: '0 0 4px',
                      }}>
                        {edu.institution}
                      </p>
                      {edu.note && (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'var(--color-accent-forest)',
                          opacity: 0.85,
                        }}>
                          → {edu.note}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ──── RIGHT: CAREER TIMELINE (jobs only) ──── */}
              <div>
                <p style={{ ...monoStyle, fontSize: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '14px', height: '1.5px', backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
                  CAREER TIMELINE
                </p>

                <div style={{ position: 'relative' }}>
                  {playerStats.experiences.map((exp, idx) => (
                    <motion.div
                      key={exp.company}
                      style={{
                        marginBottom: '18px',
                        paddingLeft: '22px',
                        position: 'relative',
                      }}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + idx * 0.1, duration: 0.35 }}
                    >
                      {/* Diamond marker */}
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '4px',
                        width: '9px',
                        height: '9px',
                        borderRadius: '2px',
                        transform: 'rotate(45deg)',
                        backgroundColor: 'transparent',
                        border: '1.5px solid var(--color-accent-emerald)',
                      }} />

                      {/* Connecting line */}
                      {idx < playerStats.experiences.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '4px',
                          top: '16px',
                          bottom: '-12px',
                          width: '1px',
                          backgroundColor: 'rgba(26, 92, 56, 0.1)',
                        }} />
                      )}

                      <p style={{ ...monoStyle, fontSize: '9px', marginBottom: '2px', opacity: 0.7 }}>
                        {exp.period}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--color-accent-forest)',
                        margin: '0 0 1px',
                      }}>
                        {exp.role}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: 'var(--color-accent-emerald)',
                        opacity: 0.8,
                        margin: '0 0 5px',
                      }}>
                        {exp.company}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {exp.highlights.map((h, hi) => (
                          <li key={hi} style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11.5px',
                            color: 'var(--color-accent-forest)',
                            opacity: 0.9,
                            marginBottom: '2px',
                            lineHeight: 1.5,
                          }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══════ RECOGNITION — FULL WIDTH ═══════ */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ height: '1px', backgroundColor: 'rgba(26, 92, 56, 0.1)', marginBottom: '18px' }} />

              <p style={{ ...monoStyle, fontSize: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '1.5px', backgroundColor: 'var(--color-accent-emerald)', opacity: 0.4 }} />
                RECOGNITION
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {playerStats.achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    style={{
                      border: '1.5px solid rgba(26, 92, 56, 0.15)',
                      borderRadius: '4px',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.12 }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: 'var(--color-accent-forest)',
                      marginBottom: '3px',
                    }}>
                      {a.title}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--color-accent-forest)',
                      opacity: 0.8,
                      lineHeight: 1.5,
                    }}>
                      {a.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ═══════ FOOTER ═══════ */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '18px', flexWrap: 'wrap' }}>
              {[
                playerStats.email,
                playerStats.phone,
                playerStats.portfolio,
                `${playerStats.github}.github.io`,
              ].map((item) => (
                <span key={item} style={{ ...monoStyle, fontSize: '9px', opacity: 0.35 }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default PlayerStatsOverlay;
