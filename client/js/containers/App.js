// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as userActions from '../modules/user';
import * as suggestionsActions from '../modules/suggestions';

import Sample from '../components/Sample';
import TestForm from '../components/TestForm';

type Props = {
    user          : Object,
    suggestions   : Object,
    signup        : Object,
    actions       : Object,
    routerActions : Object
};
class App extends Component {
    static defaultProps: void;
    state: void;
    props: Props;

    render(): React.Element {
        const {} = this.props;

        return (
            <div>
                <Sample name="yoooo" />
                <TestForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.get('user'),
        suggestions: state.get('suggestions'),
        signup: state.get('signup')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            userActions,
            suggestionsActions
        ), dispatch),
        routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
