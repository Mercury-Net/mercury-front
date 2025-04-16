import axiosInstance from './axios';

/**
 * 生成密钥对
 * @param callback
 */
export function genKeyPair(callback: Function) {
  return axiosInstance.get('/genKeyPair', {
    headers: {
      isToken: false,
      repeatSubmit: false
    }
  }).then((res) => {
    return callback(res.data.uuidPrivateKey, res.data.RSA_PUBLIC_KEY);
  });
}
