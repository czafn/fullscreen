import { createAction } from 'redux-act';

export const map_setmapinited = createAction('map_setmapinited');
export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');

//获取一个区域
export const mapmain_seldistrict = createAction('mapmain_seldistrict');
export const mapmain_init_device = createAction('mapmain_init_device');
export const mapmain_getdistrictresult = createAction('mapmain_getdistrictresult');
export const mapmain_selgroup = createAction('mapmain_selgroup');
export const mapmain_selgroup_deviceid = createAction('mapmain_selgroup_deviceid');

//获取地理位置【城市】
export const mapmain_getgeoresult = createAction('mapmain_getgeoresult');

export const mapmain_clusterMarkerClick = createAction('mapmain_clusterMarkerClick');

export const mapmain_areamountdevices_request= createAction('mapmain_areamountdevices_request');
export const mapmain_areamountdevices_result= createAction('mapmain_areamountdevices_result');

export const mapmain_showpopinfo = createAction('mapmain_showpopinfo');
export const mapmain_showpopinfo_list = createAction('mapmain_showpopinfo_list');
