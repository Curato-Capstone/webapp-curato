// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';

import SliderComponent from './SliderComponent';

export default class Slider extends Component {
    static defaultProps = { value : 0 };
    props: { value: number };
    state : void

    constructor(props) {
        super(props);

        this.state = { value: this.props.value * (200 / 5)}
    }

    render() {
        return <SliderComponent
                    {...this.props}
                    handleChange={this.handleChange}
                    updateValue={this.updateValue}
                    value={this.state.value}
                />;
    }

    @autobind
    handleChange(value) {
        this.setState({ value });
    }

    @autobind
    updateValue() {
        this.props.handleChange(Math.round(this.state.value / (200 / 5)))
    }
}
