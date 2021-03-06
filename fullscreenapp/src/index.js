import React from 'react';
import ReactDOM from 'react-dom';
import Approot from './env/root';
import {sagaMiddleware} from './env/store';
import rootSaga from './sagas';
// import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Approot />, document.getElementById('root'));
// registerServiceWorker();
