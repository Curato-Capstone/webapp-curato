// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

import { primaryColor, secondaryColor } from 'utils/colors'
import preferencesInfo from 'utils/Preferences';

import Slider from 'reusable/Slider/Slider'

const preferencesList = ['price', 'culture', 'food', 'outdoor',
    'entertainment', 'relaxation', 'shopping', 'sports'];

class Preferences extends Component {
    static defaultProps = {};
    state: void;
    props: {};

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                {preferencesList.map((preference) => {
                    const preferenceInfo = preferencesInfo[preference];
                    return (
                        <div style={STYLES.sliderContainer}>
                            <Slider
                                name={preference}
                                value={0}
                                handleChange={(v) => {}}
                                tooltipValues={['I hate this shit', 'I like this shit', 'I love this shit']}
                            />
                            <div style={STYLES.sliderName}>{preferenceInfo.name}</div>
                            <FontAwesome
                                name={preferenceInfo.icon}
                                size="5x"
                                style={{ color: '#BC4432', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)', marginTop: '24px', opacity: '0.75' }}
                            />
                        </div>
                    )
                })}
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        margin: '80px',
        boxShadow: '3px 8px 12px #888888',
    },

    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 70px'
    },

    sliderName: {
        marginTop: '8px',
        fontSize: '24px',
        color: secondaryColor
    }
};

export default Radium(Preferences);
