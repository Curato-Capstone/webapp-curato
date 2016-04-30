// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FlipMove from 'react-flip-move';

import Card from './Card';

const place1 = {
    name: 'EMP',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/emp.jpg'),
    id: '123'
};

const place2 = {
    name: 'Space Needle',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/space_needle.jpg'),
    id: '124',
};

const place3 = {
    name: 'Pike Place Market',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/pike_place_market.jpg'),
    id: '125'
};

@Radium
export default class Example extends Component {
    static defaultProps = {};

    props: {};

    state = { suggestions: [place1, place2, place3] };
    state: { suggestions: Array<Object> };

    render() {
        const { suggestions } = this.state;

        return (
            <div style={STYLES.container}>
                <h2>Card</h2>
                <FlipMove enterAnimation="fade" leaveAnimation="fade" style={STYLES.cardContainer}>
                    {suggestions.slice(0, 2).map((place, index) => {
                        return (
                            <Card
                                key={place.id}
                                place={place}
                                favorite
                                handleFavorite={() => {}}
                                handleDislike={() => {
                                    let newSuggestions = [...suggestions];
                                    const value = newSuggestions.splice(index, 1);
                                    newSuggestions = [...newSuggestions, ...value];

                                    this.setState({ suggestions: newSuggestions });
                                }}
                                handleMore={() => {}}
                            />
                        );
                    })}
                </FlipMove>
            </div>
        );
    }
}

const STYLES = {
    container: {
        margin: '50px',
        width: '100%'
    },

    cardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    }
};
