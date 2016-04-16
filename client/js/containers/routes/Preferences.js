// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class Preferences extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                This is the preferences page
            </div>
        );
    }
}

export default Radium(Preferences);
