import { createAction } from 'redux-act';

export const getcountcar_request = createAction('getcountcar_request');
export const getcountcar_result = createAction('getcountcar_result');

export const getcountbus_request = createAction('getcountbus_request');
export const getcountbus_result = createAction('getcountbus_result');

export const getusedyearcar_request = createAction('getusedyearcar_request');
export const getusedyearcar_result = createAction('getusedyearcar_result');

export const getusedyearbus_request = createAction('getusedyearbus_request');
export const getusedyearbus_result = createAction('getusedyearbus_result');

export const getstatprovince_request = createAction('getstatprovince_request');
export const getstatprovince_result = createAction('getstatprovince_result');

export const getstatcatlproject_request = createAction('getstatcatlproject_request');
export const getstatcatlproject_result = createAction('getstatcatlproject_result');

export const setquery_deviceext_request = createAction('setquery_deviceext_request');
export const setquery_deviceext_result = createAction('setquery_deviceext_result');


export const settype_deviceext = createAction('settype_deviceext');

export const deviceext_request = createAction('deviceext_request');
export const deviceext_result = createAction('deviceext_result');

export const pushdeviceext = createAction('pushdeviceext');
