import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class Dots extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                <div>I am dots</div>
            </div>
        );
    }
}

const STYLES = {};

export default Radium(Dots);
