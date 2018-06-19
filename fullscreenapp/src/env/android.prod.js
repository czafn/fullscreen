import store from './store';
import { goBack  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
let handlerbackfn;

export const exitAndroidApp=()=>{


  window.setTimeout(()=>{
    try{
      //alert('exit app');
      window.xview.xviewExitApp(JSON.stringify({
        type:'finish'
      }));
    }
    catch(e){
      window.alert(`退出app失败
        ${JSON.stringify(e)}`);
    }
  },0);

}

export const setbackhandler=(fn)=>{
  handlerbackfn = fn;
}

export const removebackhandler=()=>{
  handlerbackfn = undefined;
}

export const registerandroid=()=>{
  window.webBack=()=>{
    try{
      //alert("window.webBack");
      if(!!handlerbackfn){
        handlerbackfn();
      }
      else{
        store.dispatch(goBack());
      }
    }
    catch(e){
      window.alert(`点击返回键失败
        ${JSON.stringify(e)}`);
    }

  };
}
