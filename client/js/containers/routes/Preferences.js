// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import FontAwesome from 'react-fontawesome';

import * as userActions from 'modules/user';

import { primaryColor, secondaryColor } from 'utils/colors'
import preferencesInfo from 'utils/Preferences';

import Slider from 'reusable/Slider/Slider'
import Button from 'reusable/Button/Button'

const preferencesList = ['price', 'culture', 'food', 'outdoor',
    'entertainment', 'relaxation', 'shopping', 'sports'];

@Radium
class Preferences extends Component {
    static defaultProps = {};
    state: void;
    props: {
        user: Object,
        actions: Object
    };

    render() {
        const { user, actions } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.slidersContainer}>
                    {preferencesList.map((preferenceName) => {
                        const preferenceInfo = preferencesInfo[preferenceName];
                        return (
                            <div style={STYLES.sliderContainer} key={preferenceName}>
                                <Slider
                                    name={preferenceName}
                                    value={user.preferences[preferenceName]}
                                    handleChange={(v) => actions.changePreference(preferenceName, v)}
                                    tooltipValues={['I hate this', 'I like this', 'I love this']}
                                />
                                <div style={STYLES.sliderName}>{preferenceInfo.name}</div>
                                <FontAwesome
                                    name={preferenceInfo.icon}
                                    size="5x"
                                    style={{ color: '#BC4432', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)', marginTop: '12px', opacity: '0.75' }}
                                />
                            </div>
                        )
                    })}
                </div>
                <Button label="Update your Preferences!" type="primary" style={STYLES.updateButton}/>
            </div>
        );
    }
}

const lowerSlidersKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(-35px)',
        opacity: 0
    },

    '50%': {
        opacity: 0.3
    },

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
        alignItems: 'center'
    },
    slidersContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: '60px'
    },

    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 70px',
        backgroundColor: 'white',
        margin: '10px 20px',
        height: '280px',
        width: '280px',
        animation: 'x 0.75s ease-in-out 0s 1 normal forwards',
        animationName: lowerSlidersKeyframes,
        boxShadow: '3px 8px 12px #888888',
        '@media (min-width: 520px)': {
            width: '400px',
            height: '350px',
        },
    },

    sliderName: {
        marginTop: '8px',
        fontSize: '24px',
        color: secondaryColor
    },

    updateButton: {
        margin: '50px'
    }
};

function mapStateToProps(state) {
    return {
        user: state.get('user').toJS(),
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
