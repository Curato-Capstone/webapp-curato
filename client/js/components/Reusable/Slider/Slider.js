// @flow
import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import SliderComponent from './SliderComponent';

export default class Slider extends Component {
    static defaultProps = { value : 0 };
    props: {
        name          : string,
        // value is in terms of the slider itself, 0 = beginning, 200 = end
        value         : number,
        tooltipValues : Array<string>,
        handleChange  : (value: number) => void,
    };
    state : { value: number };

    constructor(props: Object) {
        super(props);

        this.state = { value: (this.props.value - 1) * (200 / 4) };
    }

    render() {
        return (
            <SliderComponent
                    {...this.props}
                    handleChange={this.handleChange}
                    updateValue={this.updateValue}
                    value={this.state.value}
            />
        );
    }

    @autobind
    handleChange(value: number): void {
        this.setState({ value });
    }

    @autobind
    updateValue() {
        this.props.handleChange(Math.round(this.state.value / (200 / 4)) + 1);
    }
}
