import { useState, useRef, useCallback } from 'react';

export function useAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<number | null>(null);

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }
  }, []);

  const fadeVolume = useCallback((targetVol: number, duration: number, onDone?: () => void) => {
    if (!audioRef.current) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);

    const audio = audioRef.current;
    const startVol = audio.volume;
    const step = (targetVol - startVol) / (duration / 16);
    
    fadeInterval.current = window.setInterval(() => {
      if (!audioRef.current) return;
      const newVol = audioRef.current.volume + step;
      
      if ((step > 0 && newVol >= targetVol) || (step < 0 && newVol <= targetVol)) {
        audioRef.current.volume = Math.max(0, Math.min(1, targetVol));
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        onDone?.();
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, newVol));
      }
    }, 16);
  }, []);

  const toggle = useCallback(() => {
    initAudio();
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().then(() => {
        fadeVolume(0.25, 500);
      }).catch(() => {
        // Browser blocked autoplay, that's fine
      });
      setIsMuted(false);
    } else {
      fadeVolume(0, 300, () => {
        audioRef.current?.pause();
      });
      setIsMuted(true);
    }
  }, [isMuted, initAudio, fadeVolume]);

  return { isMuted, toggle };
}
