import { memo } from 'react';
import { OrbitingCircles } from './OrbitingCircles';

const SKILLS = [
  'css3',
  'git',
  'html5',
  'javascript',
  'react',
  'tailwindcss',
  'vitejs',
  'nodejs',
  'aws',
  'typescript',
  'kotlin',
  'serverless',
];

const ORBIT_CONFIG = {
  outer: { iconSize: 40 },
  inner: { iconSize: 25, radius: 100, reverse: true, speed: 2 },
};

const Icon = memo(({ src, skill }) => (
  <img src={src} className='rounded-sm duration-200 hover:scale-110' alt={`${skill} logo`} />
));

Icon.displayName = 'Icon';

export const Frameworks = memo(() => {
  const reversedSkills = [...SKILLS].reverse();

  return (
    <div className='relative flex h-[15rem] w-full flex-col items-center justify-center'>
      <OrbitingCircles iconSize={ORBIT_CONFIG.outer.iconSize}>
        {SKILLS.map((skill, index) => (
          <Icon key={`outer-${skill}-${index}`} src={`assets/logos/${skill}.svg`} skill={skill} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={ORBIT_CONFIG.inner.iconSize}
        radius={ORBIT_CONFIG.inner.radius}
        reverse={ORBIT_CONFIG.inner.reverse}
        speed={ORBIT_CONFIG.inner.speed}
      >
        {reversedSkills.map((skill, index) => (
          <Icon key={`inner-${skill}-${index}`} src={`assets/logos/${skill}.svg`} skill={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
});

Frameworks.displayName = 'Frameworks';
