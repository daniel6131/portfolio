import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

const Navigation = memo(({ links }) => (
  <ul className='nav-ul'>
    {links.map(link => (
      <li key={link.href} className='nav-li'>
        <a className='nav-link' href={link.href}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
));
Navigation.displayName = 'Navigation';

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <>
      <header className='bg-primary/40 fixed inset-x-0 z-50 w-full backdrop-blur-lg'>
        <div className='c-space mx-auto max-w-7xl'>
          <div className='flex items-center justify-between py-2 sm:py-0'>
            <a
              href='/'
              className='text-xl font-bold text-neutral-400 transition-colors hover:text-white'
            >
              Dan
            </a>
            <button
              onClick={toggleMenu}
              className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'
              aria-controls='mobile-menu'
              aria-expanded={isOpen}
              aria-label='Toggle navigation menu'
            >
              <img
                src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'}
                className='h-6 w-6'
                alt=''
              />
            </button>
            <nav className='hidden sm:flex'>
              <Navigation links={NAV_LINKS} />
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id='mobile-menu'
            className='bg-primary/40 fixed inset-0 z-40 flex h-screen flex-col items-center pt-24 backdrop-blur-lg sm:hidden'
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <nav className='text-center'>
              <Navigation links={NAV_LINKS} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
Navbar.displayName = 'Navbar';

export default Navbar;
