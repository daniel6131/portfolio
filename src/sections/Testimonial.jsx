import { twMerge } from 'tailwind-merge';
import { reviews } from '../constants';
import Marquee from '../components/Marquee';

const MARQUEE_DURATION = '[--duration:20s]';
const GRADIENT_CLASSES = 'from-primary pointer-events-none absolute inset-y-0 w-1/4';

const ReviewCard = ({ img, name, username, body }) => (
  <figure
    className={twMerge(
      'bg-indigo to-storm hover:bg-royal active:bg-royal hover-animation relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-50/[.1] p-4'
    )}
  >
    <div className='flex flex-row items-center gap-2'>
      <img className='rounded-full bg-white/10' width='32' height='32' alt='' src={img} />
      <div className='flex flex-col'>
        <figcaption className='text-sm font-medium text-white'>{name}</figcaption>
        <p className='text-xs font-medium text-white/40'>{username}</p>
      </div>
    </div>
    <blockquote className='mt-2 text-sm'>{body}</blockquote>
  </figure>
);

const MarqueeRow = ({ reviews, reverse = false }) => (
  <Marquee reverse={reverse} pauseOnHover className={MARQUEE_DURATION}>
    {reviews.map(review => (
      <ReviewCard key={review.username} {...review} />
    ))}
  </Marquee>
);

const splitReviews = reviews => {
  const midpoint = Math.floor(reviews.length / 2);
  return [reviews.slice(0, midpoint), reviews.slice(midpoint)];
};

export default function Testimonial() {
  const [firstRow, secondRow] = splitReviews(reviews);

  return (
    <div className='c-space mt-25 items-start md:mt-35'>
      <div className='container mx-auto max-w-7xl'>
        <h2 className='text-heading'>Hear From My Clients</h2>
      </div>
      <div className='relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden'>
        <MarqueeRow reviews={firstRow} />
        <MarqueeRow reviews={secondRow} reverse />
        <div className={twMerge(GRADIENT_CLASSES, 'left-0 bg-gradient-to-r')} />
        <div className={twMerge(GRADIENT_CLASSES, 'right-0 bg-gradient-to-l')} />
      </div>
    </div>
  );
}
