/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const loginwithtoken_request = createAction('loginwithtoken_request');
export const login_request = createAction('login_request');
export const login_result = createAction('login_result');

export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');

export const changepwd_request = createAction('changepwd_request');
export const changepwd_result = createAction('changepwd_result');

export const savealarmsettings_request = createAction('savealarmsettings_request');
export const savealarmsettings_result = createAction('savealarmsettings_result');
