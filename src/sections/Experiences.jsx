import { memo } from 'react';
import { Timeline } from '../components/Timeline';
import { experiences } from '../constants';

const Experiences = memo(() => <Timeline data={experiences} />);

Experiences.displayName = 'Experiences';

export default Experiences;
