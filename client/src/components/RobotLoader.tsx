import React from 'react';

interface RobotLoaderProps {
  isVisible: boolean;
  message?: string;
}

const RobotLoader: React.FC<RobotLoaderProps> = ({ isVisible, message = "Loading..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center" data-testid="robot-loader">
      <div className="text-center">
        <div className="robot-container mb-4">
          {/* Cute robot SVG animation */}
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="w-full h-full bg-gradient-to-b from-cyber-blue to-cyber-purple rounded-2xl relative">
              {/* Robot head */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg">
                {/* Eyes */}
                <div className="absolute top-3 left-3 w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                {/* Antenna */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyber-gold rounded-full"></div>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyber-gold rounded-full animate-glow"></div>
              </div>
              {/* Robot arms */}
              <div className="robot-arm absolute top-4 -left-2 w-4 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
              <div className="robot-arm absolute top-4 -right-2 w-4 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
              {/* Robot body */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-cyber-blue rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-cyber-green rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-cyber-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default RobotLoader;
