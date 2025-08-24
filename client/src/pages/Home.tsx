import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserBalance, addTransaction } from '../lib/firestore';
import { useToast } from '../hooks/use-toast';
import RobotLoader from '../components/RobotLoader';

const Home: React.FC = () => {
  const { user, userData, refreshUserData } = useAuth();
  const { toast } = useToast();
  const [isWatchingVideo, setIsWatchingVideo] = useState(false);
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false);
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [hasFollowedChannel, setHasFollowedChannel] = useState(false);

  const handleWatchVideo = () => {
    setShowYouTubePlayer(true);
    setIsWatchingVideo(true);
  };

  const handleVideoEnd = async () => {
    if (!user || !userData) return;

    try {
      const earnings = 0.10; // Fixed $0.10 per video

      await updateUserBalance(user.uid, earnings);
      await addTransaction(user.uid, {
        type: 'earn',
        amount: earnings,
        description: 'YouTube Video Reward'
      });

      await refreshUserData();

      toast({
        title: "Video Complete!",
        description: `You earned $${earnings.toFixed(2)}! Watch more videos to earn more.`,
      });
      
      setShowYouTubePlayer(false);
      setIsWatchingVideo(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process video reward. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClaimReward = async () => {
    if (!user || !userData) return;

    setIsClaimingReward(true);

    // Open WhatsApp channel
    const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VaGQz8d6e6awbGDxl2CQ'; // Replace with your actual channel
    window.open(whatsappChannelUrl, '_blank');

    // Simulate waiting for user to follow and return
    setTimeout(async () => {
      try {
        const rewardAmount = 0.20; // $0.20 reward

        await updateUserBalance(user.uid, rewardAmount);
        await addTransaction(user.uid, {
          type: 'earn',
          amount: rewardAmount,
          description: 'WhatsApp Channel Follow Reward'
        });

        await refreshUserData();

        toast({
          title: "Reward Claimed!",
          description: `You earned $${rewardAmount.toFixed(2)} for following our WhatsApp channel!`,
        });
        
        setHasFollowedChannel(true);
        setIsClaimingReward(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process channel reward. Please try again.",
          variant: "destructive",
        });
        setIsClaimingReward(false);
      }
    }, 3000); // Wait 3 seconds assuming user follows and returns
  };

  if (!userData) return null;

  const todayStats = {
    views: Math.floor(Math.random() * 50) + 10,
    earnings: (Math.random() * 15 + 5).toFixed(2),
    streak: Math.floor(Math.random() * 30) + 1
  };

  return (
    <>
      <RobotLoader isVisible={isWatchingVideo || isClaimingReward} message={isWatchingVideo ? "Loading video..." : "Processing reward..."} />
      
      {/* YouTube Video Modal */}
      {showYouTubePlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" data-testid="youtube-modal">
          <div className="bg-white dark:bg-cyber-dark rounded-2xl p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Watch Video to Earn $0.10</h3>
              <button 
                onClick={() => setShowYouTubePlayer(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                data-testid="button-close-video"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-cyber-navy rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-youtube text-white text-3xl"></i>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your YouTube video will play here</p>
                <button 
                  onClick={handleVideoEnd}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  data-testid="button-simulate-video-end"
                >
                  Simulate Video End (for demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance Card */}
      <div className="glass-effect rounded-2xl p-6 mb-6 neon-border" data-testid="balance-card">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Balance</h2>
          <div className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent mb-4" data-testid="text-balance">
            ${userData.balance.toFixed(2)}
          </div>
          <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Videos Watched: <span className="text-cyber-blue font-semibold" data-testid="text-videos-watched">{userData.adsWatched}</span></span>
            <span>Withdrawn: <span className="text-cyber-green font-semibold" data-testid="text-withdrawn">${userData.withdrawnAmount.toFixed(2)}</span></span>
          </div>
        </div>
      </div>

      {/* Earning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Watch Videos Card */}
        <div className="glass-effect rounded-2xl p-6" data-testid="watch-videos-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <i className="fab fa-youtube text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Watch Videos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Earn $0.10 per video</p>
            </div>
          </div>
          
          {/* Video Preview */}
          <div className="bg-gray-100 dark:bg-cyber-navy rounded-xl p-4 mb-4 relative overflow-hidden" data-testid="video-preview">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <i className="fab fa-youtube text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white">YouTube Video</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Watch and earn money</p>
                <div className="text-cyber-green font-semibold">+$0.10</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleWatchVideo}
            disabled={isWatchingVideo}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 animate-glow disabled:opacity-50"
            data-testid="button-watch-video"
          >
            <i className="fab fa-youtube mr-2"></i>
            Watch Video & Earn
          </button>
        </div>

        {/* WhatsApp Channel Reward Card */}
        <div className="glass-effect rounded-2xl p-6" data-testid="whatsapp-reward-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <i className="fab fa-whatsapp text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">WhatsApp Channel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Follow & earn $0.20</p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-cyber-navy rounded-xl p-4 mb-4 relative overflow-hidden" data-testid="whatsapp-preview">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <i className="fab fa-whatsapp text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white">Follow Channel</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join our WhatsApp updates</p>
                <div className="text-cyber-green font-semibold">+$0.20</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleClaimReward}
            disabled={isClaimingReward || hasFollowedChannel}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 animate-glow disabled:opacity-50"
            data-testid="button-claim-reward"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            {hasFollowedChannel ? 'Reward Claimed!' : 'Claim Reward'}
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 text-center" data-testid="stat-today-views">
          <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-eye text-white"></i>
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{todayStats.views}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Today's Views</div>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center" data-testid="stat-today-earnings">
          <div className="w-12 h-12 bg-gradient-to-br from-cyber-green to-cyber-gold rounded-xl flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-coins text-white"></i>
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">${todayStats.earnings}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Today's Earnings</div>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center" data-testid="stat-streak">
          <div className="w-12 h-12 bg-gradient-to-br from-cyber-purple to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-fire text-white"></i>
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{todayStats.streak}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center" data-testid="stat-rank">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-trophy text-white"></i>
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white capitalize">{userData.rank}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Rank</div>
        </div>
      </div>
    </>
  );
};

export default Home;
