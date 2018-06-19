import { createAction } from 'redux-act';

export const map_setmapinited = createAction('map_setmapinited');
export const mapmain_setmapcenter = createAction('mapmain_setmapcenter');
export const mapmain_setzoomlevel = createAction('mapmain_setzoomlevel');
export const mapmain_setenableddrawmapflag = createAction('mapmain_setenableddrawmapflag');

export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');

export const ui_selcurdevice_request = createAction('ui_selcurdevice_request');
export const ui_selcurdevice_result = createAction('ui_selcurdevice_result');

export const ui_btnclick_deviceonline  = createAction('ui_btnclick_deviceonline');
export const ui_btnclick_deviceoffline  = createAction('ui_btnclick_deviceoffline');
export const ui_btnclick_alaramall =  createAction('ui_btnclick_alaramall');
export const ui_btnclick_alaramred =  createAction('ui_btnclick_alaramred');
export const ui_btnclick_alaramorange =  createAction('ui_btnclick_alaramorange');
export const ui_btnclick_alaramyellow =  createAction('ui_btnclick_alaramyellow');
export const ui_menuclick_settings = createAction('ui_menuclick_settings');
export const ui_menuclick_logout = createAction('ui_menuclick_logout');
export const ui_btnclick_devicehistorytrackplayback = createAction('ui_btnclick_devicehistorytrackplayback');
export const ui_btnclick_devicemessage = createAction('ui_btnclick_devicemessage');

export const ui_alarm_selcurdevice = createAction('ui_alarm_selcurdevice');
export const ui_mycar_selcurdevice = createAction('ui_mycar_selcurdevice');
export const ui_mycar_showtype= createAction('ui_mycar_showtype');
export const ui_selworkorder = createAction('ui_selworkorder');

export const ui_index_selstatus= createAction('ui_index_selstatus');

export const ui_index_addcollection= createAction('ui_index_addcollection');
export const ui_index_unaddcollection= createAction('ui_index_unaddcollection');
//轨迹回放
export const mapplayback_start = createAction('mapplayback_start');
export const mapplayback_end = createAction('mapplayback_end');

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
