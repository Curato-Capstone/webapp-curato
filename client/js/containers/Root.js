import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleRoot } from 'radium';

import { isDevelopment } from 'utils/utils';

import DevTools from './DevTools';
import App from 'containers/App';
import Account from 'routes/Account';
import Search from 'routes/Search';
import Favorites from 'routes/Favorites';
import Suggestions from 'routes/Suggestions';
import Preferences from 'routes/Preferences';
import SignIn from 'routes/SignIn';
import Place from 'routes/Place';
import PageNotFound from 'routes/PageNotFound';

import Intro from 'routes/Intro';
import HomeIntro from 'routes/Intro/HomeIntro';
import PreferencesIntro from 'routes/Intro/PreferencesIntro';
import SuggestionsIntro from 'routes/Intro/SuggestionsIntro';
import SignUpIntro from 'routes/Intro/SignUpIntro';

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
                <StyleRoot>
                    <Router history={history}>
                        <Route path="/" component={App}>
                            <IndexRoute component={requireAuth(Search)} />
                            <Route path="intro" component={Intro}>
                                <IndexRoute component={HomeIntro} />
                                <Route path="preferences" component={PreferencesIntro} />
                                <Route path="suggestions" component={SuggestionsIntro} />
                                <Route path="signup" component={SignUpIntro} />
                            </Route>
                            <Route path="place/:id" component={Place} />
                            <Route path="signIn" component={requireAuth(SignIn)} />
                            <Route path="suggestions" component={requireAuth(Suggestions)} />
                            <Route path="preferences" component={requireAuth(Preferences)} />
                            <Route path="account" component={requireAuth(Account)} />
                            <Route path="favorites" component={requireAuth(Favorites)} />
                        </Route>
                        <Route path="*" component={PageNotFound} />
                    </Router>
                    { isDevelopment ? <DevTools /> : null }
                </StyleRoot>
            </Provider>
        );
    }
}
