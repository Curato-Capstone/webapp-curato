import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import DevTools from 'containers/DevTools';
import Reducer from './redux/reducer';

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
        module.hot.accept('./redux/reducer', () => {
            const nextRootReducer = require('./redux/reducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
