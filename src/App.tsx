import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MeshGradientBG from './components/atmosphere/MeshGradientBG';
import JadePillars from './components/atmosphere/JadePillars';
import DataParticleCanvas from './components/atmosphere/DataParticleCanvas';
import ParallaxLayer from './components/atmosphere/ParallaxLayer';
import CelestialLayer from './components/atmosphere/CelestialLayer';
import GuideSprite from './components/guide/GuideSprite';
import PortalHub from './components/portals/PortalHub';
import PortalTransition from './components/portals/PortalTransition';
import LevelView from './components/levels/LevelView';
import PlayerStatsOverlay from './components/stats/PlayerStatsOverlay';
import Navbar from './components/nav/Navbar';
import { useMousePosition } from './hooks/useMousePosition';
import { useAudio } from './hooks/useAudio';
import { usePortalNavigation } from './hooks/usePortalNavigation';
import { dialogMap } from './data/content';

function App() {
  const { mouseX, mouseY } = useMousePosition();
  const { isMuted, toggle: toggleAudio } = useAudio();
  const { currentView, activePortal, isTransitioning, enterPortal, exitPortal } = usePortalNavigation();
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [statsOpen, setStatsOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') {
        if (!statsOpen && currentView === 'hub') {
          setStatsOpen(true);
        }
      }
      if (e.key === 'Escape') {
        if (statsOpen) {
          setStatsOpen(false);
        } else if (currentView === 'level') {
          exitPortal();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [statsOpen, currentView, exitPortal]);

  const handleHover = useCallback((elementId: string | null) => {
    setHoveredElement(elementId);
  }, []);

  const dialogText = hoveredElement ? dialogMap[hoveredElement] || null : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── ATMOSPHERE LAYERS ── */}
      <MeshGradientBG />
      <JadePillars />
      <DataParticleCanvas />
      <ParallaxLayer mouseX={mouseX} mouseY={mouseY} />
      <CelestialLayer mouseX={mouseX} mouseY={mouseY} />

      {/* ── NAVBAR ── */}
      <Navbar
        onStatsOpen={() => setStatsOpen(true)}
        showStats={statsOpen}
        currentView={currentView}
        isMuted={isMuted}
        onToggleAudio={toggleAudio}
      />

      {/* ── MAIN VIEWS ── */}
      <AnimatePresence mode="wait">
        {currentView === 'hub' && (
          <PortalHub
            key="hub"
            onEnterPortal={enterPortal}
            onHoverElement={handleHover}
          />
        )}
        {currentView === 'level' && activePortal && (
          <LevelView
            key={`level-${activePortal}`}
            portalId={activePortal}
            onExit={exitPortal}
          />
        )}
      </AnimatePresence>

      {/* ── PORTAL TRANSITION ── */}
      <PortalTransition
        isActive={isTransitioning}
        portalId={activePortal}
        direction={currentView === 'transition' && activePortal ? 'enter' : 'exit'}
      />

      {/* ── GUIDE SPRITE ── */}
      <GuideSprite
        dialogText={dialogText}
        showDialog={hoveredElement !== null}
      />

      {/* ── PLAYER STATS OVERLAY ── */}
      <PlayerStatsOverlay
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
      />
    </div>
  );
}

export default App;
