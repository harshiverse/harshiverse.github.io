import { memo, useMemo } from 'react';

interface DataStream {
  id: number;
  left: number;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
}

const JadePillars = memo(function JadePillars() {
  const pillars = useMemo(() => {
    const count = 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i + 0.5) * (100 / count),
      width: 40 + Math.random() * 30,
      opacity: 0.15 + Math.random() * 0.2,
      animDelay: Math.random() * 6,
    }));
  }, []);

  const streams: DataStream[] = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: 1 + Math.random() * 2,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 12,
      opacity: 0.08 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Jade Pillars */}
      {pillars.map((p) => (
        <div
          key={`pillar-${p.id}`}
          className="jade-pillar absolute top-0 bottom-0"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            opacity: p.opacity,
            transform: 'translateX(-50%)',
            animationDelay: `${p.animDelay}s`,
          }}
        />
      ))}

      {/* Data Streams — elegant Matrix-like vertical light */}
      {streams.map((s) => (
        <div
          key={`stream-${s.id}`}
          className="absolute top-0"
          style={{
            left: `${s.left}%`,
            width: `${s.width}px`,
            height: '40%',
            background: `linear-gradient(180deg, transparent 0%, rgba(162, 225, 195, ${s.opacity}) 30%, rgba(90, 184, 160, ${s.opacity * 0.7}) 70%, transparent 100%)`,
            animation: `dataStreamFall ${s.duration}s linear ${s.delay}s infinite`,
            borderRadius: '0 0 2px 2px',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Horizontal scan line effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(162, 225, 195, 0.02) 3px,
            rgba(162, 225, 195, 0.02) 4px
          )`,
        }}
      />
    </div>
  );
});

export default JadePillars;
