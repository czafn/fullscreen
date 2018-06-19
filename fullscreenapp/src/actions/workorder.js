import { createAction } from 'redux-act';
//城市相关
export const getallworkorder_request = createAction('getallworkorder_request');
export const getallworkorder_result = createAction('getallworkorder_result');

export const queryworkorder_request = createAction('queryworkorder_request');
export const queryworkorder_result = createAction('queryworkorder_result');

//设置工单为已处理
export const setworkorderdone_request  = createAction('setworkorderdone_request');
export const setworkorderdone_result = createAction('setworkorderdone_result');

//新建工单
export const createworkorder_request  = createAction('createworkorder_request');
export const createworkorder_result = createAction('createworkorder_result');
//获取项目用户（工单用户）
export const getworkusers_request  = createAction('getworkusers_request');
export const getworkusers_result = createAction('getworkusers_result');
