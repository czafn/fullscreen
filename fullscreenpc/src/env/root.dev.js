/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';
import { Provider } from 'react-redux';
// import DevTools from './devtools';
import store from './store';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {history} from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppRoot from '../components/approot.js';

let Root = (props)=>
    (


        <MuiThemeProvider>
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history}>
                        <Route path="/" component={AppRoot}/>
                    </ConnectedRouter>
                    {/* <DevTools /> */}
                </div>
            </Provider>
        </MuiThemeProvider>

    );


export default Root;
