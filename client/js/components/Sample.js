import React, { Component } from 'react';
import Radium from 'radium';

import Slider from './Slider/Slider';
import Button from './Reusable/Button/Button';
import Card from './Reusable/Card/Card';
import Dots from './Reusable/Dots/Dots';
import Input from './Reusable/Input/Input';

import Star from './Reusable/Icons/Star'
import Heart from './Reusable/Icons/Heart'

class Sample extends Component {
    static defaultProps = {};
    state: { sliderValue: number };
    props: void;

    constructor(props) {
        super(props);
        this.state = { sliderValue : 0 };
    }

    render() {
        return (
            <div style={STYLES}>
                <h2>Card</h2>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <Card />
                    <Card />
                    <Card />
                </div>


                <h2>Star</h2>
                <Star active/>
                <Heart active/>

                <h2>Slider</h2>
                <Slider
                    name="Art"
                    value={this.state.sliderValue}
                    handleChange={(v) => this.setState({ sliderValue: v })}
                    tooltipValues={['I hate this shit', 'I like this shit', 'I love this shit']}
                />

                <h2>Buttons</h2>
                <Button label="Primary Button" type="primary" />
                <Button label="Secondary Button" type="secondary" />

                <Button label="Disabled Primary Button" type="primary" disabled />
                <Button label="Disabled Secondary Button" type="secondary" disabled />

                <h2>Dots</h2>
                <Dots items={[{ name: 'test' }, { name: 'test2' }]} active={0} />

                <h2>Inputs</h2>
                <Input
                    id="empty-input"
                    hintText="Put something here!"
                    type="text"
                    floatingLabelText="text"
                />
                <Input
                    value="This is a regular text input"
                    hintText="Put something here!"
                    id="regular-input"
                    type="text"
                    floatingLabelText="text"
                />
                <Input
                    value="This is a password input"
                    hintText="Password tho"
                    id="password-input"
                    type="password"
                    floatingLabelText="Password"
                />
            </div>
        );
    }
}

const STYLES = {
    display: 'inline-block',
};

export default Radium(Sample);
