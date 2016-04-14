import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

type Props = {};
class Card extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                <div>I am a card</div>
            </div>
        );
    }
}

const STYLES = {};

export default Radium(Card);
