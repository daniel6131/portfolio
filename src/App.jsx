import { lazy, Suspense } from 'react';

// Static imports for critical components
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Testimonial from './sections/Testimonial';
import Contact from './sections/Contact';

// Lazy imports for below-the-fold components
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Experiences = lazy(() => import('./sections/Experiences'));

// Loading component
const SectionLoader = () => (
  <div className='flex h-32 items-center justify-center'>
    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-purple-500' />
  </div>
);

const App = () => (
  <div className='container mx-auto max-w-7xl'>
    <Navbar />
    <Hero />
    <Suspense fallback={<SectionLoader />}>
      <About />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
    </Suspense>
  </div>
);

export default App;
