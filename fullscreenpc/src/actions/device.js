import { createAction } from 'redux-act';
//获取车辆分组信息
export const querydevicegroup_request = createAction('querydevicegroup_request');
export const querydevicegroup_result = createAction('querydevicegroup_result');
//查询车辆【首页上的高级搜索】
export const querydevice_request = createAction('querydevice_request');
export const querydevice_result = createAction('querydevice_result');
//获取一个device所有信息
export const querydeviceinfo_request = createAction('querydeviceinfo_request');
export const querydeviceinfo_result = createAction('querydeviceinfo_result');

export const querydeviceinfo_list_request = createAction('querydeviceinfo_list_request');
export const querydeviceinfo_list_result = createAction('querydeviceinfo_list_result');

//查询历史轨迹数据
export const queryhistorytrack_request  = createAction('queryhistorytrack_request');
export const queryhistorytrack_result  = createAction('queryhistorytrack_result');
//查询今天所有报警信息列表
export const getcurallalarm_request= createAction('getcurallalarm_request');
export const getcurallalarm_result = createAction('getcurallalarm_result');

//查询电池包
export const searchbattery_request = createAction('searchbattery_request');
export const searchbattery_result = createAction('searchbattery_result');

export const searchbatterylocal_request = createAction('searchbatterylocal_request');
export const searchbatterylocal_result = createAction('searchbatterylocal_result');

//批量车辆地理位置变化
export const devicelistgeochange_distcluster = createAction('devicelistgeochange_distcluster');
export const devicelistgeochange_pointsimplifierins = createAction('devicelistgeochange_pointsimplifierins');
export const devicelistgeochange_geotreemenu = createAction('devicelistgeochange_geotreemenu');
export const devicelistgeochange_geotreemenu_refreshtree = createAction('devicelistgeochange_geotreemenu_refreshtree');


export const serverpush_device =  createAction('serverpush_device');

//设置报警信息已读
export const setalarmreaded_request= createAction('setalarmreaded_request');
export const setalarmreaded_result= createAction('setalarmreaded_result');

//收藏设备/取消收藏
export const collectdevice_request = createAction('collectdevice_request');
export const collectdevice_result = createAction('collectdevice_result');

export const set_treesearchlist = createAction('set_treesearchlist');

export const deviceinfoquerychart_request = createAction('deviceinfoquerychart_request');
export const deviceinfoquerychart_result = createAction('deviceinfoquerychart_result');
