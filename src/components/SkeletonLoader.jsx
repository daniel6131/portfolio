// A simple skeleton loader that mimics a content section.
const SkeletonLoader = () => (
  <div className='c-space section-spacing'>
    <div className='mb-12 h-10 w-1/3 animate-pulse rounded-lg bg-slate-700' />
    <div className='space-y-6'>
      <div className='h-24 w-full animate-pulse rounded-lg bg-slate-700' />
      <div className='h-24 w-full animate-pulse rounded-lg bg-slate-700' />
      <div className='h-24 w-2/3 animate-pulse rounded-lg bg-slate-700' />
    </div>
  </div>
);

export default SkeletonLoader;
