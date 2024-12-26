'use client'

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Github } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-base-200 py-1 px-4 sticky top-0 h-11 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-end space-x-2">
          <h1 className='text-slate-700 dark:text-gray-400 flex items-center'>
            <span>K</span>
            <span className='text-error'>no</span>
            <span>x</span>
            <span className='text-primary'>UI</span>
          </h1>
          <h6 className='text-xs pb-1 text'>1.0.2</h6>
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/components" className="hover:text-primary">Components</Link>
            </li>
            <li>
              <a href="https://github.com/CoderKnox/knox-ui" className="hover:text-primary"><Github size={20} /></a>
            </li>
          </ul>
          <button onClick={toggleTheme} className="hover:text-primary">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

