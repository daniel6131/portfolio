import { memo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const ParallaxLayer = memo(({ image, zIndex, transform }) => (
  <motion.div
    className={`absolute inset-0 ${zIndex}`}
    style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: 'bottom',
      backgroundSize: 'cover',
      ...transform,
    }}
  />
));
ParallaxLayer.displayName = 'ParallaxLayer';

const ParallaxBackground = memo(() => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 50 });

  const layers = [
    {
      id: 1,
      image: '/assets/sky.jpg',
      zIndex: '-z-50',
      transform: {},
    },
    {
      id: 2,
      image: '/assets/mountain-3.png',
      zIndex: '-z-40',
      transform: { y: useTransform(smoothScroll, [0, 0.5], ['0%', '70%']) },
    },
    {
      id: 3,
      image: '/assets/planets.png',
      zIndex: '-z-30',
      transform: { x: useTransform(smoothScroll, [0, 0.5], ['0%', '-200%']) },
    },
    {
      id: 4,
      image: '/assets/mountain-2.png',
      zIndex: '-z-20',
      transform: { y: useTransform(smoothScroll, [0, 0.5], ['0%', '30%']) },
    },
    {
      id: 5,
      image: '/assets/mountain-1.png',
      zIndex: '-z-10',
      transform: { y: useTransform(smoothScroll, [0, 0.5], ['0%', '0%']) },
    },
  ];

  return (
    <section className='absolute inset-0 bg-black/40'>
      <div className='relative h-screen overflow-y-hidden'>
        {layers.map(layer => (
          <ParallaxLayer key={layer.id} {...layer} />
        ))}
      </div>
    </section>
  );
});
ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
