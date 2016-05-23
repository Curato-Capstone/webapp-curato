import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { user as userActions, suggestions as suggestionsActions } from 'modules/index';

import { primaryColor } from 'utils/colors';
import { preferencesInfo } from 'utils/preferences';
import FontAwesome from 'react-fontawesome';

import Header from 'components/Intro/Header';
import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';
import Dots from 'reusable/Dots/Dots';

const preferencesList = ['art', 'history', 'food', 'outdoors',
    'entertainment', 'relaxation', 'shopping', 'sports'];

@Radium
class Preferences extends Component {
    static defaultProps = {};
    props: {
        preferences: Object,
        actions: Object
    };
    state = { prefNum: 0 };
    state : { prefNum: number };

    render() {
        const { preferences, actions } = this.props;
        const { prefNum } = this.state;

        const items = preferencesList.map((pref, index) => {
            return {
                name: pref,
                handleClick: () => this.setState({ prefNum: index })
            };
        });

        const preferenceName = preferencesList[prefNum];
        const info = preferencesInfo[preferenceName];

        return (
            <div style={STYLES.container}>
                <Header text="Set Your Preferences!" />
                <div style={STYLES.text}>
                    First, change these sliders to accurately represent how much
                    you like these different categories. We use these values to
                    help find businesses that you’re interested in, and to also
                    find other people like you who may have similar interests.
                </div>
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
                <div style={STYLES.dots.container}>
                    <FontAwesome
                        name="arrow-left"
                        size="2x"
                        style={{ ...STYLES.dots.leftArrow, ...STYLES.dots.arrow(prefNum === 0) }}
                        onClick={() => this.setState({ prefNum: prefNum - 1 })}
                    />
                    <Dots
                        items={items}
                        active={prefNum}
                    />
                    <FontAwesome
                        name="arrow-right"
                        size="2x"
                        style={{
                            ...STYLES.dots.rightArrow,
                            ...STYLES.dots.arrow(prefNum === preferencesList.length - 1)
                        }}
                        onClick={() => this.setState({ prefNum: prefNum + 1 })}
                    />
                </div>

                <div style={STYLES.buttonContainer}>
                    <Button
                        label="Get Your Suggestions!"
                        onClick={() => {
                            actions.getSuggestionsNoAccount()
                                .then(() => actions.push('/intro/suggestions'));
                        }}
                    />
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    header: {
        fontSize: '42px',
        color: primaryColor
    },

    sliderContainer: {
        position: 'relative',
        margin: '30px',
        backgroundColor: 'white',
        boxShadow: '3px 8px 12px #888888',
        width: '280px',
        paddingBottom: '12px',
        '@media (min-width: 520px)': {
            width: 'initial'
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

    text: {
        margin: '12px',
        fontSize: '12px',
        textAlign: 'center',
        '@media (min-width: 520px)': {
            fontSize: '16px'
        }
    },

    arrow: {
        color: 'grey',
        textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)',
        margin: '20px',
        opacity: '0.75'
    },

    dots: {
        container: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
        },

        arrow: (disabled: bool) => ({
            color: disabled ? 'grey' : primaryColor,
            pointerEvents: disabled ? 'none' : '',
            cursor: disabled ? '' : 'pointer'
        }),

        leftArrow: {
            // marginRight: '5px'
        },

        rightArrow: {
            color: primaryColor,
            marginLeft: '16px'
        }
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
};

function mapStateToProps(state) {
    return {
        preferences: state.getIn(['user', 'preferences']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({
            ...userActions,
            ...suggestionsActions,
            ...routerActions
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
