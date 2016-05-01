import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as authActions from 'modules/auth';

export default function requireAuthentication(Component) {

     class AuthenticatedComponent extends Component {
        static defaultProps = {};
        props:{ actions: Object, routerActions: Object, user: Object };
        state:void;

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.user.get('id')) {

            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    function mapStateToProps(state, ownProps) {
        return {
            user: state.get('user')
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
