
import React from 'react';
import { MenuIcon } from './icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="py-6 px-4 md:px-0 relative">
      <div className="flex items-center justify-center">
         <button
          onClick={onMenuClick}
          className="md:hidden absolute left-0 text-slate-300 hover:text-white p-2"
          aria-label="Open categories menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white text-center font-stylish">
          FrameFlow
        </h1>
      </div>
    </header>
  );
};

export default Header;