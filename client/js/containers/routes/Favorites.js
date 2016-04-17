// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Card from 'reusable/Card/Card'

type Props = {};
class Favorites extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                <Card />
            </div>
        );
    }
}

export default Radium(Favorites);
