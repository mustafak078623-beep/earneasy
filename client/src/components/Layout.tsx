import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import RobotLoader from './RobotLoader';
import FloatingWhatsApp from './FloatingWhatsApp';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  const { userData } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab: string) => {
    if (tab === currentTab) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onTabChange(tab);
      setIsLoading(false);
    }, 1500);
  };

  const platformStats = {
    totalWithdrawals: '$125,840',
    totalUsers: '15,432',
    totalVisitors: '89,124'
  };

  return (
    <div className="min-h-screen cyber-grid bg-white dark:bg-cyber-dark transition-all duration-500">
      <RobotLoader isVisible={isLoading} />
      
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center">
                <i className="fas fa-bolt text-white text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                EarnEasy Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Stats Display */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center" data-testid="stat-withdrawals">
                  <div className="text-cyber-blue font-semibold">{platformStats.totalWithdrawals}</div>
                  <div className="text-gray-500 dark:text-gray-400">Total Withdrawn</div>
                </div>
                <div className="text-center" data-testid="stat-users">
                  <div className="text-cyber-green font-semibold">{platformStats.totalUsers}</div>
                  <div className="text-gray-500 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center" data-testid="stat-visitors">
                  <div className="text-cyber-purple font-semibold">{platformStats.totalVisitors}</div>
                  <div className="text-gray-500 dark:text-gray-400">Total Visitors</div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-cyber-navy hover:bg-gray-200 dark:hover:bg-cyber-darker transition-all duration-300"
                data-testid="button-theme-toggle"
              >
                <i className={`fas ${isDark ? 'fa-moon text-cyber-blue' : 'fa-sun text-yellow-500'}`}></i>
              </button>

              {/* User Profile */}
              {userData && (
                <div className="flex items-center space-x-2 glass-effect rounded-xl px-3 py-2" data-testid="user-profile">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyber-green to-cyber-blue rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700 dark:text-white font-medium">{userData.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-gray-200 dark:border-cyber-navy">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: 'fa-home', label: 'Home' },
              { id: 'wallet', icon: 'fa-wallet', label: 'Wallet' },
              { id: 'updates', icon: 'fa-bell', label: 'Updates' },
              { id: 'account', icon: 'fa-user', label: 'Account' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`nav-tab flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentTab === tab.id 
                    ? 'text-cyber-blue bg-cyber-blue/10 transform -translate-y-1' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                data-testid={`nav-${tab.id}`}
              >
                <i className={`fas ${tab.icon} text-xl`}></i>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
