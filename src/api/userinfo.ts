import axiosInstance from './axios';
// POST
// /api/taix/user/login
// FinTax邮箱登录
export const login = (email: string, password: string) => {
  return axiosInstance.post('/taix/user/login', {
    email,
    password
  });
};

// POST
// /api/taix/user/getUserRanking
// 根据 userId 获取当前用户的积分排名
export const getUserRanking = () => {
  return axiosInstance.get('/taix/user/getUserRanking');
};

// POST
// /api/taix/user/getUserProgress
// 根据 userId 获取用户状态进展
export const getUserProgress = () => {
  return axiosInstance.get('/taix/user/getUserProgress');
};

// POST
// /api/taix/user/getUserInvitationInfoAndUrl
// 根据 userId 获取用户的邀请链接和总邀请数
export const getUserInvitationInfoAndUrl = () => {
  return axiosInstance.get('/taix/user/getUserInvitationInfoAndUrl');
};

// POST
// /api/taix/user/getUserCurrentPoints
// 根据 userId 获取用户当前分数
export const getUserCurrentPoints = () => {
  return axiosInstance.get('/taix/user/getUserCurrentPoints');
};

// POST
// /api/taix/user/getUserContributionLevel
// 根据 userId 获取当该用户的贡献等级 大于 10000 是Gold 大于 5000 是 Silver else 是 Bronze
export const getUserContributionLevel = () => {
  return axiosInstance.get('/taix/user/getUserContributionLevel');
};

// GET
// /api/taix/user/getUserInfo
// 根据 token 获取用户信息
export const getUserInfo = () => {
  return axiosInstance.get('/taix/user/getUserInfo');
};

