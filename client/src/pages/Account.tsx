import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/auth';
import { useToast } from '../hooks/use-toast';
import RobotLoader from '../components/RobotLoader';

const Account: React.FC = () => {
  const { userData } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast({
      title: notifications ? "Notifications Disabled" : "Notifications Enabled",
      description: notifications ? "You will no longer receive notifications." : "You will now receive notifications.",
    });
  };

  if (!userData) return null;

  const accountStats = {
    daysActive: Math.floor((new Date().getTime() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
    referrals: Math.floor(Math.random() * 20),
    achievements: Math.floor(Math.random() * 30) + 5
  };

  return (
    <>
      <RobotLoader isVisible={isLoading} message="Logging out..." />
      
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="glass-effect rounded-2xl p-6" data-testid="profile-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white" data-testid="text-name">{userData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400" data-testid="text-email">{userData.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-1 text-xs bg-cyber-gold text-white rounded-full capitalize" data-testid="badge-rank">{userData.rank} Member</span>
                <span className="px-2 py-1 text-xs bg-cyber-green text-white rounded-full" data-testid="badge-verified">Verified</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="stat-days-active">
              <div className="text-2xl font-bold text-cyber-blue">{accountStats.daysActive}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Days Active</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="stat-ads-watched">
              <div className="text-2xl font-bold text-cyber-green">{userData.adsWatched}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Ads Watched</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="stat-referrals">
              <div className="text-2xl font-bold text-cyber-purple">{accountStats.referrals}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Referrals</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="stat-achievements">
              <div className="text-2xl font-bold text-cyber-gold">{accountStats.achievements}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Achievements</div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass-effect rounded-2xl p-6" data-testid="account-settings">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Account Settings</h3>
          <div className="space-y-4">
            {/* Profile Settings */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="setting-edit-profile">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-edit text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Edit Profile</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Update your personal information</div>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>

            {/* Notification Settings */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="setting-notifications">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-bell text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Manage your notification preferences</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={toggleNotifications}
                  data-testid="toggle-notifications"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-blue/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
              </label>
            </div>

            {/* Security Settings */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="setting-security">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Security</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Change password and security settings</div>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>

            {/* Support */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid="setting-support">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-life-ring text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Help & Support</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get help or contact support</div>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="glass-effect rounded-2xl p-6" data-testid="logout-section">
          <button 
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50"
            data-testid="button-logout"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
