// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import type { Place } from 'flow/types';
import { primaryColor } from 'utils/colors';

import Heart from 'components/Reusable/Icons/Heart';
import Placeholder from 'images/places/emp.jpg';
import Tag from './Tag';

@Radium
export default class Card extends Component {
    static defaultProps = {
        hideDislike: false
    };

    props: {
        place: Place,
        favorite: boolean,
        hideDislike: bool,
        handleDislike: () => void,
        handleFavorite: () => void,
        handleMore: () => void
    };

    state: void;

    render() {
        const { place, favorite, hideDislike, handleDislike, handleFavorite } = this.props;

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
                        {!hideDislike ? <div onClick={handleDislike}>I don't like this</div> : null}
                        <Link to={`/place/${place.id}`}>
                            <div style={STYLES.cardActions.more}>...more</div>
                        </Link>
                    </div>
                </div>

                <div style={STYLES.cardImage.container}>
                    <img style={STYLES.cardImage.main} src={place.image} />
                    <div style={STYLES.tag.main}>
                        <Tag text={place.categories[0].name} />
                    </div>
                </div>
            </div>
        );
    }

    truncateName(name: string) {
        return name.length >= 50 ? `${name.substring(0, 48)}...` : name;
    }
}

const STYLES = {
    container: {
        position: 'relative',
        height: '350px',
        marginTop: '75px',
        marginBottom: '80px',
        marginLeft: '15px',
        transition: 'height 1s ease-out',
        '@media (min-width: 520px)': {
            height: '450px',
        },
    },

    cardImage: {
        get container() {
            return {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '250px',
                height: '325px',
                transition: 'height 1s ease-out, width 1s ease-out',
                animation: 'x 1s ease-in-out 0.5s 1 normal forwards',
                animationName: this.raiseImageKeyframes,
                '@media (min-width: 520px)': {
                    width: '320px',
                    height: '380px'
                },
            };
        },

        raiseImageKeyframes: Radium.keyframes({
            '0%': {
                transform: 'translateY(0)',
                boxShadow: '0 0 0 0 rgba(0,0,0,0.5)',
            },

            '100%': {
                transform: 'translateY(-70px)',
                boxShadow: '0px 13px 20px -4px rgba(0,0,0,0.5)',
            }
        }, 'raiseImage'),

        main: {
            transition: 'width 1s ease-out',
            width: '700px',
            '@media (min-width: 520px)': {
                width: '900px',
            },
        }
    },

    cardText: {
        get container() {
            return {
                position: 'absolute',
                top: -20,
                left: -10,
                height: '300px',
                width: '280px',
                boxShadow: '3px 8px 12px #888888',
                background: 'white',
                opacity: 0,
                /* revisit */
                transition: 'all 1s ease-out',
                animation: 'x 0.7s ease-in-out 0.8s 1 normal forwards',
                animationName: this.lowerTextKeyframes,
                '@media (min-width: 520px)': {
                    top: -55,
                    left: -7.5,
                    height: '450px',
                    width: '335px',
                },
            };
        },

        lowerTextKeyframes: Radium.keyframes({
            '0%': {
                transform: 'translateY(0)',
                opacity: 0
            },

            '50%': {
                opacity: 0.3
            },

            '100%': {
                transform: 'translateY(45px)',
                opacity: 1
            }
        }, 'lowerText'),

        text: {
            position: 'absolute',
            top: 185,
            left: 20,
            color: 'grey',
            /* revisit */
            transition: 'all 1s ease-out',
            '@media (min-width: 520px)': {
                top: 335,
            }
        },

        placeName: {
            fontSize: '21px'
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
        get main() {
            return {
                opacity: 0,
                animation: 'x .75s ease-in-out 1.25s 1 normal forwards',
                animationName: this.fadeTagIn
            };
        },

        fadeTagIn: Radium.keyframes({
            '0%': {
                opacity: 0
            },

            '100%': {
                opacity: 1
            }
        }, 'fadeTagIn')
    }
};
