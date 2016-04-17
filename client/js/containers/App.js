// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { StyleRoot } from 'radium';

import * as userActions from '../modules/user';
import * as suggestionsActions from '../modules/suggestions';

import Sample from 'components/Sample';
import SideNav from 'components/Navigation/SideNav'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends Component {
    static defaultProps: void;
    props: {
        user          : Object,
        suggestions   : Object,
        actions       : Object,
        routerActions : Object,
        children      : React.Element
    };
    state: void;

    render(): React.Element {
        const {} = this.props;

        return (
            <StyleRoot>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <div style={STYLES}>
                        <SideNav />
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
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
    fontFamily: 'Montserrat, Sans-Serif',
    display: 'flex',
    backgroundColor: '#F6F6F6',
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
