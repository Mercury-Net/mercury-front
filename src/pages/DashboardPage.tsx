import React, { useEffect, useState } from 'react';
import { getTotalUser,getTotalWallet,getTotalAsset,getTotalLabel,getTotalUserDaily,getPointsDistribution,getTop20RankingUser } from '@/api/dashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from 'recharts';

const DashboardPage: React.FC = () => {
  const [totalWallet, setTotalWallet] = useState<string>('0');
  const [totalUser, setTotalUser] = useState<string>('0');
  const [totalAsset, setTotalAsset] = useState<string>('0');
  const [totalLabel, setTotalLabel] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyUserData, setDailyUserData] = useState<any[]>([]);
  const [pointsDistributionData, setPointsDistributionData] = useState<any[]>([]);
  const [top20RankingUserData, setTop20RankingUserData] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setIsVisible(false);
        const [walletRes, userRes, assetRes, labelRes, dailyUserRes, pointsDistRes,top20RankingUserRes] = await Promise.all([
          getTotalWallet(),
          getTotalUser(),
          getTotalAsset(),
          getTotalLabel(),
          getTotalUserDaily(),
          getPointsDistribution(),
          getTop20RankingUser()
        ]);

        setTotalWallet(walletRes.data.totalWallets);
        setTotalUser(userRes.data.totalUser);
        setTotalAsset(assetRes.data.totalAssets);
        setTotalLabel(labelRes.data.totalLabels);
        setDailyUserData(dailyUserRes.data);
        setPointsDistributionData(pointsDistRes.data);
        setTop20RankingUserData(top20RankingUserRes.data);
        setError(null);
        
        // 添加一个小的延迟，让过渡效果更自然
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      } catch (err) {
        setError('获取数据失败');
        console.error('获取数据失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const summaryData = [
    { title: '总用户', value: loading ? '加载中...' : error ? '获取失败' : totalUser, icon: '👥' },
    { title: '总钱包', value: loading ? '加载中...' : error ? '获取失败' : totalWallet, icon: '💼' },
    { title: '总资产', value: loading ? '加载中...' : error ? '获取失败' : totalAsset, icon: '💰' },
    { title: '总标签', value: loading ? '加载中...' : error ? '获取失败' : totalLabel, icon: '🏷️' },
  ];

  const assetData = [
    { name: 'ETH', value: 5000000, other: 1000000 },
    { name: 'BTC', value: 3000000, other: 800000 },
    { name: 'USDT', value: 2000000, other: 500000 },
    { name: '其他', value: 1000000, other: 300000 },
  ];

  return (
    <div className="min-h-screen text-white p-6">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Web3 数据看板
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } transition-all duration-500 ease-out`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-sm font-medium text-gray-400">{item.title}</div>
              </div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500 ease-out`}
          style={{ transitionDelay: '400ms' }}>
            <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
              总用户 (每日)
            </h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#ffffff50" />
                  <YAxis stroke="#ffffff50" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#22d3ee" 
                    strokeWidth={2}
                    dot={{ fill: '#22d3ee', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500 ease-out`}
          style={{ transitionDelay: '500ms' }}>
            <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              资产规模
            </h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff50" />
                  <YAxis stroke="#ffffff50" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    stackId="a" 
                    fill="#a855f7" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="other" 
                    stackId="a" 
                    fill="#7e22ce" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500 ease-out`}
          style={{ transitionDelay: '600ms' }}>
            <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
              积分排行榜
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 w-[80px] text-gray-400 font-medium">Rank</th>
                    <th className="p-4 text-gray-400 font-medium">Name</th>
                    <th className="p-4 text-right text-gray-400 font-medium">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {top20RankingUserData.slice(0, 3).map((item) => (
                    <tr key={item.rank} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="p-4 font-medium text-cyan-400">{item.ranking}</td>
                      <td className="p-4 text-gray-300">{item.username}</td>
                      <td className="p-4 text-right text-gray-300">{item.points}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-4">...</td>
                  </tr>
                  {top20RankingUserData.length > 3 && (
                    <tr className="hover:bg-white/5 transition-colors duration-200">
                      <td className="p-4 font-medium text-cyan-400">{top20RankingUserData[3].ranking}</td>
                      <td className="p-4 text-gray-300">{top20RankingUserData[3].username}</td>
                      <td className="p-4 text-right text-gray-300">{top20RankingUserData[3].points}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500 ease-out`}
          style={{ transitionDelay: '700ms' }}>
            <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              积分分布
            </h2>
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" stroke="#ffffff50" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" stroke="#ffffff50" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="userCount" 
                    fill="#a855f7" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 