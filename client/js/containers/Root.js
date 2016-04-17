import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { isDevelopment } from '../utils/utils';

import DevTools from './DevTools';
import App from 'containers/App';
import Account from 'routes/Account';
import Search from 'routes/Search';
import Favorites from 'routes/Favorites';
import Intro from 'routes/Intro';
import Preferences from 'routes/Preferences';
import SignUp from 'routes/SignUp';
import SignIn from 'routes/SignIn';
import Place from 'routes/Place';

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
                            <IndexRoute component={Search} />
                            <Route path="intro" component={Intro}>
                                <Route path="1" />
                                <Route path="2" />
                                <Route path="3" />
                                <Route path="4" />
                            </Route>
                            <Route path="place" component={Place} />
                            <Route path="signUp" component={SignUp} />
                            <Route path="signIn" component={SignIn} />
                            <Route path="preferences" component={Preferences} />
                            <Route path="account" component={Account} />
                            <Route path="favorites" component={Favorites} />
                        </Route>
                    </Router>
                    { !isDevelopment ? <DevTools /> : null }
                </div>
            </Provider>
        );
    }
}
