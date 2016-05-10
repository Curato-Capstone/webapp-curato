// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Radium from 'radium';

import { primaryColor } from 'utils/colors';

import Stepper from 'reusable/Stepper/Stepper';

const stepperIndex = {
    preferences: 1,
    suggestions: 2,
    signup: 3
};

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
        const pathname = location.pathname.split('/').pop()

        return (
            <div style={STYLES.container}>
                <div style={STYLES.background} />
                {stepperIndex.hasOwnProperty(pathname) ?
                    <Stepper activeStep={stepperIndex[pathname]} /> :
                     null
                 }
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
        width: '100%',
        minHeight: '100vh'
    },

    card: {
        width: '92%',
        maxWidth: '600px',
        minHeight: '450px',
        margin: '20px',
        boxSizing: 'border-box',
        padding: '12px',
        boxShadow: '3px 8px 12px #888888',
        backgroundColor: 'white',
        zIndex: 5,
        '@media (min-width: 520px)': {
            width: '80%',
            margin: '10px 40px 40px 40px',
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

export default connect(mapStateToProps)(Intro);
