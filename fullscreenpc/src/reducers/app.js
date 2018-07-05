import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    set_uiapp,
    getsystemconfig_result_result,
    ui_showmenu,
    ui_showhistoryplay,
    ui_showhugepoints_result,
    ui_showdistcluster_result,
    ui_changemodeview,
    ui_mycar_showtype,
    ui_index_selstatus,
    ui_sel_tabindex,
    ui_setmapstyle,
} from '../actions';


const initial = {
    app: {
        ispopuserinfo:false,
        ispoppwd:false,
        mappopfields:[],
        mappopclusterfields:[],
        mapdict:{},
        tabindex:0,
        selstatus:0,//for index
        ui_mydeivce_showtype:0,
        showdistcluster:true,
        showhugepoints:true,
        showhistoryplay:false,
        oldshowmenu:'powersearch',
        showmenu:'addressbox',
        socketconnected:false,
        modeview:'device',//'device'/'chargingpile'
        mapstyle : {
            height : 0,
            top : 0
        }
    },
};

const app = createReducer({
    [set_uiapp]:(state,payload)=>{
      return {...state,...payload};
    },
    [ui_sel_tabindex]:(state,payload)=>{
        let tabindex = payload;
        return {...state,tabindex};
    },
    [ui_index_selstatus]:(state,payload)=>{
        let selstatus = payload;
        return {...state,selstatus};
    },
    [ui_mycar_showtype]:(state,payload)=>{
        let ui_mydeivce_showtype = payload;
        return {...state,ui_mydeivce_showtype};
    },
    [ui_changemodeview]:(state,payload)=>{
        let modeview = payload;
        return {...state,modeview};
    },
    [ui_showdistcluster_result]:(state,payload)=>{
        let showdistcluster = payload;
        return {...state,showdistcluster};
    },
    [ui_showhugepoints_result]:(state,payload)=>{
        let showhugepoints = payload;
        return {...state,showhugepoints};
    },
    [ui_showhistoryplay]:(state,payload)=>{
        let showhistoryplay = payload;
        return {...state,showhistoryplay};
    },
    [ui_showmenu]:(state,payload)=>{
        let showmenu = payload;
        let oldshowmenu = state.oldshowmenu;
        if(showmenu === "showdevice_no"){
            showmenu = oldshowmenu==='showdevice'?'powersearch':oldshowmenu;
        }else{
            oldshowmenu = state.showmenu;
        }
        return {...state,showmenu,oldshowmenu};
    },
    [getsystemconfig_result_result]:(state,payload)=>{
        return {...state,...payload};
    },
    [notify_socket_connected]:(state,socketconnected)=>{
        return {...state,socketconnected};
    },
    [ui_setmapstyle]:(state,style)=>{
        return {...state, mapstyle:style };
    },
}, initial.app);

export default app;
