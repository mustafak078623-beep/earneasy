import React from 'react';

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  borderColor: string;
}

const Updates: React.FC = () => {
  const updates: Update[] = [
    {
      id: '1',
      title: 'New Payment Methods Added',
      description: "We've added support for NayaPay and SadaPay! Now you can withdraw your earnings using even more payment methods.",
      date: '2 days ago',
      tags: ['Payment', 'New Feature'],
      borderColor: 'border-cyber-blue'
    },
    {
      id: '2',
      title: 'Increased Ad Rewards',
      description: "Great news! We've increased the reward rates for watching ads. You can now earn up to $0.50 per ad view!",
      date: '1 week ago',
      tags: ['Rewards', 'Improvement'],
      borderColor: 'border-cyber-green'
    },
    {
      id: '3',
      title: 'Dark Mode Theme Launch',
      description: 'Enjoy our new dark mode theme! Switch between light and dark modes using the toggle in the header.',
      date: '2 weeks ago',
      tags: ['UI/UX', 'Theme'],
      borderColor: 'border-cyber-purple'
    }
  ];

  return (
    <div className="glass-effect rounded-2xl p-6" data-testid="updates-container">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center">
          <i className="fas fa-bell text-white text-xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Updates</h2>
      </div>

      {updates.length > 0 ? (
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className={`border-l-4 ${update.borderColor} pl-6 py-4`} data-testid={`update-${update.id}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">{update.title}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400" data-testid={`update-date-${update.id}`}>{update.date}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {update.description}
              </p>
              <div className="flex space-x-2">
                {update.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 text-xs text-white rounded-full ${
                      index === 0 ? 'bg-cyber-blue' :
                      index === 1 ? 'bg-cyber-green' :
                      'bg-cyber-purple'
                    }`}
                    data-testid={`tag-${update.id}-${index}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" data-testid="no-updates">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-cyber-navy dark:to-cyber-darker rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-bell-slash text-gray-400 dark:text-gray-500 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No Updates Yet</h3>
          <p className="text-gray-500 dark:text-gray-500">Check back later for platform updates and announcements.</p>
        </div>
      )}
    </div>
  );
};

export default Updates;
