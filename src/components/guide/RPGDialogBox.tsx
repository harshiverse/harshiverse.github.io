import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RPGDialogBoxProps {
  text: string | null;
  isVisible: boolean;
}

const RPGDialogBox = memo(function RPGDialogBox({ text, isVisible }: RPGDialogBoxProps) {
  return (
    <AnimatePresence>
      {isVisible && text && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="rpg-dialog"
          style={{ width: '240px', maxWidth: 'calc(100vw - 160px)' }}
        >
          {/* Ornamental corner brackets — top-left and bottom-left */}
          <span className="corner-bl" />
          <span className="corner-br" />
          
          <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-rpg-text)', margin: 0 }}>
            {text}
          </p>

          {/* Small decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-2 opacity-40">
            <div className="w-3 h-px" style={{ backgroundColor: 'var(--color-accent-emerald)' }} />
            <span style={{ color: 'var(--color-highlight-gold)', fontSize: '7px' }}>◆</span>
            <div className="w-3 h-px" style={{ backgroundColor: 'var(--color-accent-emerald)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default RPGDialogBox;
