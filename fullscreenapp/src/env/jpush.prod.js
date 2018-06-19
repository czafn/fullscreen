// import * as xview from './xview/Common';
import {jpushlistenInMessage,jpushpostNotification} from '../actions';

export const cancelJPushAlisa=()=>{
    try{
        window.xview.xviewCancelJPushAlias();
    }
    catch(e){
      window.alert(`注销设置别名(cancelJPushAlisa)${JSON.stringify(e)}`);
    }

}

export const setJPushAlias = (name)=> {
    //设置jpush名字
    try{
        //  xview.jiGuangTuiSong(name);
        const json = {
          "alias": name,
        };
        window.xview.xviewSetJPushAlias(JSON.stringify(json));
     }
     catch(e){
       window.alert(`设置别名失败(setJPushAlias)
       ${JSON.stringify(e)}
       ${name}`);
     }
}

export const postNotifyFromJPush = (dispatch)=>{
    //未点击推送消息
    window.xviewListenJPush=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
            dispatch(jpushlistenInMessage(jsonobj));
        }
        catch(e){
          window.alert(`推送消息失败(postNotifyFromJPush)
          ${jsonstr}
          ${JSON.stringify(e)}`);
        }
        //window.alert(`listenInMessage==>\n${jsonstr}`);

    }
    //点击了推送消息
    window.xviewReceiveJPush=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
            dispatch(jpushpostNotification(jsonobj));
        }
        catch(e){
          window.alert(`推送消息失败(postNotification)
          ${jsonstr}
          ${JSON.stringify(e)}`);
        }
        //window.alert(`postNotification==>\n${jsonstr}`);

    }
}
