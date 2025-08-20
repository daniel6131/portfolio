import { memo } from 'react';

import ParallaxBackground from '../components/ParallaxBackground';
import HeroText from './../components/HeroText';

const Hero = memo(() => {
  return (
    <section className='c-space flex min-h-screen items-start justify-center overflow-hidden md:items-start md:justify-start'>
      <HeroText />
      <ParallaxBackground />
    </section>
  );
});
Hero.displayName = 'Hero';

export default Hero;
