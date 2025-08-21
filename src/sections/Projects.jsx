import { useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Project from '../components/Project';
import { myProjects } from '../constants';

const SPRING_CONFIG = {
  damping: 10,
  stiffness: 50,
};

const CURSOR_OFFSET = 20;

const PREVIEW_STYLES =
  'pointer-events-none fixed top-0 left-0 z-50 h-56 w-80 rounded-lg object-cover shadow-lg';
const SEPARATOR_STYLES =
  'mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent';

const Projects = () => {
  const [preview, setPreview] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = useCallback(
    e => {
      x.set(e.clientX + CURSOR_OFFSET);
      y.set(e.clientY + CURSOR_OFFSET);
    },
    [x, y]
  );

  return (
    <section
      id='work'
      onMouseMove={handleMouseMove}
      className='c-space section-spacing relative container mx-auto max-w-7xl'
      aria-label='Projects section'
    >
      <h2 className='text-heading'>My Selected Projects</h2>
      <div className={SEPARATOR_STYLES} />

      {myProjects.map(project => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}

      {preview && (
        <motion.img
          className={PREVIEW_STYLES}
          src={preview}
          alt='Project preview'
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </section>
  );
};

export default Projects;
