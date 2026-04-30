import { memo } from 'react';
import { motion } from 'framer-motion';

interface AudioControllerProps {
  isMuted: boolean;
  onToggle: () => void;
}

const AudioController = memo(function AudioController({ isMuted, onToggle }: AudioControllerProps) {
  return (
    <motion.button
      id="audio-toggle"
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full cursor-pointer"
      style={{
        backgroundColor: 'rgba(214, 229, 207, 0.9)',
        border: '2px solid rgba(26, 92, 56, 0.3)',
      }}
      whileHover={{ scale: 1.1, borderColor: 'rgba(26, 92, 56, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      title={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a5c38"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isMuted ? (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        )}
      </svg>
    </motion.button>
  );
});

export default AudioController;
