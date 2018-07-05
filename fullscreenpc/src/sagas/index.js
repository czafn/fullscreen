import { fork } from 'redux-saga/effects';
import {apiflow} from './api';
import {createsagacallbackflow} from './pagination';

import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';

import {deviceinfoquerychartflow} from './deviceinfoquerychart';
import {createloadingflow} from './loading';
import {createmapmainflow} from './mapmain';
import {createmaptrackhistoryplaybackflow} from './mapplayback';
import {socketflow} from './socketflow';
import {uiflow} from './ui';
import {downloadexcel} from './downloadexcel';
import {catldata} from './catlfull';
import {catldatarestful} from './catlfull_restful';
import config from '../config.js';

export default function* rootSaga() {
  try{
    if(config.softmode === 'app'){
      yield fork(jpushflow);
    }
    yield fork(deviceinfoquerychartflow);
    yield fork(downloadexcel);
    yield fork(socketflow);
    yield fork(createmapmainflow);
    yield fork(createmaptrackhistoryplaybackflow);
    yield fork(createloadingflow);
    yield fork(uiflow);
    yield fork(wsrecvsagaflow);
    yield fork(createsagacallbackflow);
    yield fork(apiflow);
    if(config.softmode === 'fullpc' || config.softmode === 'fullapp'){
      yield fork(catldata);
      yield fork(catldatarestful);
    }
  }
  catch(e){

  }

}
