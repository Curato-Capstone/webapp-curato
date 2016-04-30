// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import SliderExample from 'components/Reusable/Slider/Example';
import ButtonExample from 'components/Reusable/Button/Example';
import IconExample from 'components/Reusable/Icons/Example';
import CardExample from 'components/Reusable/Card/Example';
import DotsExample from 'components/Reusable/Dots/Example';
import InputExample from 'components/Reusable/Input/Example';

@Radium
export default class Sample extends Component {
    static defaultProps = {};
    props: {};
    state: { sliderValue: number };

    render() {
        return (
            <div style={STYLES}>
                <CardExample />

                <IconExample />

                <SliderExample />
                
                <ButtonExample />
                
                <DotsExample />
                
                <InputExample />
            </div>
        );
    }
}

const STYLES = {
    display: 'inline-block',
};
