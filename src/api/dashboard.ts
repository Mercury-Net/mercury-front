import axiosInstance from './axios';

// GET
// /api/taix/dashboard/getTotalWallet
// 获取总钱包数
export const getTotalWallet = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTotalWallet');
};

// GET
// /api/taix/dashboard/getTotalUser
// 获取用户总数
export const getTotalUser = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTotalUser');
};

// GET
// /api/taix/dashboard/getTotalUserDaily
// 获取从2025-04-09起之后的每天用户每天增长数量，天为单位
export const getTotalUserDaily = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTotalUserDaily');
};

// GET
// /api/taix/dashboard/getTotalLabel
// 获取 taix_points_record 表 总共的标签数量 count
export const getTotalLabel = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTotalLabel');
};

// GET
// /api/taix/dashboard/getTotalAsset
// 获取总资产
export const getTotalAsset = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTotalAsset');
};

// GET
// /api/taix/dashboard/getTop20RankingUser
// 获取 top20 分数的用户分数和用户名
export const getTop20RankingUser = async () => {
  return axiosInstance.get('/api/taix/dashboard/getTop20RankingUser');
};

// GET
// /api/taix/dashboard/getPointsDistribution
// 统计以最大积分用户的积分数分成10份，每一份区间的用户数
export const getPointsDistribution = async () => {
  return axiosInstance.get('/api/taix/dashboard/getPointsDistribution');
};

