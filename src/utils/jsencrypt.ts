import JSEncrypt from 'encryptlong';
// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 前端不建议存放私钥 不建议解密数据 因为都是透明的意义不大
const privateKey = process.env.REACT_APP_RSA_PRIVATE_KEY;

// 加密
export const encrypt = (txt: string, publicKey: string) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encryptLong(txt); // 对数据进行加密
};

// 解密
export const decrypt = (txt: string) => {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
};
