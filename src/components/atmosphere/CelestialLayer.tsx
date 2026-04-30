import { memo } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface CelestialLayerProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/* ── Gold palette — warm gradient gold, not flat ── */
const GOLD_WARM  = 'rgba(198, 168, 62, 0.6)';
const GOLD_GLOW  = 'rgba(210, 180, 80, 0.12)';

/* ═══════════════════════════════════════════════════
   LAYER 1 — FAR BACKGROUND (atmosphere)
   Faint stars, low opacity, slight blur, very slow
   ═══════════════════════════════════════════════════ */

/** Deterministic star positions — edges only, not center */
const FAR_STARS = [
  { x: '5%',  y: '8%',  r: 1.2 },
  { x: '12%', y: '25%', r: 0.8 },
  { x: '8%',  y: '70%', r: 1.0 },
  { x: '3%',  y: '55%', r: 0.7 },
  { x: '92%', y: '12%', r: 1.1 },
  { x: '88%', y: '40%', r: 0.9 },
  { x: '95%', y: '75%', r: 1.0 },
  { x: '15%', y: '90%', r: 0.8 },
  { x: '75%', y: '5%',  r: 0.7 },
  { x: '85%', y: '88%', r: 0.9 },
  { x: '35%', y: '3%',  r: 0.6 },
  { x: '60%', y: '95%', r: 0.7 },
];

function FarLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ filter: 'blur(1px)' }}
    >
      {FAR_STARS.map((star, i) => (
        <motion.div
          key={`far-${i}`}
          className="absolute rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.r * 2,
            height: star.r * 2,
            background: `radial-gradient(circle, ${GOLD_WARM} 0%, transparent 70%)`,
          }}
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LAYER 2 — MID LAYER (structure)
   Light constellations, thin golden lines
   Spread at edges, not behind main text
   ═══════════════════════════════════════════════════ */

/** Constellation cluster — connected dots */
function ConstellationCluster({
  x, y, scale = 1, opacity = 0.2
}: { x: string; y: string; scale?: number; opacity?: number }) {
  const points = [
    [8, 12], [22, 5], [35, 15], [28, 28], [42, 35], [15, 32],
  ];
  const connections = [[0,1],[1,2],[2,3],[3,4],[3,5],[5,0]];

  return (
    <motion.svg
      width={50 * scale}
      height={40 * scale}
      viewBox="0 0 50 40"
      fill="none"
      className="absolute"
      style={{ left: x, top: y }}
      animate={{ opacity: [opacity * 0.6, opacity, opacity * 0.6] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={points[a][0]} y1={points[a][1]}
          x2={points[b][0]} y2={points[b][1]}
          stroke="rgba(198, 168, 62, 0.35)"
          strokeWidth="0.6"
        />
      ))}
      {points.map(([px, py], i) => (
        <circle
          key={`d-${i}`}
          cx={px} cy={py}
          r={i % 2 === 0 ? 1.2 : 0.8}
          fill="rgba(198, 168, 62, 0.6)"
        />
      ))}
    </motion.svg>
  );
}

