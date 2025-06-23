import { motion } from 'motion/react';

const MOTION_CONFIG = {
  whileHover: { scale: 1.05 },
  drag: true,
  dragElastic: 1,
};

const CARD_STYLES = {
  common: 'absolute cursor-grab',
  text: 'bg-storm w-[12rem] rounded-full px-1 py-4 text-center text-xl font-extralight ring ring-gray-700',
  image: 'w-15',
};

const Card = ({ style, text, image, containerRef }) => {
  const baseClassName = `${CARD_STYLES.common} ${image ? CARD_STYLES.image : CARD_STYLES.text}`;

  const motionProps = {
    className: baseClassName,
    style,
    dragConstraints: containerRef,
    ...MOTION_CONFIG,
  };

  return image && !text ? (
    <motion.img {...motionProps} src={image} alt='card' />
  ) : (
    <motion.div {...motionProps}>{text}</motion.div>
  );
};

export default Card;
