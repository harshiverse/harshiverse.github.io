import { memo } from 'react';

const MeshGradientBG = memo(function MeshGradientBG() {
  return (
    <div
      className="fixed inset-0 -z-20"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 30%, rgba(200, 225, 195, 0.5) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 80% 70%, rgba(162, 225, 195, 0.35) 0%, transparent 55%),
          radial-gradient(ellipse 60% 80% at 50% 10%, rgba(212, 228, 207, 0.6) 0%, transparent 50%),
          radial-gradient(ellipse 50% 60% at 70% 90%, rgba(90, 184, 160, 0.15) 0%, transparent 50%),
          linear-gradient(180deg, #e8f0e4 0%, #d4e4cf 40%, #c2d6ba 100%)
        `,
        backgroundSize: '200% 200%, 200% 200%, 200% 200%, 200% 200%, 100% 100%',
        animation: 'meshShift 25s ease-in-out infinite',
      }}
    />
  );
});

export default MeshGradientBG;
