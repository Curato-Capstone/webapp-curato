import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as authActions from 'modules/auth';

export default function requireAuthentication(MyComponent) {
    class AuthenticatedComponent extends Component {
        static defaultProps = {};
        props:{ actions: Object, routerActions: Object, auth: Object };
        state:void;

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps() {
            this.checkAuth();
        }

        checkAuth() {
            // if user isn't authenticated and we aren't in the process of authenticating
            // if (!this.props.auth.get('authenticated') && !this.props.auth.get('isAuthenticating')) {
            //     this.props.routerActions.push('/intro');
            // }
        }

        render() {
            return <MyComponent {...this.props} />;
        }
    }

    function mapStateToProps(state, ownProps) {
        return {
            auth: state.get('auth')
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            actions : bindActionCreators(authActions, dispatch),
            routerActions : bindActionCreators(routerActions, dispatch)
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
