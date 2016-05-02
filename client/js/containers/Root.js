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
import Suggestions from 'routes/Suggestions';

import Intro from 'routes/Intro';

import HomeIntro from 'routes/Intro/Home';
import PreferencesIntro from 'routes/Intro/Preferences';
import SuggestionsIntro from 'routes/Intro/Suggestions';
import SignUpIntro from 'routes/Intro/SignUp';

import Preferences from 'routes/Preferences';
import SignIn from 'routes/SignIn';
import Place from 'routes/Place';

import PageNotFound from 'routes/PageNotFound';

export default class Root extends Component {
    state: void;
    props: { store: Object };

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
                                <IndexRoute component={HomeIntro} />
                                <Route path="1" component={PreferencesIntro} />
                                <Route path="2" component={SuggestionsIntro} />
                                <Route path="3" component={SignUpIntro} />
                            </Route>
                            <Route path="place" component={Place} />
                            <Route path="signIn" component={SignIn} />
                            <Route path="suggestions" component={Suggestions} />
                            <Route path="preferences" component={Preferences} />
                            <Route path="account" component={Account} />
                            <Route path="favorites" component={Favorites} />
                            <Route path="*" component={PageNotFound} />
                        </Route>
                    </Router>
                    { !isDevelopment ? <DevTools /> : null }
                </div>
            </Provider>
        );
    }
}
