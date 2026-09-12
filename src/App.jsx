import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import EmergencyModal from './components/common/EmergencyModal';
import AIChatbot from './components/AIChatbot/AIChatbot';
import { LandslideProvider } from './context/LandslideContext';

// Pages
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import PredictionPage from './pages/PredictionPage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import CitizenReportPage from './pages/CitizenReportPage';
import RoadStatusPage from './pages/RoadStatusPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currentLang, setCurrentLang] = useState('en'); // 'en' | 'hi'
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [modalAlertData, setModalAlertData] = useState(null);

  const handleToggleLang = () => {
    setCurrentLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleOpenEmergencyModal = (alertData = null) => {
    setModalAlertData(alertData);
    setEmergencyModalOpen(true);
  };

  const handleCloseEmergencyModal = () => {
    setEmergencyModalOpen(false);
    setModalAlertData(null);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <LandingPage 
            setActivePage={setActivePage} 
            onOpenEmergencyModal={handleOpenEmergencyModal}
            currentLang={currentLang}
          />
        );
      case 'map':
        return (
          <MapPage 
            onOpenEmergencyModal={handleOpenEmergencyModal}
            currentLang={currentLang}
          />
        );
      case 'prediction':
        return (
          <PredictionPage 
            onOpenEmergencyModal={handleOpenEmergencyModal}
            currentLang={currentLang}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage 
            onOpenEmergencyModal={handleOpenEmergencyModal} 
            setActivePage={setActivePage}
            currentLang={currentLang}
          />
        );
      case 'alerts':
        return (
          <AlertsPage 
            onOpenEmergencyModal={handleOpenEmergencyModal} 
            setActivePage={setActivePage}
            currentLang={currentLang}
          />
        );
      case 'report':
        return (
          <CitizenReportPage 
            currentLang={currentLang}
          />
        );
      case 'roads':
        return (
          <RoadStatusPage 
            setActivePage={setActivePage}
            currentLang={currentLang}
          />
        );
      case 'analytics':
        return (
          <AnalyticsPage 
            currentLang={currentLang}
          />
        );
      case 'about':
        return (
          <AboutPage 
            setActivePage={setActivePage}
            currentLang={currentLang}
          />
        );
      default:
        return (
          <LandingPage 
            setActivePage={setActivePage} 
            onOpenEmergencyModal={handleOpenEmergencyModal}
            currentLang={currentLang}
          />
        );
    }
  };

  return (
    <LandslideProvider activePage={activePage}>
      <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white relative">
        {/* Top Fixed / Sticky Navigation Bar */}
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          onOpenEmergencyModal={() => handleOpenEmergencyModal(null)}
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {renderActivePage()}
        </main>

        {/* Standard Footer */}
        <Footer setActivePage={setActivePage} currentLang={currentLang} />

        {/* Global Emergency Command Dispatch Modal */}
        <EmergencyModal 
          isOpen={emergencyModalOpen} 
          onClose={handleCloseEmergencyModal} 
          alertData={modalAlertData}
          currentLang={currentLang}
        />

        {/* Premium LandslideGuard AI Assistant Floating Widget */}
        <AIChatbot />
      </div>
    </LandslideProvider>
  );
}

