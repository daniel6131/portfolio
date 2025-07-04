'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Constants
const TIMELINE_STYLES = {
  container: 'c-space section-spacing',
  heading: 'text-heading',
  timelineWrapper: 'relative pb-20',
  itemContainer: 'flex justify-start pt-10 md:gap-10 md:pt-40',
  stickyHeader:
    'sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm',
  dot: 'bg-midnight absolute -left-[15px] flex h-10 w-10 items-center justify-center rounded-full',
  innerDot: 'h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800 p-2',
  desktopInfo:
    'hidden flex-col gap-2 text-xl font-bold text-neutral-300 md:flex md:pl-20 md:text-4xl',
  dateTitle: 'text-3xl text-neutral-400',
  jobTitle: 'text-3xl text-neutral-500',
  contentWrapper: 'relative w-full pr-4 pl-20 md:pl-4',
  mobileInfo: 'mb-4 block text-left text-2xl font-bold text-neutral-300 md:hidden',
  content: 'mb-3 font-normal text-neutral-400',
  progressLine:
    'absolute top-0 left-1 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-1',
  animatedLine:
    'via-lavender/50 absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-[10%] to-transparent',
};

const SCROLL_CONFIG = {
  target: null,
  offset: ['start 10%', 'end 50%'],
};

// Custom hook for timeline height measurement
const useTimelineHeight = ref => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measureHeight = () => {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    };

    measureHeight();

    const resizeObserver = new ResizeObserver(measureHeight);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return height;
};

// Memoized timeline item component
const TimelineItem = ({ item, index }) => (
  <div key={index} className={TIMELINE_STYLES.itemContainer}>
    <div className={TIMELINE_STYLES.stickyHeader}>
      <div className={TIMELINE_STYLES.dot}>
        <div className={TIMELINE_STYLES.innerDot} />
      </div>
      <div className={TIMELINE_STYLES.desktopInfo}>
        <h3>{item.date}</h3>
        <h3 className={TIMELINE_STYLES.dateTitle}>{item.title}</h3>
        <h3 className={TIMELINE_STYLES.jobTitle}>{item.job}</h3>
      </div>
    </div>

    <div className={TIMELINE_STYLES.contentWrapper}>
      <div className={TIMELINE_STYLES.mobileInfo}>
        <h3>{item.date}</h3>
        <h3>{item.job}</h3>
      </div>
      {item.contents.map((content, contentIndex) => (
        <p className={TIMELINE_STYLES.content} key={contentIndex}>
          {content}
        </p>
      ))}
    </div>
  </div>
);

// Main Timeline component
export const Timeline = ({ data }) => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  const height = useTimelineHeight(timelineRef);

  const { scrollYProgress } = useScroll({
    ...SCROLL_CONFIG,
    target: containerRef,
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={TIMELINE_STYLES.container} ref={containerRef}>
      <h2 className={TIMELINE_STYLES.heading}>My Work Experience</h2>
      <div ref={timelineRef} className={TIMELINE_STYLES.timelineWrapper}>
        {data.map((item, index) => (
          <TimelineItem key={item.id || index} item={item} index={index} />
        ))}
        <div style={{ height: `${height}px` }} className={TIMELINE_STYLES.progressLine}>
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={TIMELINE_STYLES.animatedLine}
          />
        </div>
      </div>
    </div>
  );
};
