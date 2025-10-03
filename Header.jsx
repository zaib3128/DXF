import React, { useState, useContext } from 'react';
import { Menu, X, Edit3 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import LoginRegisterModal from './LoginRegisterModal';
import Button from './Button';

const Header = ({ navigate, currentPage, isPremium }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <a onClick={() => navigate('HOME')} className="text-2xl font-black text-gray-900 cursor-pointer">
                DXF <span className="text-blue-600">Generator</span>
              </a>
            </div>

            <nav className="hidden md:flex space-x-6 items-center">
              <a onClick={() => navigate('HOME')} className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Home</a>
              <a onClick={() => navigate('PRICING')} className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Pricing</a>
              <a onClick={() => navigate('EDITOR')} className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Features</a>
              <span className={`text-sm font-medium ${isPremium ? 'text-green-600' : 'text-red-500'}`}>{isPremium ? 'Premium' : 'Free User'}</span>
              <Button onClick={() => navigate('EDITOR')} primary className="ml-4">
                <Edit3 size={16} className="mr-1 inline-block" /> Start Designing
              </Button>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-3 ml-4">
              {user ? (
                <>
                  <div className="text-sm text-gray-700">Hi, {user.name}</div>
                  <button onClick={() => logout()} className="text-sm text-red-500">Logout</button>
                </>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="text-sm text-blue-600">Login / Register</button>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 w-full bg-white shadow-xl border-t border-gray-100 z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a onClick={() => navigate('HOME')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Home</a>
              <a onClick={() => navigate('PRICING')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Pricing</a>
              <a onClick={() => navigate('EDITOR')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Start Designing</a>
              <p className="block px-3 py-2 text-sm font-medium text-center text-gray-500">{user ? 'Signed in' : 'Guest'}</p>
            </div>
          </div>
        )}
      </header>

      <LoginRegisterModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;
