// @flow
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { isDevelopment } from '../utils';

import DevTools from './DevTools';
import App from './App';

type Props = { store: Object };
export default class Root extends Component {
    state: void;
    props: Props;

    render() {
        const store = this.props.store;
        const history = syncHistoryWithStore(browserHistory, store,
            { selectLocationState: (state) => state.get('routing') });

        return (
            <Provider store={store} >
                <div>
                    <Router history={history}>
                        <Route path="/" component={App}>

                        </Route>
                    </Router>
                    { isDevelopment ? <DevTools /> : null }
                </div>
            </Provider>
        );
    }
}
