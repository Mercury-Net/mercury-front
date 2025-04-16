export interface LoginData {
  username: string;
  password: string;
  email: string;
  grantType?: string;
  tenantId?: number;
}

export interface LoginResult {
  code: number;
  msg: string;
  data: {
      scope: null,
      openid: null,
      userId: null,
      token: string,
      refresh_token: null,
      expire_in: number,
      refresh_expire_in: null,
      client_id: string
  }
}