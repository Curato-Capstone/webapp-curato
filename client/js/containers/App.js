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
import MessageBar from 'components/Reusable/MessageBar/MessageBar'
import Spinner from 'components/Reusable/Spinner/Spinner';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import curatoBaseTheme from 'utils/curatoTheme';

const curatoTheme = getMuiTheme(curatoBaseTheme);

class App extends Component {
    static defaultProps: void;
    props: {
        user          : Object,
        suggestions   : Object,
        global        : Object,
        location      : Object,
        actions       : Object,
        routerActions : Object,
        children      : React.Element
    };
    state: void;

    render(): React.Element {
        return (
            <StyleRoot>
                <MuiThemeProvider muiTheme={curatoTheme}>
                    <div style={STYLES.container}>
                        {this.renderNavigation()}
                        {this.renderSpinner()}
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

    renderSpinner() {
        const { global } = this.props;

        if (global.loading) {
            return <Spinner />;
        }
    }
}

const STYLES = {
    container: {
        fontFamily: 'Montserrat, Sans-Serif',
        display: 'flex',
        backgroundColor: '#F6F6F6',
        height: '100%'
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
        global: state.get('global').toJS(),
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
