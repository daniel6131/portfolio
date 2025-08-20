import { motion, AnimatePresence } from 'motion/react';
import { useMemo } from 'react';

const alertVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.8 },
};

const ALERT_CONFIG = {
  danger: {
    containerBg: 'bg-red-800',
    statusBg: 'bg-red-500',
    statusText: 'Failed',
  },
  success: {
    containerBg: 'bg-royal',
    statusBg: 'bg-lavender',
    statusText: 'Success',
  },
};

const Alert = ({ type, text }) => {
  const config = useMemo(() => ALERT_CONFIG[type] || ALERT_CONFIG.success, [type]);

  return (
    <AnimatePresence>
      <motion.div
        className='fixed right-5 bottom-5 z-50 flex items-center justify-center'
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={alertVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className={`flex items-center rounded-md p-5 leading-none text-indigo-100 lg:inline-flex lg:rounded-full ${config.containerBg}`}
          role='alert'
          aria-live='assertive'
        >
          <p
            className={`mr-3 flex rounded-full px-2 py-1 text-xs font-semibold uppercase ${config.statusBg}`}
          >
            {config.statusText}
          </p>
          <p className='mr-2 text-left'>{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
