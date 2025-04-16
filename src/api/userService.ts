import axiosInstance from './axios';

// 积分记录接口
export interface PointsRecord {
  id?: string;
  // 添加其他必要的字段
}

// PUT
// /intax/pointsRecord
// 修改Taix积分记录
export const updatePointsRecord = (data: PointsRecord) => {
  return axiosInstance.put('/intax/pointsRecord', data);
};

// POST
// /intax/pointsRecord
// 新增Taix积分记录
export const createPointsRecord = (data: PointsRecord) => {
  return axiosInstance.post('/intax/pointsRecord', data);
};

// POST
// /intax/pointsRecord/importTemplate
export const importPointsRecordTemplate = () => {
  return axiosInstance.post('/intax/pointsRecord/importTemplate');
};

// POST
// /intax/pointsRecord/importData
// 导入数据
export const importPointsRecordData = (data: FormData) => {
  return axiosInstance.post('/intax/pointsRecord/importData', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// POST
// /intax/pointsRecord/export
// 导出Taix积分记录列表
export const exportPointsRecord = (params?: any) => {
  return axiosInstance.post('/intax/pointsRecord/export', params, {
    responseType: 'blob',
  });
};

// GET
// /intax/pointsRecord/{id}
// 获取Taix积分记录详细信息
export const getPointsRecordDetail = (id: string) => {
  return axiosInstance.get(`/intax/pointsRecord/${id}`);
};

// GET
// /intax/pointsRecord/list
// 查询Taix积分记录列表
export const getPointsRecordList = (params?: any) => {
  return axiosInstance.get('/intax/pointsRecord/list', { params });
};

// DELETE
// /intax/pointsRecord/{ids}
// 删除Taix积分记录
export const deletePointsRecord = (ids: string[]) => {
  return axiosInstance.delete(`/intax/pointsRecord/${ids.join(',')}`);
};


