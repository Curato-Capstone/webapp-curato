// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import Tag from './tag'
import { primaryColor } from 'utils/colors';

import Heart from 'components/Reusable/Icons/Heart';
import Placeholder from 'images/places/emp.jpg';

@Radium
export default class Card extends Component {
    static defaultProps = {};
    props: {
        place: {
            name : string,
            id : string,
            location: {
                address: string
            },
            image: string
        },
        favorite: boolean,
        handleDislike: () => void,
        handleFavorite: () => void,
        handleMore: () => void
    };
    state: void;

    truncateName(name) {
        return name.length >= 30 ? name.substring(0,25) + '...' : name;
    }

    render() {
        const { place, favorite, handleDislike, handleFavorite } = this.props;

        console.log()
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
                        <Link to={`/place/${place.id}`}>
                            <div style={STYLES.cardActions.more}>...more</div>
                        </Link>
                    </div>
                </div>

                <div style={STYLES.cardImage.container}>
                    <img style={STYLES.cardImage.main} src={Placeholder} />
                </div>
                <Tag text={place.categories[0].name} />
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
    '0%': { transform: 'translateY(0)' },

    '100%': { transform: 'translateY(-75px)' }
}, 'raiseImage');

const STYLES = {
    container: {
        position: 'relative',
        height: '350px',
        marginTop: '75px',
        marginBottom: '80px',
        marginLeft: '15px',
        /* revisit */
        transition: 'all 1s ease-out',
        '@media (min-width: 520px)': {
            height: '450px',
        },
    },

    cardImage: {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '250px',
            height: '300px',
            /* revisit do I want this even */
            transition: 'all 1s ease-out',
            animation: 'x 1s ease-in-out 0.2s 1 normal forwards',
            animationName: raiseImageKeyframes,
            '@media (min-width: 520px)': {
                width: '350px',
                height: '400px'
            },
        },

        main: {
            /* revisit do I want this even */
            transition: 'all 1s ease-out',
            width: '700px',
            '@media (min-width: 520px)': {
                width: '900px',
            },
        }
    },

    cardText: {
        container: {
            position: 'absolute',
            top: 0,
            height: '300px',
            width: '280px',
            boxShadow: '3px 8px 12px #888888',
            marginLeft: '-15px',
            background: 'white',
            opacity: 0,
            /* revisit */
            transition: 'all 1s ease-out',
            animation: 'x 1s ease-in-out 0.2s 1 normal forwards',
            animationName: lowerTextKeyframes,
            '@media (min-width: 520px)': {
                height: '400px',
                width: '380px',
            },
        },

        text: {
            position: 'absolute',
            top: 185,
            left: 20,
            color: 'grey',
            /* revisit */
            transition: 'all 1s ease-out',
            '@media (min-width: 520px)': {
                top: 270,
            }
        },

        placeName: {
            fontSize: '24px'
        },

        address: {
            color: primaryColor
        }
    },

    cardActions: {
        container: {
            position: 'absolute',
            bottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%'
        },

        more: {
            color: 'blue',
            cursor: 'pointer'
        }
    },

    tag: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '380px',
        height: '25px',
        paddingBottom: '1em',
        marginLeft: "-15px",
        zIndex: 99,
        animationName: raiseImageKeyframes,
        '@media (min-width: 520px)': {

        },
      },

      text: {
        textAlign: 'center'
      }

    }
};
