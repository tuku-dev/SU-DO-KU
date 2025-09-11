import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { buttonVariants, textClasses } from '../shared/utils/cssClasses';
import { AVAILABLE_GAMES } from '../games';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGameClick = (gameId) => {
    // Map game IDs to their URL paths
    const gameRoutes = {
      'sudoku': '/killer-sudoku',
      // Add more mappings as games are added
      // 'chess': '/chess',
      // 'checkers': '/checkers',
    };
    
    const route = gameRoutes[gameId];
    if (route) {
      navigate(route);
    }
  };

  // Show back button if we're not on the home page
  const showBackButton = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      {/* Back to Home Button - Only visible when not on home page */}
      {showBackButton && (
        <button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          ← Home
        </button>
      )}
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${textClasses["3xl"]} md:text-5xl font-bold text-gray-800 dark:text-white mb-4`}>
            🧠 Mind Games
          </h1>
          <p className={`${textClasses.lg} text-gray-600 dark:text-gray-300 mb-8`}>
            Challenge your mind with our collection of engaging puzzle games
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Games Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className={`${textClasses["2xl"]} font-semibold text-gray-800 dark:text-white mb-8 text-center`}>
            Choose Your Game
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {AVAILABLE_GAMES.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex flex-col h-full">
                    {/* Game Icon */}
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                        {game.id === 'sudoku' ? '🔢' : '🎮'}
                      </div>
                    </div>
                    
                    {/* Game Info */}
                    <div className="text-center flex-grow">
                      <h3 className={`${textClasses.xl} font-bold text-gray-800 dark:text-white mb-2`}>
                        {game.name}
                      </h3>
                      <p className={`${textClasses.sm} text-gray-600 dark:text-gray-400 mb-4`}>
                        {game.description}
                      </p>
                      <span className={`inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 ${textClasses.xs} rounded-full`}>
                        {game.category}
                      </span>
                    </div>
                    
                    {/* Play Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className={`w-full ${buttonVariants.primary} group-hover:bg-blue-600 transition-colors`}>
                        <span className="flex items-center justify-center gap-2">
                          ▶️ Play Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Coming Soon Cards */}
            {[
              { name: 'Chess', icon: '♟️', category: 'Strategy' },
              { name: 'Checkers', icon: '🔴', category: 'Strategy' },
              { name: 'Tic Tac Toe', icon: '❌', category: 'Classic' },
              { name: 'Memory Game', icon: '🃏', category: 'Memory' },
              { name: 'Word Search', icon: '📝', category: 'Word Games' }
            ].map((game, index) => (
              <div key={`coming-soon-${index}`} className="group">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-gray-600 h-full opacity-75">
                  <div className="flex flex-col h-full">
                    {/* Game Icon */}
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto bg-gray-400 dark:bg-gray-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                        {game.icon}
                      </div>
                    </div>
                    
                    {/* Game Info */}
                    <div className="text-center flex-grow">
                      <h3 className={`${textClasses.xl} font-bold text-gray-600 dark:text-gray-400 mb-2`}>
                        {game.name}
                      </h3>
                      <p className={`${textClasses.sm} text-gray-500 dark:text-gray-500 mb-4`}>
                        Coming Soon...
                      </p>
                      <span className={`inline-block px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 ${textClasses.xs} rounded-full`}>
                        {game.category}
                      </span>
                    </div>
                    
                    {/* Coming Soon Button */}
                    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                      <button disabled className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded font-medium cursor-not-allowed">
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="text-center mb-12">
            <h3 className={`${textClasses["2xl"]} font-semibold text-gray-800 dark:text-white mb-6`}>
              Why Choose Mind Games?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h4 className={`${textClasses.lg} font-semibold text-gray-800 dark:text-white mb-2`}>
                  Engaging Challenges
                </h4>
                <p className={`${textClasses.sm} text-gray-600 dark:text-gray-400`}>
                  Carefully designed puzzles to keep your mind sharp and entertained
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌙</div>
                <h4 className={`${textClasses.lg} font-semibold text-gray-800 dark:text-white mb-2`}>
                  Dark Mode Support
                </h4>
                <p className={`${textClasses.sm} text-gray-600 dark:text-gray-400`}>
                  Play comfortably in any lighting condition with our theme options
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <h4 className={`${textClasses.lg} font-semibold text-gray-800 dark:text-white mb-2`}>
                  Responsive Design
                </h4>
                <p className={`${textClasses.sm} text-gray-600 dark:text-gray-400`}>
                  Play seamlessly on desktop, tablet, or mobile devices
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className={`${textClasses.sm} text-gray-500 dark:text-gray-400`}>
              Built with ❤️ for puzzle enthusiasts • More games coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
