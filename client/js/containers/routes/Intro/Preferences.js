import React, { Component } from 'react';
import Radium from 'radium';

import { primaryColor } from 'utils/colors';
import preferencesInfo from 'utils/Preferences';
import FontAwesome from 'react-fontawesome';

import Header from 'components/Intro/Header';
import Slider from 'reusable/Slider/Slider';
import Button from 'reusable/Button/Button';

const preferencesList = ['price', 'culture', 'food', 'outdoor',
    'entertainment', 'relaxation', 'shopping', 'sports'];

@Radium
export default class Preferences extends Component {
    static defaultProps = {};
    props: {};
    state: void;
    
    render() {
        const { } = this.props;
    
        return (
            <div>
                <Header text="Set Your Preferences!"/>
                <div style={STYLES.text}>Here are your preferences</div>
                <div style={STYLES.slidersContainer}>
                    {preferencesList.map((preferenceName) => {
                        const preferenceInfo = preferencesInfo[preferenceName];
                        return (
                            <div style={STYLES.sliderContainer} key={preferenceName}>
                                <Slider
                                    name={preferenceName}
                                    value={0}
                                    handleChange={(v) => {}}
                                    tooltipValues={['I hate this shit', 'I like this shit', 'I love this shit']}
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
            </div>
        );
    }
}

const STYLES = {
    header: {
        fontSize: '42px',
        color: primaryColor
    },

    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
            width: '300px',
            height: '300px',
    },

    slidersContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'scroll',
        // paddingLeft: '5%',
        height: '300px',
    },

    text: {
        margin: '24px',
        textAlign: 'center'
    }
};
