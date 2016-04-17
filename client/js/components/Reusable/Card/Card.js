// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Heart from 'components/Reusable/Icons/Heart';

@Radium
export default class Card extends Component {
    static defaultProps = {};
    props: {
        place: {
            address : string,
            name    : string,
            image   : string,
            id      : string
        },
        favorite: boolean,
        handleDislike: () => void,
        handleFavorite: () => void,
        handleMore: () => void
    };
    state: void;

    render() {
        const { place, favorite, handleDislike, handleFavorite } = this.props;

        return (
            <div style={STYLES.container}>

                <div style={STYLES.cardText.container}>
                    <div style={STYLES.cardText.text}>
                        <div style={STYLES.cardText.placeName}>{place.name}</div>
                        <div style={STYLES.cardText.address}>{place.address}</div>
                    </div>
                    <div style={STYLES.cardActions.container}>
                        <Heart handleClick={handleFavorite} active={favorite} />
                        <div onClick={handleDislike}>I don't like this</div>
                        <div style={STYLES.cardActions.more}>...more</div>
                    </div>
                </div>

                <div style={STYLES.cardImage.container}>
                    <img style={STYLES.cardImage.main} src={place.image} />
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
}, 'lowerText');

const raiseImageKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
    },
    '100%': {
        transform: 'translateY(-75px)',
    }
}, 'raiseImage');

const STYLES = {
    container: {
        marginTop: '75px',
        marginBottom: '40px',
        position: 'relative',
        height: '450px',
        // margin: '60px 0'
    },

    cardImage: {
        container: {
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

        main: {
            transition: 'all 1s ease-out',
            width: '900px'
        }
    },

    cardText: {
        container: {
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

        text: {
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
        }
    },

    cardActions: {
        container: {
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
    }
};
