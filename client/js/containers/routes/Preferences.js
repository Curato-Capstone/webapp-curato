// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import FontAwesome from 'react-fontawesome';

import * as userActions from 'modules/user';

import { primaryColor, secondaryColor } from 'utils/colors';
import { preferencesInfo } from 'utils/preferences';

import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';

const preferencesList = ['price', 'culture', 'food', 'outdoor',
    'entertainment', 'relaxation', 'shopping', 'sports'];

@Radium
class Preferences extends Component {
    static defaultProps = {};
    state: void;
    props: {
        preferences: Object,
        actions: Object
    };

    render() {
        const { preferences, actions } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.slidersContainer}>
                    {preferencesList.map((preferenceName) => {
                        const preferenceInfo = preferencesInfo[preferenceName];

                        return (
                            <div style={STYLES.slider.container} key={preferenceName}>
                                <Slider
                                    name={preferenceName}
                                    value={preferences[preferenceName]}
                                    handleChange={(v) => actions.changePreference(preferenceName, v)}
                                    tooltipValues={['I hate this', 'I like this', 'I love this']}
                                />
                                <div style={STYLES.slider.name}>{preferenceInfo.name}</div>
                                <FontAwesome
                                    name={preferenceInfo.icon}
                                    size="4x"
                                    style={STYLES.slider.icon}
                                />
                            </div>
                        );
                    })}
                </div>
                <Button
                    label="Update your Preferences!"
                    type="primary"
                    style={STYLES.updateButton}
                />
            </div>
        );
    }
}

const lowerSlidersKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(-35px)',
        opacity: 0
    },

    '50%': { opacity: 0.3 },

    '100%': {
        transform: 'translateY(0px)',
        opacity: 1
    }
}, 'lowerSliders');

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    slidersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '60px'
    },

    slider: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '250px',
            width: '300px',
            margin: '10px 10px',
            opacity: 0,
            backgroundColor: 'white',
            boxShadow: '3px 8px 12px #888888',
            animation: 'x 0.75s ease-in-out 0s 1 normal forwards',
            animationName: lowerSlidersKeyframes,
            '@media (min-width: 520px)': {
                height: '250px',
                width: '300px',
            }
        },

        name: {
            position: 'absolute',
            top: 10,
            right: 12,
            fontSize: '24px',
            color: secondaryColor
        },

        icon: {
            marginTop: '12px',
            opacity: '0.75',
            color: '#BC4432',
            textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)'
        }
    },

    updateButton: {
        margin: '50px'
    }
};

function mapStateToProps(state) {
    return {
        preferences: state.getIn(['user', 'preferences']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            userActions
        ), dispatch),
        routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
