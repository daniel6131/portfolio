import { lazy, Suspense } from 'react';

// Static imports for critical "above-the-fold" components
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';

// Helper Components
import ErrorBoundary from './components/ErrorBoundary';
import SkeletonLoader from './components/SkeletonLoader';

// Lazy imports for "below-the-fold" components.
// Each will be in its own chunk, loaded on demand.
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Experiences = lazy(() => import('./sections/Experiences'));
const Testimonial = lazy(() => import('./sections/Testimonial'));
const Contact = lazy(() => import('./sections/Contact'));

const LazySection = ({ component: Component }) => (
  <ErrorBoundary>
    <Suspense fallback={<SkeletonLoader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const App = () => (
  <div className='relative'>
    <Navbar />
    <Hero />

    <LazySection component={About} />
    <LazySection component={Projects} />
    <LazySection component={Experiences} />
    <LazySection component={Testimonial} />
    <LazySection component={Contact} />
  </div>
);

export default App;
