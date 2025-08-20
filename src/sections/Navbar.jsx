import { useState } from 'react';
import { motion } from 'motion/react';
function Navigation() {
  return (
    <ul className='nav-ul'>
      <li className='nav-li'>
        <a className='nav-link' href='#home'>
          Home
        </a>
      </li>
      <li className='nav-li'>
        <a className='nav-link' href='#about'>
          About
        </a>
      </li>
      <li className='nav-li'>
        <a className='nav-link' href='#work'>
          Work
        </a>
      </li>
      <li className='nav-li'>
        <a className='nav-link' href='#contact'>
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='bg-primary/40 fixed inset-x-0 z-50 w-full backdrop-blur-lg'>
      <div className='c-space mx-auto max-w-7xl'>
        <div className='flex items-center justify-between py-2 sm:py-0'>
          <a
            href='/'
            className='text-xl font-bold text-neutral-400 transition-colors hover:text-white'
          >
            Dan
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'
          >
            <img
              src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'}
              className='h-6 w-6'
              alt='toggle'
            />
          </button>
          <nav className='hidden sm:flex'>
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className='block overflow-hidden text-center sm:hidden'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: '100vh' }}
          transition={{ duration: 1 }}
        >
          <nav className='pb-5'>
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
