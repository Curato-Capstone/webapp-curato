import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import DevTools from 'containers/DevTools';
import Reducer from './modules/index';

export default function composeStore() {
    const middleware = [
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(browserHistory))
    ];

    // devtools only in development
    if (process.env.NODE_ENV !== 'production') {
        middleware.push(DevTools.instrument());
    }

    const finalCreateStore = compose(...middleware)(createStore);

    const store = finalCreateStore(Reducer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./modules/index', () => {
            const nextRootReducer = require('./modules/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
