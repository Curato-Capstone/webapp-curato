// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { user as userActions } from 'modules/index';

import { primaryColor } from 'utils/colors';
import { preferencesInfo } from 'utils/preferences';

import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';

const preferencesList = ['art', 'history', 'food', 'outdoors',
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
                <h2 style={STYLES.header}>Your Preferences!</h2>
                <div style={STYLES.slidersContainer}>
                    {preferencesList.map((preferenceName) => {
                        const info = preferencesInfo[preferenceName];

                        return (
                            <div style={STYLES.sliderContainer} key={preferenceName}>
                                <div style={STYLES.slider}>
                                    <Slider
                                        name={info.name}
                                        tooltipValues={info.tooltipValues}
                                        color={info.color}
                                        handleChange={(v) => actions.changePreference(preferenceName, v)}
                                        value={preferences[preferenceName]}
                                    />
                                </div>
                                <div style={STYLES.sliderInfo(info.color)}>
                                    <div style={STYLES.sliderText}>{info.name}</div>
                                    <FontAwesome
                                        name={info.icon}
                                        size="2x"
                                        style={STYLES.icon(info.color)}
                                    />
                                </div>
                                <div style={STYLES.sliderDescription(info.color)}>
                                    {info.tooltipValues[preferences[preferenceName] - 1]}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Button
                    label="Update your Preferences!"
                    type="primary"
                    handleClick={() => actions.updatePreferences()}
                    style={STYLES.updateButton}
                />
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
        // minHeight: '100vh',
        marginTop: '30px',
        // marginLeft: '12px',
        // height: '1vh',
        width: '100%',
        overflow: 'hidden',
        paddingLeft: '50px',
        boxSizing: 'border-box',
        '@media (min-width: 520px)': {
            paddingLeft: '80px'
        }
    },

    header: {
        fontSize: '30px',
        fontWeight: '300',
        color: primaryColor,
        '@media (min-width: 520px)': {
            fontSize: '40px'
        }
    },

    slidersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        // marginRight: '-20px',
        '@media (min-width: 520px)': {
            marginRight: '0'
        }
    },

    sliderContainer: {
        position: 'relative',
        margin: '10px 0',
        backgroundColor: 'white',
        boxShadow: '3px 8px 12px #888888',
        width: '280px',
        '@media (min-width: 520px)': {
            width: 'initial',
            margin: '30px 10px',
        }
    },

    slider: {
        marginLeft: '-50px',
        '@media (min-width: 520px)': {
            marginLeft: '0px'
        }
    },

    sliderInfo: (color: string) => ({
        position: 'absolute',
        top: 10,
        left: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color
    }),

    sliderText: {
        fontSize: '24px',
        fontWeight: '200'
    },

    sliderDescription: (color: string) => ({
        display: 'flex',
        justifyContent: 'center',
        width: '280px',
        margin: '0 0px 16px 0px',
        padding: '0 12px',
        boxSizing: 'border-box',
        textAlign: 'center',
        color,
        '@media (min-width: 520px)': {
            width: '360px'
        },
    }),

    icon: (color: string) => ({
        marginLeft: '12px',
        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        color
    }),

    updateButton: {
        margin: '30px 0'
    }
};

function mapStateToProps(state) {
    return {
        preferences: state.getIn(['user', 'preferences']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({ ...userActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
