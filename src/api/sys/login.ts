import {defHttp} from '/@/utils/http/axios';

import type {ErrorMessageMode} from '/#/axios';
import type {LoginDingtalkParams, LoginPwdParams, LoginResultModel} from './model/loginModel';

enum Api {
  LoginPwd = '/login/password',
  LoginDingtalk = '/login/dingtalk',
  Logout = '/login/logout',
}

export function loginUsePwd(params: LoginPwdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.LoginPwd,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function loginUseDingtalk(params: LoginDingtalkParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.LoginDingtalk,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function loginOut(mode: ErrorMessageMode = 'modal') {
  return defHttp.post({url: Api.Logout}, {errorMessageMode: mode});
}

