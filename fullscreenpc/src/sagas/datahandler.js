import {
    common_err,

    loginwithtoken_request,
    login_request,
    md_login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,

    getnotifymessage_request,
    getnotifymessage_result,

    getnotifymessageone_request,
    getnotifymessageone_result,

    querydevicegroup_request,
    querydevicegroup_result,

    querydevice_request,
    querydevice_result,

    querydeviceinfo_request,
    md_querydeviceinfo_result,
    // querydeviceinfo_result,

    querydeviceinfo_list_request,
    querydeviceinfo_list_result,


    queryhistorytrack_request,
    queryhistorytrack_result,

    deviceinfoquerychart_request,
    deviceinfoquerychart_result,

    collectdevice_request,
    collectdevice_result,

    changepwd_request,
    changepwd_result,

    savealarmsettings_request,
    savealarmsettings_result,

    serverpush_device
  } from '../actions';
import {
  uireport_searchdevice_request,
  uireport_searchdevice_result,
  uireport_searchalarm_request,
  uireport_searchalarm_result,
  uireport_searchalarmdetail_request,
  uireport_searchalarmdetail_result,
  uireport_searchposition_request,
  uireport_searchposition_result,
  uireport_searchhistorydevice_request,
  uireport_searchhistorydevice_result,
  uireport_searchcararchives_request,
  uireport_searchcararchives_result
} from './pagination';

//接收的对应关系
let recvmessagetoresultpair = {
  'deviceinfoquerychart_result':deviceinfoquerychart_result,
  'savealarmsettings_result':savealarmsettings_result,
  'serverpush_device':serverpush_device,

  'uireport_searchdevice_result':uireport_searchdevice_result,
  'uireport_searchalarm_result':uireport_searchalarm_result,
  'uireport_searchalarmdetail_result':uireport_searchalarmdetail_result,
  'uireport_searchposition_result':uireport_searchposition_result,
  'uireport_searchhistorydevice_result':uireport_searchhistorydevice_result,
  'uireport_searchcararchives_result':uireport_searchcararchives_result,

  'getnotifymessage_result':getnotifymessage_result,//不用
  'getnotifymessageone_result':getnotifymessageone_result,//不用

  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,
  'querydevicegroup_result':querydevicegroup_result,
  'querydevice_result':querydevice_result,
  'querydeviceinfo_result':md_querydeviceinfo_result,//先预处理
  'querydeviceinfo_list_result':querydeviceinfo_list_result,

  'queryhistorytrack_result':queryhistorytrack_result,

  'collectdevice_result':collectdevice_result,
  'changepwd_result':changepwd_result
};

//非验证发送接口
let sendmessagefnsz = {
  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,

  'getsystemconfig':`${getsystemconfig_request}`,
  'getnotifymessage':`${getnotifymessage_request}`,//不用
  'getnotifymessageone':`${getnotifymessageone_request}`,//不用

};

//验证发送接口
let sendmessageauthfnsz = {
  'savealarmsettings':`${savealarmsettings_request}`,
  'changepwd':`${changepwd_request}`,
  'collectdevice':`${collectdevice_request}`,
  'querydevicegroup':`${querydevicegroup_request}`,

  'querydevice':`${querydevice_request}`,
  'deviceinfoquerychart':`${deviceinfoquerychart_request}`,
  'querydeviceinfo':`${querydeviceinfo_request}`,
  'querydeviceinfo_list':`${querydeviceinfo_list_request}`,
  'queryhistorytrack':`${queryhistorytrack_request}`,
  'uireport_searchdevice':`${uireport_searchdevice_request}`,
  'uireport_searchalarm':`${uireport_searchalarm_request}`,
  'uireport_searchalarmdetail':`${uireport_searchalarmdetail_request}`,
  'uireport_searchposition':`${uireport_searchposition_request}`,
  'uireport_searchhistorydevice':`${uireport_searchhistorydevice_request}`,
  'uireport_searchcararchives':`${uireport_searchcararchives_request}`
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
