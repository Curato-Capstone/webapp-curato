// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Slider from './Slider';

@Radium
export default class Example extends Component {
    static defaultProps = {};

    props: {};

    state = { sliderValue: 0 };
    state: { sliderValue: number };

    render() {
        return (
            <div style={STYLES}>
                <h2>Slider</h2>
                <Slider
                    name="Art"
                    value={this.state.sliderValue}
                    handleChange={(v) => this.setState({ sliderValue: v })}
                    tooltipValues={['I hate this shit', 'I like this shit', 'I love this shit']}
                />
            </div>
        );
    }
}

const STYLES = {
    margin: '50px'
};
