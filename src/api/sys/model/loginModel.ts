import type {UserInfo} from "/#/store";

export interface LoginPwdParams {
  username: string;
  password: string;
}

export interface LoginDingtalkParams {
  authCode: string;
}

export interface LoginResultModel {
  tokenInfo: {
    tokenName: string;
    tokenValue: string;
  }
  userInfo: UserInfo
}
