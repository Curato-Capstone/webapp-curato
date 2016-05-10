// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import * as userActions from 'modules/user';

import { primaryColor, secondaryColor } from 'utils/colors';
import { preferencesInfo } from 'utils/preferences';

import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';

const preferencesList = ['price', 'culture', 'food', 'outdoors',
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
                                <Slider
                                    name={info.name}
                                    tooltipValues={info.tooltipValues}
                                    color={info.color}
                                    handleChange={(v) => actions.changePreference(preferenceName, v)}
                                    value={preferences[preferenceName]}
                                />
                                <div style={STYLES.sliderInfo(info.color)}>
                                    <div style={STYLES.sliderText}>{info.name}</div>
                                    <FontAwesome
                                        name={info.icon}
                                        size="2x"
                                        style={STYLES.icon(info.color)}
                                    />
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
        minHeight: '100vh',
        marginTop: '30px',
        height: '1vh',
        boxSizing: 'border-box'
    },

    header: {
        fontSize: '40px',
        fontWeight: '300',
        color: primaryColor
    },

    slidersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        // height: '100%'
    },

    sliderContainer: {
        position: 'relative',
        margin: '12px',
        backgroundColor: 'white',
        boxShadow: '3px 8px 12px #888888'
    },

    sliderInfo: (color: string) => ({
        position: 'absolute',
        top: 10,
        left: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: '10px',
        color
    }),

    sliderText: {
        fontSize: '24px',
        fontWeight: '200'
    },

    icon: (color: string) => ({
        marginLeft: '12px',
        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        color
    }),

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
        actions : bindActionCreators({ ...userActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
