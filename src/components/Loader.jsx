import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center className='text-center text-xl font-normal'>
      {progress}% Loaded
    </Html>
  );
};

export default Loader;