/** Thin arc — decorative crescent line */
function ThinArc({
  x, y, size = 40, rotation = 0, opacity = 0.15
}: { x: string; y: string; size?: number; rotation?: number; opacity?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="absolute"
      style={{ left: x, top: y, transform: `rotate(${rotation}deg)` }}
      animate={{ opacity: [opacity * 0.5, opacity, opacity * 0.5] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M8 30 Q20 2 32 30"
        stroke="rgba(198, 168, 62, 0.45)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="30" r="1.2" fill="rgba(198, 168, 62, 0.5)" />
      <circle cx="32" cy="30" r="1.2" fill="rgba(198, 168, 62, 0.5)" />
    </motion.svg>
  );
}

function MidLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Constellation clusters — edge positions only */}
      <ConstellationCluster x="4%" y="18%" scale={1.1} opacity={0.2} />
      <ConstellationCluster x="88%" y="65%" scale={0.9} opacity={0.18} />

      {/* Thin arcs — decorative crescents at corners */}
      <ThinArc x="6%" y="60%" size={35} rotation={-20} opacity={0.15} />
      <ThinArc x="90%" y="15%" size={30} rotation={140} opacity={0.12} />
      <ThinArc x="82%" y="80%" size={28} rotation={45} opacity={0.1} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LAYER 3 — NEAR LAYER (portal energy)
   Sharp, slightly brighter elements near vault cards.
   Radial glow, orbiting dots, faint halos.
   These are positioned relative to the viewport
   where portal cards typically render.
   ═══════════════════════════════════════════════════ */

/** Radial soft glow behind a portal position */
function PortalGlow({ x, y, size = 200 }: { x: string; y: string; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${GOLD_GLOW} 0%, transparent 70%)`,
      }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Orbiting dot around a portal position */
function OrbitingDot({
  cx, cy, orbitR, size = 3, duration = 20, delay = 0, opacity = 0.4,
}: {
  cx: string; cy: string; orbitR: number; size?: number;
  duration?: number; delay?: number; opacity?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: cx,
        top: cy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(210, 180, 80, ${opacity}) 0%, transparent 70%)`,
      }}
      animate={{
        x: [
          Math.cos(0) * orbitR,
          Math.cos(Math.PI * 0.5) * orbitR,
          Math.cos(Math.PI) * orbitR,
          Math.cos(Math.PI * 1.5) * orbitR,
          Math.cos(Math.PI * 2) * orbitR,
        ],
        y: [
          Math.sin(0) * orbitR,
          Math.sin(Math.PI * 0.5) * orbitR,
          Math.sin(Math.PI) * orbitR,
          Math.sin(Math.PI * 1.5) * orbitR,
          Math.sin(Math.PI * 2) * orbitR,
        ],
        opacity: [opacity * 0.5, opacity, opacity * 0.7, opacity, opacity * 0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  );
}

/** Faint halo ring around a portal */
function PortalHalo({ x, y, r = 80 }: { x: string; y: string; r?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: r * 2,
        height: r * 2,
        transform: 'translate(-50%, -50%)',
        border: '0.8px solid rgba(198, 168, 62, 0.15)',
      }}
      animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/*
 * Portal positions are approximate viewport %s for a 5-card layout:
 * Row 1: ~22%, ~50%, ~72% horizontal — ~55% vertical
 * Row 2: ~36%, ~64% horizontal — ~80% vertical
 */
const PORTAL_CENTERS = [
  { x: '22%', y: '54%' },
  { x: '46%', y: '54%' },
  { x: '68%', y: '54%' },
  { x: '34%', y: '82%' },
  { x: '56%', y: '82%' },
];

function NearLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {PORTAL_CENTERS.map((pos, i) => (
        <div key={i}>
          {/* Radial glow behind each portal */}
          <PortalGlow x={pos.x} y={pos.y} size={180 + (i % 2) * 30} />

          {/* Faint halo */}
          <PortalHalo x={pos.x} y={pos.y} r={75 + (i % 3) * 10} />

          {/* 2–3 orbiting dots per portal */}
          <OrbitingDot
            cx={pos.x} cy={pos.y}
            orbitR={55 + i * 5}
            size={2.5} duration={18 + i * 4} delay={i * 2}
            opacity={0.35}
          />
          <OrbitingDot
            cx={pos.x} cy={pos.y}
            orbitR={40 + i * 3}
            size={2} duration={24 + i * 3} delay={i * 1.5 + 5}
            opacity={0.25}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT — compose all 3 layers with parallax
   ═══════════════════════════════════════════════════ */

const CelestialLayer = memo(function CelestialLayer({ mouseX, mouseY }: CelestialLayerProps) {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const h = typeof window !== 'undefined' ? window.innerHeight : 1080;

  const farX  = useTransform(mouseX, [0, w], [4, -4]);
  const farY  = useTransform(mouseY, [0, h], [3, -3]);
  const midX  = useTransform(mouseX, [0, w], [8, -8]);
  const midY  = useTransform(mouseY, [0, h], [6, -6]);
  const nearX = useTransform(mouseX, [0, w], [2, -2]);
  const nearY = useTransform(mouseY, [0, h], [1.5, -1.5]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {/* Layer 1 — Far: faint stars, blurred, very slow */}
      <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
        <FarLayer />
      </motion.div>

      {/* Layer 2 — Mid: constellations & arcs at edges */}
      <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
        <MidLayer />
      </motion.div>

      {/* Layer 3 — Near: portal-anchored energy (minimal parallax) */}
      <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
        <NearLayer />
      </motion.div>
    </div>
  );
});

export default CelestialLayer;
