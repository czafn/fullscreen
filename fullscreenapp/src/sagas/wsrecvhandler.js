import map from 'lodash.map';
import data from './datahandler.js';
const handlerlist = {};

const recvmessagetoresultpair = data.recvmessagetoresultpair;

export function wsrecvhandler(socket,emit){
  map(recvmessagetoresultpair,(fnresult,keyname)=>{
    handlerlist[keyname] = (socket, emit)=> {
      return ((result)=> {
        //
        emit(fnresult(result));
      });
    }
  });
  map(handlerlist,(handlersocket,handlername)=>{
    socket.on(handlername,handlersocket(socket,emit));
  });

}
