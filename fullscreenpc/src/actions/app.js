import { createAction } from 'redux-act';

export const set_uiapp = createAction('set_uiapp');

export const notify_socket_connected = createAction('notify_socket_connected');

export const common_err  = createAction('common_err');

export const getsystemconfig_request = createAction('getsystemconfig_request');
export const getsystemconfig_result = createAction('getsystemconfig_result');
export const getsystemconfig_result_result = createAction('getsystemconfig_result_result');

export const ui_showmenu = createAction('ui_showmenu');
export const ui_showhistoryplay  = createAction('ui_showhistoryplay');

export const ui_showdistcluster = createAction('ui_showdistcluster');
export const ui_showhugepoints = createAction('ui_showhugepoints');
export const ui_showdistcluster_result = createAction('ui_showdistcluster_result');
export const ui_showhugepoints_result = createAction('ui_showhugepoints_result');

export const ui_changetreestyle = createAction('ui_changetreestyle');
export const ui_settreefilter = createAction('ui_settreefilter');
export const md_ui_settreefilter = createAction('md_ui_settreefilter');

export const ui_searchbattery_result= createAction('ui_searchbattery_result');

export const ui_changemodeview = createAction('ui_changemodeview');
export const ui_sel_tabindex = createAction('ui_sel_tabindex');

export const ui_setmapstyle = createAction('ui_setmapstyle');
export const ui_resetsearch = createAction('ui_resetsearch');

export const ui_clickplayback = createAction('ui_clickplayback');

export const ui_viewdevicedetail = createAction('ui_viewdevicedetail');

export const download_excel = createAction('download_excel');


export const ui_showprompt = createAction('ui_showprompt');
export const set_promptdata = createAction('set_promptdata');
