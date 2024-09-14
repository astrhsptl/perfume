export interface ISignUp {
  username: string;
  address: string;
  email: string;
  phone: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IAccessToken {
  access: string;
}

export interface IRefreshToken {
  refresh: string;
}

export interface TokenPair {
  refresh: string;
  access: string;
}
