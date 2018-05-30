/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from '../config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import store from '../env/store.js';

import {wsrecvhandler} from './wsrecvhandler.js';

import data from './datahandler.js';
import {
    login_result,
    logout_result,
    // logout_request,
    notify_socket_connected,
    common_err
} from '../actions';

let issocketconnected = false;

function connect() {
    const socket = io(config.serverurl,{path:config.wspath});
    return new Promise(resolve => {
        socket.on('connect', () => {
            issocketconnected = true;
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        wsrecvhandler(socket,emit);
        socket.on('connect',()=>{
            issocketconnected = true;
            store.dispatch(notify_socket_connected(true));
        });
        socket.on('disconnect',()=>{
            issocketconnected = false;
            store.dispatch(notify_socket_connected(false));
        });
        socket.on('error',()=>{
            //emit(disconnect());
        });
        return () => {};
    });
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);

        yield put(action);
    }
}

function* write(socket,fun,cmd) {
    while (true) {
        let { payload } = yield take(fun);

        if(issocketconnected){
          socket.emit(`${config.softmode}`,{cmd:cmd,data:payload});
        }
        else{
          yield put(common_err({type:cmd,errmsg:`服务器连接断开!无法发送命令${cmd}`}))
        }
    }
}

function* handleIOWithAuth(socket) {
    let tasksz =[];
    while (true) {

        yield take(`${login_result}`);


        let fnsz = data.sendmessageauthfnsz;

        for (var cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }

        //注销比较特殊

        yield take(`${logout_result}`);
        for (let i=0;i<tasksz.length;i++) {
            yield cancel(tasksz[i]);
        }
    }
}

function* handleIO(socket) {
    let fnsz =  data.sendmessagefnsz;
    for (var cmd in fnsz) {
        yield fork(write, socket,fnsz[cmd],cmd);
    }
}


export function* wsflow() {
    const socket = yield call(connect);
    yield fork(read, socket);
    yield fork(handleIOWithAuth, socket);
    yield fork(handleIO, socket);
    store.dispatch(notify_socket_connected(true));
}
