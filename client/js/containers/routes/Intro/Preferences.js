import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as userActions from 'modules/user';

import { primaryColor, secondaryColor } from 'utils/colors';
import { preferencesInfo } from 'utils/preferences';
import FontAwesome from 'react-fontawesome';

import Header from 'components/Intro/Header';
import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';

const preferencesList = ['price', 'culture', 'food', 'outdoor',
    'entertainment', 'relaxation', 'shopping', 'sports'];

@Radium
class Preferences extends Component {
    static defaultProps = {};
    props: {
        preferences: Object,
        actions: Object
    };
    state: void;

    render() {
        const { preferences, actions } = this.props;

        return (
            <div style={STYLES.container}>
                <Header text="Set Your Preferences!" />
                <div style={STYLES.text}>
                    First, change these sliders to accurately represent how much
                    you like these different categories. We use these values to
                    help find businesses that you’re interested in, and to also
                    find other people like you who may have similar interests.
                </div>
                <div style={STYLES.slidersContainer}>
                    {preferencesList.map((preferenceName) => {
                        const preferenceInfo = preferencesInfo[preferenceName];
                        return (
                            <div style={STYLES.slider.container} key={preferenceName}>
                                <Slider
                                    name={preferenceName}
                                    value={preferences[preferenceName]}
                                    handleChange={(v) => actions.changePreference(preferenceName, v)}
                                    tooltipValues={
                                    ['I hate this shit', 'I like this shit', 'I love this shit']
                                    }
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
                <FontAwesome
                    name="arrows-h"
                    size="3x"
                    style={STYLES.arrow}
                />
                <div style={STYLES.buttonContainer}>
                    <Link to="/intro/2">
                        <Button label="Get Your Suggestions!"/>
                    </Link>
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

    slidersContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'scroll',
        width: '100%',
        marginTop: '24px'
    },

    slider: {
        container: {
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            // height: '100%'
        },

        name: {
            position: 'absolute',
            top: 0,
            left: 30,
            fontSize: '24px',
            color: secondaryColor
        },

        icon: {
            color: '#BC4432',
            textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)',
            marginTop: '12px',
            opacity: '0.75'
        }
    },

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
        actions : bindActionCreators(Object.assign({}, userActions), dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
