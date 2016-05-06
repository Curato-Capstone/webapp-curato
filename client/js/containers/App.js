// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { StyleRoot } from 'radium';
import FlipMove from 'react-flip-move';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import Sample from 'components/Sample';
import SideNav from 'components/Navigation/SideNav';
import UserAvatar from 'components/Navigation/UserAvatar';
import BreadCrumbs from 'components/Navigation/BreadCrumbs';
import MessageBar from 'components/Reusable/MessageBar/MessageBar';
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
        auth          : Object,
        location      : Object,
        actions       : Object,
        routerActions : Object,
        children      : React.Element
    };
    state: void;

    componentWillMount() {
        // this.props.actions.getUserData()
    }

    render(): React.Element {
        return (
            <StyleRoot>
                <MuiThemeProvider muiTheme={curatoTheme}>
                    {this.renderComponents()}
                </MuiThemeProvider>
            </StyleRoot>
        );
    }

    renderComponents() {
        if (this.props.auth.isAuthenticating) {
            return (
                <div style={STYLES.container}>
                    {this.renderSpinner()}
                </div>
            );
        }
        return (
            <div style={STYLES.container}>
                <FlipMove enterAnimation="fade" leaveAnimation="fade" style={STYLES.messageBar}>
                    {this.renderMessageBar()}
                </FlipMove>
                {this.renderNavigation()}
                {this.renderSpinner()}
                {this.props.children}
            </div>
        );
    }

    renderMessageBar() {
        const { global } = this.props;
        const { errorMessage, successMessage } = global;

        if (errorMessage) {
            return <MessageBar key={errorMessage} type="error" message={errorMessage} />;
        } else if (successMessage) {
            return <MessageBar key={successMessage} type="success" message={successMessage} />;
        }
    }

    renderNavigation() {
        const { location, user } = this.props;

        if (!location.pathname.includes('intro')
            && !location.pathname.includes('signin')
            && !location.pathname.includes('place')) {
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
        const { global, auth } = this.props;

        if (global.loading || auth.isAuthenticating) {
            return <Spinner />;
        }
    }
}

const STYLES = {
    container: {
        fontFamily: 'Montserrat, Sans-Serif',
        display: 'flex',
        backgroundColor: '#F6F6F6',
        minHeight: '100vh'
    },

    navContainer: {
        width: '80px',
        '@media (min-width: 520px)': {
            marginRight: '12px'
        }
    },

    messageBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        width: '100%'
    }
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.get('user').toJS(),
        suggestions: state.get('suggestions').toJS(),
        global: state.get('global').toJS(),
        auth: state.get('auth').toJS(),
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
