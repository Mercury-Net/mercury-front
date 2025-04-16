import React, { useState, useEffect } from 'react';
import { login } from '../api/login';
import {getUserRanking,getUserProgress,getUserInvitationInfoAndUrl,getUserCurrentPoints,getUserContributionLevel,getUserInfo} from '../api/userinfo';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const PointsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentPoints, setCurrentPoints] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [contributionLevel, setContributionLevel] = useState('');
  const [progressData, setProgressData] = useState({
    checkItemList: [],
    progress: 0
  });
  const [invitationInfo, setInvitationInfo] = useState({
    shareLinkUrl: '',
    invitationUserCount: 0
  });
  const [userInfo, setUserInfo] = useState({
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);

  // 检查本地存储中的 token
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  const fetchUserData = async () => {
    try {
      const [pointsResponse, rankResponse, levelResponse, progressResponse, invitationResponse, getUserInfoResponse] = await Promise.all([
        getUserCurrentPoints(),
        getUserRanking(),
        getUserContributionLevel(),
        getUserProgress(),
        getUserInvitationInfoAndUrl(),
        getUserInfo()
      ]);
      console.log('UserInfo Response:', getUserInfoResponse);
      setCurrentPoints(pointsResponse.data.points);
      setRanking(rankResponse.data.ranking);
      setContributionLevel(levelResponse.data.levelName);
      setProgressData(progressResponse.data);
      setInvitationInfo(invitationResponse.data);
      setUserInfo({
        username: getUserInfoResponse.data.username || ''
      });
    } catch (err) {
      console.error('获取用户数据失败:', err);
    }
  };

  useEffect(() => {
    console.log(1)
    checkToken();
  }, []);

  useEffect(() => {
    console.log(2)
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      const response = await login({
        username: email,
        email: email,
        password: password
      });
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      // 重置所有用户数据
      setCurrentPoints(0);
      setRanking(0);
      setContributionLevel('');
      setProgressData({
        checkItemList: [],
        progress: 0
      });
      setInvitationInfo({
        shareLinkUrl: '',
        invitationUserCount: 0
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(invitationInfo.shareLinkUrl);
        alert('链接已复制到剪贴板');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = invitationInfo.shareLinkUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('链接已复制到剪贴板');
      }
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制链接');
    } finally {
      setShowShareLinkModal(false);
    }
  };

  const blurClass = isLoggedIn ? '' : 'blur-sm pointer-events-none';

  return (
    <div className="min-h-screen p-8 bg-[#0a0b0f] text-gray-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 登录卡片 */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex justify-center items-center space-x-4">
            {isLoggedIn && userInfo.username && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Welcome back</span>
                  <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient-x">
                    {userInfo.username}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => isLoggedIn ? handleLogout() : setShowLoginModal(true)}
              className="px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
            >
              {isLoggedIn ? 'Logout' : 'Login Fintax'}
            </button>
          </div>
        </div>

        {/* 登录弹窗 */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/30 shadow-lg w-96">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Login</h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {error && (
                <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : 'Login'}
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
              {currentPoints}
            </div>
          </div>

          {/* Ranking Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-gray-400 mb-2 font-medium">Ranking</h3>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              #{ranking}
            </div>
          </div>

          {/* Contribution Level Card */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-gray-400 mb-2 font-medium">Contribution Level</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                {contributionLevel}
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
              {progressData.checkItemList.map((item: any) => (
                <li key={item.checkItemName} className="flex items-center text-gray-400">
                  {item.checkStatus ? (
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XMarkIcon className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  {item.checkItemName}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 text-blue-400">
                {progressData.progress}%
              </div>
            </div>
          </div>

          {/* FinTax Card 2 */}
          <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ${blurClass}`}>
            <h3 className="text-xl font-bold mb-4">FinTax</h3>
            <div className="text-lg text-gray-400 mb-4">Registration Invitation</div>
            <div className="flex items-center justify-between">
              <button 
                className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all duration-300" 
                onClick={() => setShowShareLinkModal(true)}
              >
                Share Link
              </button>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400">
                {invitationInfo.invitationUserCount}
              </div>
            </div>
          </div>

          {/* Share Link Modal */}
          {showShareLinkModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700/30 shadow-lg w-96">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Share Link</h2>
                  <button
                    onClick={() => setShowShareLinkModal(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg break-all text-sm">
                    {invitationInfo.shareLinkUrl}
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                >
                  Copy Link
                </button>
              </div>
            </div>
          )}

          {/* TRID Cards */}
          {/* <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
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
          </div> */}

          {/* TRID Invitation Card */}
          {/* <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${blurClass}`}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PointsPage;