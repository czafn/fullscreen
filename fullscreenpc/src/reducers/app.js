import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result_result,
} from '../actions';


const initial = {
    app: {
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
    [getsystemconfig_result_result]:(state,payload)=>{
        return {...state,...payload};
    },
    [notify_socket_connected]:(state,socketconnected)=>{
        return {...state,socketconnected};
    },
}, initial.app);

export default app;
