import { motion } from 'motion/react';

const Card = ({ style, text, image, containerRef }) => {
  const commonProps = {
    className: image
      ? 'absolute w-15 cursor-grab'
      : 'bg-storm absolute w-[12rem] cursor-grab rounded-full px-1 py-4 text-center text-xl font-extralight ring ring-gray-700',
    style: style,
    whileHover: { scale: 1.05 },
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 1,
  };

  return image && !text ? (
    <motion.img {...commonProps} src={image} alt='card' />
  ) : (
    <motion.div {...commonProps}>{text}</motion.div>
  );
};

export default Card;
