import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

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
            <div style={STYLES.container}>
                <Header text="Set Your Preferences!"/>
                <div style={STYLES.text}>First, change these sliders to accurately represent how much you like these different categories. We use these values to help find businesses that you’re interested in, and to also find other people like you who may have similar interests.</div>
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
                <FontAwesome
                    name="arrows-h"
                    size="3x"
                    style={{ color: 'grey', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)', marginTop: '12px', opacity: '0.75' }}
                />
                <div>
                    <Link to="/intro/2">
                        <Button label="Get Your Suggestions!" style={STYLES.suggestionButton}/>
                    </Link>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
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
        // paddingLeft: '5%',
        height: '350px',
        width: '100%',
    },

    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '300px',
    },

    text: {
        margin: '24px',
        textAlign: 'center'
    },

    suggestionButton: {
        // marginTop: '15%',
    }
};
