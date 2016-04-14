// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { StyleRoot } from 'radium';

import * as userActions from '../modules/user';
import * as suggestionsActions from '../modules/suggestions';

import SideNav from '../components/Navigation/SideNav';
import Sample from '../components/Sample';


type Props = {
    user          : Object,
    suggestions   : Object,
    actions       : Object,
    routerActions : Object,
    children      : React.Element
};
class App extends Component {
    static defaultProps: void;
    state: void;
    props: Props;

    render(): React.Element {
        const {} = this.props;

        return (
            <StyleRoot>
                <div style={STYLES}>
                    <Sample />
                    {this.props.children}
                </div>
            </StyleRoot>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.get('user').toJS(),
        suggestions: state.get('suggestions').toJS()
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

const STYLES = {
    fontFamily: 'Gidole, Sans-Serif'
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
