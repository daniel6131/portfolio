import { useRef } from 'react';
import Card from '../components/Card';
import CopyEmailButton from '../components/CopyEmailButton';
import { Frameworks } from '../components/Frameworks';
import { Globe } from '../components/Globe';

const principlesCards = [
  { id: 1, text: 'GRASP', style: { rotate: '75deg', top: '30%', left: '20%' } },
  { id: 2, text: 'SOLID', style: { rotate: '-30deg', top: '60%', left: '45%' } },
  { id: 3, text: 'Design Patterns', style: { rotate: '90deg', bottom: '30%', left: '70%' } },
  { id: 4, text: 'Design Principles', style: { rotate: '-45deg', top: '55%', left: '0%' } },
  { id: 5, text: 'SRP', style: { rotate: '20deg', top: '10%', left: '38%' } },
  {
    id: 6,
    image: 'assets/logos/react-pink.png',
    style: { rotate: '30deg', top: '70%', left: '70%' },
  },
  {
    id: 7,
    image: 'assets/logos/nodejs-pink.png',
    style: { rotate: '-45deg', top: '70%', left: '25%' },
  },
  {
    id: 8,
    image: 'assets/logos/typescript-pink.png',
    style: { rotate: '-45deg', top: '5%', left: '10%' },
  },
];

const AboutIntro = () => (
  <div className='grid-default-color grid-1 flex items-end'>
    <img
      src='assets/coding-pov.png'
      className='absolute -top-[1rem] -right-[5rem] scale-[1.75] md:inset-y-10 md:left-50 md:scale-[3] lg:scale-[2.5]'
      alt='Coding point-of-view'
    />
    <div className='z-10'>
      <p className='headtext'>Hi, I'm Daniel O'Brien</p>
      <p className='subtext'>
        Over the last 4 years, I developed my frontend and backend dev skills to deliver dynamic and
        software web applications.
      </p>
    </div>
    <div className='from-indigo pointer-events-none absolute inset-x-0 -bottom-4 h-1/2 bg-gradient-to-t sm:h-1/3' />
  </div>
);

const PrinciplesGrid = () => {
  const containerRef = useRef(null);
  return (
    <div className='grid-default-color grid-2'>
      <div ref={containerRef} className='flex h-full w-full items-center justify-center'>
        <p className='flex items-end text-5xl text-gray-500'>CODE IS CRAFT</p>
        {principlesCards.map(card => (
          <Card key={card.id} {...card} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
};

const TimezoneGrid = () => (
  <div className='grid-black-color grid-3'>
    <div className='z-10 w-[50%]'>
      <p className='headtext'>Time Zone</p>
      <p className='subtext'>I'm based in Brisbane, and open to remote, hybrid or on-site work</p>
    </div>
    <figure className='absolute top-[10%] left-[30%]'>
      <Globe />
    </figure>
  </div>
);

const CallToActionGrid = () => (
  <div className='grid-special-color grid-4'>
    <div className='flex size-full flex-col items-center justify-center gap-4'>
      <p className='headtext text-center'>Do you want to start a project together?</p>
      <CopyEmailButton />
    </div>
  </div>
);

const TechStackGrid = () => (
  <div className='grid-default-color grid-5'>
    <div className='z-10 w-[50%]'>
      <p className='headText'>Tech Stack</p>
      <p className='subtext'>
        I work with a variety of languages, frameworks and tools that allow me to build scalable and
        robust applications.
      </p>
    </div>
    <div className='absolute inset-y-0 start-[50%] h-full w-full md:inset-y-9 md:scale-125'>
      <Frameworks />
    </div>
  </div>
);

const About = () => {
  return (
    <section id='about' className='c-space section-spacing container mx-auto max-w-7xl'>
      <h2 className='text-heading'>About Me</h2>
      <div className='mt-12 grid grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-6'>
        <AboutIntro />
        <PrinciplesGrid />
        <TimezoneGrid />
        <CallToActionGrid />
        <TechStackGrid />
      </div>
    </section>
  );
};

export default About;
