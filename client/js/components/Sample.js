// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Slider from './Reusable/Slider';
import Button from './Reusable/Button';
import Card from './Reusable/Card';
import Dots from './Reusable/Dots';
import Input from './Reusable/Input';

class Sample extends Component {
    static defaultProps = {};
    state: void;
    props: void;

    render() {
        return (
            <div style={STYLES}>
                <Slider name="Art" />

                <Button label="Button" type="primary" />
                <Button label="Button" type="secondary" />

                <Card />

                <Dots />

                <Input />
            </div>
        );
    }
}

const STYLES = {
    margin: '16px'
};

export default Radium(Sample);
