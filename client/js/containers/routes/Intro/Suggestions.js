// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import Header from 'components/Intro/Header';
import Card from 'reusable/Card/Card';
import Button from 'reusable/Button/Button';

const place1 = {
    name: 'EMP',
    location: {address: '3495 James St., Seattle, WA'},
    image: require('images/places/emp.jpg'),
    id: '123'
};

const place2 = {
    name: 'Space Needle',
    location: {address: '3495 James St., Seattle, WA'},
    image: require('images/places/space_needle.jpg'),
    id: '124',
};

const place3 = {
    name: 'Pike Place Market',
    location: {address: '3495 James St., Seattle, WA'},
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
                <div style={STYLES.buttonContainer}>
                    <Link to="/intro/3">
                        <Button label="I'm ready to sign up!" type="primary" />
                    </Link>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        height: '100%',
        position: 'relative',
    },

    cardContainer: {
        display: 'flex',
        overflow: 'scroll',
        overflowY: 'hidden',
        height: '350px',
        alignItems: 'center',
        '@media (min-width: 520px)': {
            height: '450px'
        },

    },

    card: {
        transform: 'scale(0.7, 0.7)'
    },

    text: {
        margin: '24px',
        textAlign: 'center'
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
};
