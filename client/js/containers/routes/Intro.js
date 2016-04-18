// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import Radium from 'radium';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import { primaryColor } from 'utils/colors'

@Radium
class Intro extends Component {
    static defaultProps = {};
    state: void;
    props: {};

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.background}/>
                <div style={STYLES.card}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        height: '100%',
        height: '100vh',
        minHeight: '600px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        width: '80%',
        maxWidth: '600px',
        height: '550px',
        boxShadow: '3px 8px 12px #888888',
        backgroundColor: 'white',
        margin: '40px',
        padding: '24px',
        zIndex: 9
    },

    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        background: primaryColor,
        width: '100%',
        height: '50vh',
        minHeight: '300px'
    }
};

function mapStateToProps(state, ownProps) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
