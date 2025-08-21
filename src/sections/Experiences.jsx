import { memo } from 'react';
import { Timeline } from '../components/Timeline';
import { experiences } from '../constants';

const Experiences = memo(() => (
  <section className='c-space section-spacing relative container mx-auto max-w-7xl'>
    <Timeline data={experiences} />
  </section>
));

Experiences.displayName = 'Experiences';

export default Experiences;
