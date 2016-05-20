// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

import type { Place } from 'flow/types';
import { primaryColor } from 'utils/colors';

import Heart from 'components/Reusable/Icons/Heart';
import Tag from './Tag';

@Radium
export default class Card extends Component {
    static defaultProps = { hideDislike: false };

    props : {
        place: Place,
        favorite: boolean,
        hideDislike: bool,
        handleDislike: () => void,
        handleFavorite: () => void,
    };

    state = { loaded: false };
    state : { loaded: bool };

    render() {
        const { place, favorite, handleFavorite } = this.props;
        const { loaded } = this.state;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.cardText.container(loaded)}>

                    <div style={STYLES.cardText.text}>
                        <div style={STYLES.cardText.placeName}>
                            {this.truncateName(place.name)}
                        </div>
                        <div style={STYLES.cardText.address}>{place.location.address}</div>
                    </div>

                    <div style={STYLES.cardActions.container}>
                        <div onClick={handleFavorite}>
                            <Heart active={favorite} />
                        </div>

                        {this.renderDislike()}

                        <Link to={`/place/${place.id}`} style={STYLES.cardActions.more}>
                            ...more
                        </Link>
                    </div>
                </div>

                <div style={STYLES.cardImage.container(loaded)}>
                    <img
                        style={STYLES.cardImage.main}
                        src={place.image}
                        onLoad={() => this.setState({ loaded: true })}
                    />
                    {this.renderTag()}
                </div>
            </div>
        );
    }

    truncateName(name: string) {
        return name.length >= 50 ? `${name.substring(0, 48)}...` : name;
    }

    renderDislike() {
        if (!this.props.hideDislike) {
            return (
                <div style={STYLES.cardActions.dislike} onClick={this.props.handleDislike}>
                    I don't like this
                </div>
            );
        }
    }

    renderTag() {
        const { place } = this.props;

        if (place.categories.length) {
            return (
                <div style={STYLES.tag.main(this.state.loaded)}>
                    <Tag text={place.categories[0].name} />
                </div>
            );
        }
    }
}

const STYLES = {
    container: {
        position: 'relative',
        height: '350px',
        marginTop: '75px',
        fontWeight: '300',
        marginBottom: '80px',
        transition: 'height 0.5s ease-out',
        '@media (min-width: 520px)': {
            height: '450px',
        },
    },

    cardImage: {
        container: (loaded) => ({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '250px',
            height: '325px',
            backgroundColor: 'white',
            animation: 'x 1s ease-in-out 0s 1 normal forwards',
            animationName: loaded ? STYLES.cardImage.raiseImageAnimation : null,
            boxShadow: '0px 13px 20px -4px rgba(0,0,0,0.5)',
            '@media (min-width: 520px)': {
                width: '320px',
                height: '380px'
            },
        }),

        raiseImageAnimation: Radium.keyframes({
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-70px)' }
        }),

        main: {
            width: '700px',
            minWidth: '700px',
            '@media (min-width: 520px)': {
                width: '900px',
                minWidth: '900px'
            },
        }
    },

    cardText: {
        container: (loaded) => ({
            position: 'absolute',
            top: -40,
            left: -7.5,
            height: '370px',
            width: '275px',
            boxShadow: '3px 8px 12px #888888',
            background: 'white',
            opacity: 0,
            animation: 'x 0.7s ease-in-out 0.3s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.lowerTextAnimation : null,
            '@media (min-width: 520px)': {
                top: -55,
                left: -7.5,
                height: '450px',
                width: '335px',
            }
        }),

        lowerTextAnimation: Radium.keyframes({
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
        }),

        text: {
            position: 'absolute',
            top: 0,
            left: 20,
            color: 'grey',
            transform: 'translateY(265px)',
            '@media (min-width: 520px)': {
                transform: 'translateY(335px)',
            }
        },

        placeName: {
            fontSize: '17px',
            fontWeight: '400',
            '@media (min-width: 520px)': {
                fontSize: '20px'
            }
        },

        address: {
            color: primaryColor,
            fontSize: '15px',
            '@media (min-width: 520px)': {
                fontSize: '17px',
            }
        }
    },

    cardActions: {
        container: {
            position: 'absolute',
            bottom: 5,
            left: -10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            fontSize: '14px'
        },

        dislike: {
            color: '#f44336',
            cursor: 'pointer'
        },

        more: {
            color: 'blue',
            cursor: 'pointer',
            fontWeight: '400'
        }
    },

    tag: {
        main: (loaded) => ({
            opacity: 0,
            animation: 'x .75s ease-in-out .75s 1 normal forwards',
            animationName: loaded ? STYLES.tag.fadeTagIn : null
        }),

        fadeTagIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        })
    }
};
