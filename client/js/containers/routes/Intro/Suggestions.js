// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Header from 'components/Intro/Header';
import Card from 'reusable/Card/Card';

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

@Radium
export default class Suggestions extends Component {
    static defaultProps = {};
    props: {};
    state = { suggestions: [place1, place2, place3] };
    state: { suggestions: Array<Object> };

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <Header text="Your Suggestions!" />
                <div style={STYLES.text}>These are the suggestions we came up with!</div>
                <div style={STYLES.cardContainer}>
                    {this.state.suggestions.map((place, index) => {
                        return (
                            <div style={STYLES.card} key={place.id}>
                                <Card
                                    place={place}
                                    favorite
                                    handleFavorite={() => {}}
                                    handleDislike={() => {}}
                                    handleMore={() => {}}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        height: '100%'
    },
    cardContainer: {
        display: 'flex',
        overflow: 'scroll',
        overflowY: 'hidden',
        height: '70%',
        alignItems: 'center',
        '@media (min-width: 520px)': {
            height: '80%'
        },

    },
    card: {
        transform: 'scale(0.7, 0.7)'
    },

    text: {
        margin: '24px',
        textAlign: 'center'
    }
};
