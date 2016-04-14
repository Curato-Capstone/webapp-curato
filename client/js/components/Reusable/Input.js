import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

type Props = {};
class Input extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                <div>I am an input</div>
            </div>
        );
    }
}

const STYLES = {};

export default Radium(Input);
