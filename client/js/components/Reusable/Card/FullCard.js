// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Heart from 'components/Reusable/Icons/Heart';
import Tag from './Tag';

@Radium
export default class FullCard extends Component {
    static defaultProps = {};
    props: {
        place: {
            name : string,
            id : string,
            location: {
                address: string
            },
            categories: Array<Object>,
            image: string
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
                        <div style={STYLES.cardText.placeName}>{this.truncateName(place.name)}</div>
                        <div style={STYLES.cardText.address}>{place.location.address}</div>
                    </div>
                    <div style={STYLES.cardActions.container}>
                        <div onClick={handleFavorite}>
                            <Heart active={favorite} />
                        </div>
                        <div onClick={handleDislike}>I don't like this</div>
                        <div style={STYLES.cardActions.more}>...more</div>
                    </div>
                </div>

                <div style={STYLES.cardImage.container}>
                    <img style={STYLES.cardImage.main} src={place.image} />
                    <Tag text={place.categories[0].name} />
                </div>
            </div>
        );
    }

    truncateName(name: string) {
        return name.length >= 50 ? `${name.substring(0, 48)}...` : name;
    }
}

const raiseImageKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
    },
    '50%': {
        transform: 'translateY(-75px)',
        height: '400px',
        width: '350px',
    },
    '100%': {
        transform: 'translateY(-75px)',
        width: '100vw',
        height: '300px'
    }
}, 'raiseImage');


const expandImageKeyFrames = Radium.keyframes({
    '0%': {
        width: '900px',
    },

    '100%': {
        width: '100%'
    }
}, 'expandImage');

const lowerTextKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 0
    },

    '50%': {
        transform: 'translateY(75px)',
        opacity: 1,
        width: '380px',
        marginLeft: '-15px',
    },

    '100%': {
        transform: 'translateY(175px)',
        opacity: 1,
        width: '100%',
        marginLeft: '0',
    }
}, 'lowerText');

const expandContainerKeyframes = Radium.keyframes({
    '0%': {
        width: '350px'
    },

    '100%': {
        width: '100%'
    }
}, 'expandContainer');

const moveCardTextKeyframes = Radium.keyframes({
    '0%': {
        top: '270px'
    },

    '100%': {
        top: '70px'
    }
}, 'moveCardText');

const revealInfoKeyframes = Radium.keyframes({
    '0%': {
        opacity: '0'
    },

    '100%': {
        opacity: '1'
    }
}, 'revealInfo');

const STYLES = {
    container: {
        marginTop: '-75px',
        marginBottom: '40px',
        position: 'relative',
        height: '450px',
        animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
        animationName: expandContainerKeyframes,
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
            animation: 'x 2s ease-in-out 0.5s 1 normal forwards',
            animationName: raiseImageKeyframes,
        },

        main: {
            // transition: 'all 1s ease-out',
            width: '900px',
            animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
            animationName: expandImageKeyFrames,
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
            animation: 'x 2s ease-in-out 0.5s 1 normal forwards',
            animationName: lowerTextKeyframes,
            // but it translates down 75px
            top: 0,
        },

        text: {
            position: 'absolute',
            color: 'grey',
            top: 250 + 20,
            left: 20,
            animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
            animationName: moveCardTextKeyframes,
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
    },

    hiddenInfo: {
        marginTop: '15px',
        opacity: 0,
        animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
        animationName: revealInfoKeyframes,
    }
};
