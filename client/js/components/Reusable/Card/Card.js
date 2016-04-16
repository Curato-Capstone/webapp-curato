import React, { Component } from 'react';
import Radium from 'radium';

import placeImage from '../../../../images/places/emp.jpg';
import Heart from './../Icons/Heart'

@Radium
export default class Card extends Component {
    static defaultProps = {};
    props: {
        place: {
            address : string,
            name    : string,
            image   : string
        },
        favorite: boolean
    };
    state: void;

    render() {
        return (
            <div style={STYLES.container}>
                <div style={STYLES.cardTextContainer}>
                    <div style={STYLES.cardText}>
                        <div style={STYLES.placeName}>EMP Museum</div>
                        <div style={STYLES.address}>1234 Street Ave., Seattle, WA</div>
                    </div>
                    <div style={STYLES.cardActionsContainer}>
                        <div>
                            <Heart active/>
                        </div>
                        <div>
                            I don't like this
                        </div>
                        <div>I like this</div>
                        <div style={STYLES.more}>...more</div>
                    </div>
                </div>

                <div style={STYLES.imageContainer}>
                    <img style={STYLES.image} src={placeImage} />
                </div>
            </div>
        );
    }
}

const lowerTextKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 0
    },

    '50%': {
        opacity: 0.3
    },

    '100%': {
        transform: 'translateY(75px)',
        opacity: 1
    }
}, 'lower');

const raiseImageKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
    },
    '100%': {
        transform: 'translateY(-75px)',
    }
}, 'lower');

const STYLES = {
    container: {
        marginTop: '50px',
        position: 'relative',
        height: '450px'
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: '400px',
        width: '350px',
        transition: 'all 1s ease-out',
        animation: 'x 1s ease-in-out 0.5s 1 normal forwards',
        animationName: raiseImageKeyframes,
    },

    image: {
        transition: 'all 1s ease-out',
        width: '900px'
    },

    cardTextContainer: {
        boxShadow: '3px 8px 5px #888888',
        height: '400px',
        width: '380px',
        marginLeft: '-15px',
        background: 'white',
        opacity: 0,
        position: 'absolute',
        animation: 'x 1s ease-in-out 0.5s 1 normal forwards',
        animationName: lowerTextKeyframes,
        top: 0,
    },

    cardText: {
        position: 'absolute',
        color: 'grey',
        top: 250 + 20,
        left: 20
    },

    placeName: {
        fontSize: '24px'
    },

    address: {
        color: 'black'
    },

    cardActionsContainer: {
        position: 'absolute',
        bottom: 10,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around'
    },

    more: {
        color: 'blue'
    }
};
