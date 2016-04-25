// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import Radium from 'radium';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import { primaryColor } from 'utils/colors';

@Radium
class Intro extends Component {
    static defaultProps = {};
    state: void;
    props: { children: Array<React.Element>|React.Element };

    render() {
        return (
            <div style={STYLES.container}>
                <div style={STYLES.background} />
                <div style={STYLES.card}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        minHeight: '600px',
        width: '100%',
    },

    /* replace with paper component */
    card: {
        width: '80%',
        maxWidth: '600px',
        height: '550px',
        margin: '40px',
        padding: '24px',
        boxShadow: '3px 8px 12px #888888',
        backgroundColor: 'white',
        zIndex: 5,
    },

    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '50vh',
        minHeight: '300px',
        width: '100%',
        background: primaryColor
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
