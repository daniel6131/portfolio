import { twMerge } from 'tailwind-merge';

const DEFAULT_CONFIG = {
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
};

const BASE_CLASSES =
  'group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]';

const getAnimationClasses = (vertical, pauseOnHover, reverse) => {
  const baseAnimation = vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row';
  const pauseClass = pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '';
  const reverseClass = reverse ? '[animation-direction:reverse]' : '';

  return twMerge(
    'flex shrink-0 justify-around [gap:var(--gap)]',
    baseAnimation,
    pauseClass,
    reverseClass
  );
};

const MarqueeContent = ({ children, vertical, pauseOnHover, reverse, repeat }) => (
  <>
    {Array.from({ length: repeat }, (_, i) => (
      <div key={i} className={getAnimationClasses(vertical, pauseOnHover, reverse)}>
        {children}
      </div>
    ))}
  </>
);

export default function Marquee({ className, children, ...userProps }) {
  const config = { ...DEFAULT_CONFIG, ...userProps };
  const { reverse, pauseOnHover, vertical, repeat, ...restProps } = config;

  return (
    <div
      {...restProps}
      className={twMerge(BASE_CLASSES, vertical ? 'flex-col' : 'flex-row', className)}
    >
      <MarqueeContent
        vertical={vertical}
        pauseOnHover={pauseOnHover}
        reverse={reverse}
        repeat={repeat}
      >
        {children}
      </MarqueeContent>
    </div>
  );
}
