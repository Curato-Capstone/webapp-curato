import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { isDevelopment } from 'utils/utils';

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

import requireAuth from 'components/AuthenticatedComponent';

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
                            <IndexRoute component={requireAuth(Search)} />
                            <Route path="intro" component={Intro}>
                                <IndexRoute component={HomeIntro} />
                                <Route path="1" component={PreferencesIntro} />
                                <Route path="2" component={SuggestionsIntro} />
                                <Route path="3" component={SignUpIntro} />
                            </Route>
                            <Route path="place" component={Place} />
                            <Route path="signIn" component={requireAuth(SignIn)} />
                            <Route path="suggestions" component={requireAuth(Suggestions)} />
                            <Route path="preferences" component={requireAuth(Preferences)} />
                            <Route path="account" component={requireAuth(Account)} />
                            <Route path="favorites" component={requireAuth(Favorites)} />
                        </Route>
                    </Router>
                    { !isDevelopment ? <DevTools /> : null }
                </div>
            </Provider>
        );
    }
}
