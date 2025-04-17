import axios from 'axios';
import { tansParams } from '../utils/common';
import { encrypt, decrypt } from '../utils/jsencrypt';

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://192.168.1.113:8080/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在这里可以添加 token 等认证信息
    const isToken = config.headers?.isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = config.headers?.repeatSubmit === false;
     // 是否需要加密
    const isEncrypt = config.headers?.isEncrypt === 'true';

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (process.env.REACT_APP_ENCRYPT === 'true') {
      // 当开启参数加密
      if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
        // 根据 AES 密钥进行加密
        const publicKey = (config.headers || {}).publicKey;
        config.data =
          typeof config.data === 'object'
            ? encrypt(encodeURIComponent(JSON.stringify(config.data)), publicKey)
            : encrypt(encodeURIComponent(config.data), publicKey);
        delete config.headers['publicKey'];
      }
    }


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if(response.data.code === 401){
      localStorage.removeItem('token');
      window.location.href = '/points';
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance; 