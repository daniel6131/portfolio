import { motion } from 'motion/react';
import { useCallback, useEffect } from 'react';

const MODAL_ANIMATION = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const MODAL_STYLES = {
  overlay:
    'fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-sm',
  container:
    'from-midnight to-navy relative max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-l shadow-sm',
  closeButton: 'bg-midnight absolute top-5 right-5 rounded-sm p-2 hover:bg-gray-500',
  image: 'w-full rounded-t-2xl',
  content: 'p-5',
  title: 'mb-2 text-2xl font-bold text-white',
  description: 'mb-3 font-normal text-neutral-400',
  footer: 'mt-4 flex items-center justify-between',
  tags: 'flex gap-3',
  tag: 'hover-animation size-10 rounded-lg',
  viewProject: 'hover-animation inline-flex cursor-pointer items-center gap-1 font-medium',
};

const ProjectDetails = ({ title, description, subDescription, image, tags, href, closeModal }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleOverlayClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  return (
    <div className={MODAL_STYLES.overlay} onClick={handleOverlayClick} role='presentation'>
      <motion.div
        className={MODAL_STYLES.container}
        {...MODAL_ANIMATION}
        role='dialog'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <button onClick={closeModal} className={MODAL_STYLES.closeButton} aria-label='Close modal'>
          <img alt='' src='assets/close.svg' className='h-6 w-6' />
        </button>

        <img src={image} alt={title} className={MODAL_STYLES.image} />

        <div className={MODAL_STYLES.content}>
          <h5 id='modal-title' className={MODAL_STYLES.title}>
            {title}
          </h5>

          <div id='modal-description'>
            <p className={MODAL_STYLES.description}>{description}</p>
            {subDescription.map((subDesc, index) => (
              <p key={index} className={MODAL_STYLES.description}>
                {subDesc}
              </p>
            ))}
          </div>

          <div className={MODAL_STYLES.footer}>
            <div className={MODAL_STYLES.tags}>
              {tags.map(tag => (
                <img key={tag.id} src={tag.path} alt={tag.name} className={MODAL_STYLES.tag} />
              ))}
            </div>

            <a
              href={href}
              className={MODAL_STYLES.viewProject}
              target='_blank'
              rel='noopener noreferrer'
            >
              View Project
              <img alt='' src='assets/arrow-up.svg' className='size-4' />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
