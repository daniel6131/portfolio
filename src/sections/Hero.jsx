import { memo } from 'react';

import ParallaxBackground from '../components/ParallaxBackground';
import HeroText from './../components/HeroText';

const Hero = memo(() => {
  return (
    <section
      id='home'
      className='relative flex min-h-screen items-start justify-center overflow-hidden md:items-start md:justify-start'
    >
      <ParallaxBackground />
      <div className='c-space relative z-10 container mx-auto max-w-7xl'>
        <HeroText />
      </div>
    </section>
  );
});
Hero.displayName = 'Hero';

export default Hero;
