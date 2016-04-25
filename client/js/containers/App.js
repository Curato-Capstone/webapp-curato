// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { StyleRoot } from 'radium';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import Sample from 'components/Sample';
import SideNav from 'components/Navigation/SideNav';
import UserAvatar from 'components/Navigation/UserAvatar';
import BreadCrumbs from 'components/Navigation/BreadCrumbs';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends Component {
    static defaultProps: void;
    props: {
        user          : Object,
        suggestions   : Object,
        location      : Object,
        actions       : Object,
        routerActions : Object,
        children      : React.Element
    };
    state: void;

    render(): React.Element {
        return (
            <StyleRoot>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <div style={STYLES.container}>
                        {this.renderNavigation()}
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </StyleRoot>
        );
    }

    renderNavigation() {
        const { location, user } = this.props;

        if (!location.pathname.includes('intro')) {
            return (
                <div style={STYLES.navContainer}>
                    <SideNav location={location} />
                    <UserAvatar name={user.name} />
                    <BreadCrumbs location={location} />
                </div>
            );
        }
    }
}

const STYLES = {
    container: {
        fontFamily: 'Montserrat, Sans-Serif',
        display: 'flex',
        backgroundColor: '#F6F6F6',
    },

    navContainer: {
        marginRight: '50px',
        '@media (min-width: 520px)': {
            width: '80px',
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.get('user').toJS(),
        suggestions: state.get('suggestions').toJS(),
        location: ownProps.location
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
