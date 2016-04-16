// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class Favorites extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                This is the favorites pages
            </div>
        );
    }
}

export default Radium(Favorites);
