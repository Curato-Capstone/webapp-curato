// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import Radium from 'radium';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import { primaryColor } from 'utils/colors';

import Stepper from 'reusable/Stepper/Stepper';

@Radium
class Intro extends Component {
    static defaultProps = {};
    props: {
        location: Object,
        children: Array<React.Element>|React.Element
    };
    state: void;


    render() {
        const { location } = this.props;
        const pathname = location.pathname.replace(/\/$/, '').slice(-1);

        return (
            <div style={STYLES.container}>
                <div style={STYLES.background} />
                {!isNaN(pathname) ? <Stepper activeStep={pathname} /> : null}
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
    },

    card: {
        width: '80%',
        maxWidth: '600px',
        minHeight: '450px',
        margin: '20px',
        padding: '12px',
        boxShadow: '3px 8px 12px #888888',
        backgroundColor: 'white',
        zIndex: 5,
        '@media (min-width: 520px)': {
            margin: '0 40px 40px 40px',
            padding: '24px',
            minHeight: '550px'
        },
    },

    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '50vh',
        minHeight: '300px',
        width: '100%',
        zIndex: 0,
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
        actions : bindActionCreators(Object.assign({}, userActions, suggestionsActions), dispatch),
        routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
