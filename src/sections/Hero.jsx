import { memo } from 'react';

import ParallaxBackground from '../components/ParallaxBackground';
import HeroText from './../components/HeroText';

const Hero = memo(() => {
  return (
    <section
      id='home'
      className='relative flex min-h-screen items-start justify-center overflow-hidden md:items-start md:justify-start'
    >
      <div className='relative z-10 container mx-auto max-w-7xl'>
        <HeroText />
      </div>
      <ParallaxBackground />
    </section>
  );
});
Hero.displayName = 'Hero';

export default Hero;
