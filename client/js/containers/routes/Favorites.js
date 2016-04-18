// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Card from 'reusable/Card/Card'


const place1 = {
    name: 'EMP',
    address: '1234 Street Ave., Seattle, WA',
    image: require('images/places/emp.jpg'),
    id: '123'
};

const place2 = {
    name: 'Space Needle',
    address: '3495 James St., Seattle, WA',
    image: require('images/places/space_needle.jpg'),
    id: '124',
};

const place3 = {
    name: 'Pike Place Market',
    address: '2nd Pike Pl., Seattle, WA',
    image: require('images/places/pike_place_market.jpg'),
    id: '125'
};

const suggestions = [place1, place2, place3];
type Props = {};
class Favorites extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                {suggestions.map((place, index) => {
                    return (
                        <Card
                            key={place.id}
                            place={place}
                            favorite
                            handleFavorite={() => {}}
                            handleDislike={() => {}}
                            handleMore={() => {}}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Radium(Favorites);

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '64px'
    }
}