import React, { useState, useEffect, useContext } from 'react';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import EditorPage from './pages/EditorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isWatermarkApplied, setIsWatermarkApplied] = useState(true);
  const { user } = useContext(AuthContext);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleWatermarkToggle = () => {
    if (!user?.isPremium) setIsWatermarkApplied(prev => !prev);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return <HomePage onStartDesigning={() => navigate('EDITOR')} onViewPricing={() => navigate('PRICING')} />;
      case 'EDITOR':
        return <EditorPage isPremium={user?.isPremium} onWatermarkToggle={handleWatermarkToggle} isWatermarkApplied={isWatermarkApplied} />;
      case 'PRICING':
        return <PricingPage onUpgrade={() => navigate('PRICING')} onStartDesigning={() => navigate('EDITOR')} />;
      default:
        return <HomePage onStartDesigning={() => navigate('EDITOR')} onViewPricing={() => navigate('PRICING')} />;
    }
  };

  useEffect(() => {
    // add Poppins import
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
      body { font-family: 'Poppins', sans-serif; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigate={navigate} currentPage={currentPage} isPremium={user?.isPremium} />
      <main className={currentPage !== 'EDITOR' ? "flex-grow" : ""}>
        {renderPage()}
      </main>
      {currentPage !== 'EDITOR' && <Footer />}
    </div>
  );
};

export default App;
