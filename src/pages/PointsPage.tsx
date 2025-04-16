import React, { useState } from 'react';

const PointsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  
  const blurClass = isLoggedIn ? '' : 'blur-sm pointer-events-none';

  return (
    <div className="min-h-screen p-8 bg-[#0a0b0f] text-gray-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 登录卡片 */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex justify-center">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
            >
              {isLoggedIn ? '已登录' : 'Login Fintax'}
            </button>
          </div>
        </div>

        {/* 登录弹窗 */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/30 shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 顶部卡片组 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Points Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-gray-400 mb-2 font-medium">Current Points</h3>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              3,200
            </div>
          </div>

          {/* Ranking Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-gray-400 mb-2 font-medium">Ranking</h3>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              #21
            </div>
          </div>

          {/* Contribution Level Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-gray-400 mb-2 font-medium">Contribution Level</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Gold
              </div>
              <div className="text-green-400 text-sm">
                Future Airdrop +10%
              </div>
            </div>
          </div>
        </div>

        {/* 任务卡片组 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* FinTax Card 1 */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-xl font-bold mb-4">FinTax</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Email Registration
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Connect your wallet
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Upgrade
              </li>
            </ul>
            <div className="flex justify-end">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400">
                65%
              </div>
            </div>
          </div>

          {/* FinTax Card 2 */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-xl font-bold mb-4">FinTax</h3>
            <div className="text-lg text-gray-400 mb-4">Registration Invitation</div>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all duration-300">
                Share Link
              </button>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400">
                5/10
              </div>
            </div>
          </div>

          {/* TRID Cards */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-xl font-bold mb-4">TRID</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Create TRID
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                VC Submission
              </li>
            </ul>
            <div className="flex justify-end">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400">
                65%
              </div>
            </div>
          </div>

          {/* TRID Invitation Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-xl font-bold mb-4">TRID</h3>
            <div className="text-lg text-gray-400 mb-4">Create Invitation</div>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all duration-300">
                Share Link
              </button>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400">
                65%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;