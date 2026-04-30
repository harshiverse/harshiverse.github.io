import { useState, useCallback } from 'react';
import type { AppView } from '../types';

export function usePortalNavigation() {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enterPortal = useCallback((portalId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActivePortal(portalId);
    setCurrentView('transition');

    setTimeout(() => {
      setCurrentView('level');
      setIsTransitioning(false);
    }, 2500);
  }, [isTransitioning]);

  const exitPortal = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentView('transition');

    setTimeout(() => {
      setCurrentView('hub');
      setActivePortal(null);
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning]);

  return { currentView, activePortal, isTransitioning, enterPortal, exitPortal };
}
