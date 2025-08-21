import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const EMAIL = 'obiware.dev@gmail.com';
const COPY_TIMEOUT_MS = 2000;

const ANIMATION_CONFIG = {
  duration: 0.1,
  ease: 'easeInOut',
};

const BUTTON_STYLES =
  'bg-primary relative w-[12rem] cursor-pointer overflow-hidden rounded-full px-1 py-4 text-center text-sm font-extralight';
const TEXT_STYLES = 'flex items-center justify-center gap-2';

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timerId = setTimeout(() => {
      setCopied(false);
    }, COPY_TIMEOUT_MS);

    return () => clearTimeout(timerId);
  }, [copied]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  }, []);

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className={BUTTON_STYLES}
      aria-label={copied ? 'Email copied to clipboard' : 'Copy email address to clipboard'}
    >
      <AnimatePresence mode='wait'>
        {copied ? (
          <motion.p
            className={TEXT_STYLES}
            key='copied'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={ANIMATION_CONFIG}
          >
            <img src='assets/copy-done.svg' className='w-5' alt='Success checkmark' />
            Email has Copied
          </motion.p>
        ) : (
          <motion.p
            className={TEXT_STYLES}
            key='copy'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_CONFIG.duration }}
          >
            <img src='assets/copy.svg' alt='Copy icon' className='w-5' />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
