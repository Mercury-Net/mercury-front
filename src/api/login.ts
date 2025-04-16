// 登录接口/login
// 登录示例
import { LoginData, LoginResult } from './types';
import { genKeyPair } from './genKeyPair';
import axiosInstance from './axios';

export function login(data: LoginData): Promise<LoginResult> {
  const params = {
    ...data,
    grantType: data.grantType || 'password',
    tenantId: data.tenantId || 1
  };

  return new Promise((resolve, reject) => {
    genKeyPair((uuid: string, publicKey: string) => {
      axiosInstance({
        url: '/taix/user/login',
        headers: {
          isToken: false,
          isEncrypt: true,
          [process.env.REACT_APP_ENCRYPT_HEADER || 'encrypt-key']: uuid,
          publicKey: publicKey
        },
        method: 'post',
        data: params
      })
        .then((response) => {
          const res = response as unknown as LoginResult;
          // 登录成功后保存token
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}