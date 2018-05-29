import { createAction } from 'redux-act';

export const notify_socket_connected = createAction('notify_socket_connected');
export const common_err  = createAction('common_err');

export const getsystemconfig_request = createAction('getsystemconfig_request');
export const getsystemconfig_result = createAction('getsystemconfig_result');
export const getsystemconfig_result_result = createAction('getsystemconfig_result_result');

export const ui_showmenu = createAction('ui_showmenu');

export const ui_searchbattery_result= createAction('ui_searchbattery_result');
export const ui_settreefilter = createAction('ui_settreefilter');
export const md_ui_settreefilter = createAction('md_ui_settreefilter');
export const ui_changetreestyle = createAction('ui_changetreestyle');

export const ui_selcurdevice_result = createAction('ui_selcurdevice_result');
