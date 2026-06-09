export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  admin: {
    id: number;
    username: string;
  };
}