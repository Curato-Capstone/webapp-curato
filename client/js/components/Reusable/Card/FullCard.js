// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';

import type { Place } from 'flow/types';
import { primaryColor } from 'utils/colors';

import Heart from 'components/Reusable/Icons/Heart';
import Tag from './Tag';

@Radium
export default class FullCard extends Component {
    static defaultProps = {};
    props: {
        place: Place,
        favorite: boolean,
        handleFavorite: () => void,
    };
    state = { loaded: false };
    state : { loaded: bool };

    render() {
        const { place, favorite, handleFavorite } = this.props;
        const { loaded } = this.state;

        return (
            <div style={STYLES.container(loaded)}>
                <div style={STYLES.cardText.container(loaded)}>

                    <div style={STYLES.cardText.text(loaded)}>
                        <div style={STYLES.cardText.placeName(loaded)}>
                            {this.truncateName(place.name)}
                        </div>
                        <div style={STYLES.cardText.address(loaded)}>{place.location.address}</div>
                        {/*<div>{place.}</div>*/}
                    </div>

                    <div style={STYLES.cardActions.container(loaded)}>
                        <div onClick={handleFavorite}>
                            <Heart active={favorite} />
                        </div>

                        <div style={STYLES.cardActions.dislike}>
                            I don't like this
                        </div>

                        <div style={STYLES.cardActions.more}>...more</div>
                    </div>
                </div>

                <div style={STYLES.cardImage.container(loaded)}>
                    <img
                        style={STYLES.cardImage.main(loaded)}
                        src={place.image}
                        onLoad={this.handleImageLoad}
                    />
                    <div style={STYLES.tag.main(loaded)}>
                        <Tag text={place.categories[0].name} />
                    </div>
                </div>
            </div>
        );
    }

    truncateName(name: string) {
        return name.length >= 50 ? `${name.substring(0, 48)}...` : name;
    }

    @autobind
    handleImageLoad() {
        this.setState({ loaded: true });
    }
}

const revealInfoKeyframes = Radium.keyframes({
    '0%': {
        opacity: '0'
    },

    '100%': {
        opacity: '1'
    }
}, 'revealInfo');

// const STYLES = {
//     container: {
//         marginTop: '-75px',
//         marginBottom: '40px',
//         position: 'relative',
//         height: '450px',
//         animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
//         animationName: expandContainerKeyframes,
//     },
//
//     cardImage: {
//         container: {
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             overflow: 'hidden',
//             height: '400px',
//             width: '350px',
//             transition: 'all 1s ease-out',
//             animation: 'x 2s ease-in-out 0.5s 1 normal forwards',
//             animationName: raiseImageKeyframes,
//         },
//
//         main: {
//             // transition: 'all 1s ease-out',
//             width: '900px',
//             animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
//             animationName: expandImageKeyFrames,
//         }
//     },
//
//     cardText: {
//         container: {
//             boxShadow: '3px 8px 5px #888888',
//             height: '400px',
//             width: '380px',
//             marginLeft: '-15px',
//             background: 'white',
//             opacity: 0,
//             position: 'absolute',
//             animation: 'x 2s ease-in-out 0.5s 1 normal forwards',
//             animationName: lowerTextKeyframes,
//             // but it translates down 75px
//             top: 0,
//         },
//
//         text: {
//             position: 'absolute',
//             color: 'grey',
//             top: 250 + 20,
//             left: 20,
//             animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
//             animationName: moveCardTextKeyframes,
//         },
//
//         placeName: {
//             fontSize: '24px'
//         },
//
//         address: {
//             color: 'black'
//         }
//     },
//
//     cardActions: {
//         container: {
//             position: 'absolute',
//             bottom: 10,
//             display: 'flex',
//             alignItems: 'center',
//             width: '100%',
//             justifyContent: 'space-around'
//         },
//
//         more: {
//             color: 'blue'
//         }
//     },
//
//     hiddenInfo: {
//         marginTop: '15px',
//         opacity: 0,
//         animation: 'x 1s ease-in-out 1.5s 1 normal forwards',
//         animationName: revealInfoKeyframes,
//     }
// };

const STYLES = {
    container: (loaded) => {
        return {
            position: 'relative',
            height: '350px',
            transition: 'height 1s ease-out',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.expandContainerAnimation : null,
            '@media (min-width: 520px)': {
                height: '450px',
            },
        }
    },

    expandContainerAnimation: Radium.keyframes({
        '0%': {
        },

        '100%': {
            height: 'calc(100% - 100px)',
        }
    }, 'expandContainer'),

    cardImage: {
        container: (loaded) => {
            return {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '250px',
                height: '325px',
                backgroundColor: 'white',
                transition: 'height 1s ease-out, width 1s ease-out',
                animation: 'x 2s ease-in-out 0s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.raiseImageAnimation : null,
                '@media (min-width: 520px)': {
                    width: '320px',
                    height: '380px'
                },
            };
        },

        raiseImageAnimation: Radium.keyframes({
            '0%': {
                transform: 'translateY(0)',
            },
            '50%': {
                transform: 'translateY(-70px)',
                height: '380px',
                width: '320px',
            },
            '100%': {
                transform: 'translateY(-70px)',
                width: '100vw',
                height: '200px'
            }
        }, 'raiseImage'),

        main: (loaded) => {
            return {
                transition: 'width 1s ease-out',
                width: '700px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.expandImageAnimation : null,
                '@media (min-width: 520px)': {
                    width: '900px',
                }
            };
        },

        expandImageAnimation: Radium.keyframes({
            '0%': {
                width: '900px',
            },

            '100%': {
                width: '100%'
            }
        }, 'expandImage')
    },

    cardText: {
        container: (loaded) => {
            return {
                position: 'absolute',
                top: -40,
                left: -7.5,
                height: '370px',
                width: '275px',
                boxShadow: '3px 8px 12px #888888',
                background: 'white',
                opacity: 0,
                transition: 'all 1s ease-out',
                animation: 'x 1.7s ease-in-out 0.3s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.lowerTextAnimation : null,
                '@media (min-width: 520px)': {
                    top: -55,
                    left: -7.5,
                    height: '450px',
                    width: '335px',
                },
            };
        },

        lowerTextAnimation: Radium.keyframes({
            '0%': {
                transform: 'translateY(0)',
                opacity: 0
            },

            '50%': {
                transform: 'translateY(45px)',
                opacity: 1,
                left: -7.5,
                height: '450px'
            },

            '100%': {
                transform: 'translateY(45px)',
                boxShadow: 'none',
                opacity: 1,
                width: '100%',
                left: 0,
                height: '110%',
            }
        }, 'lowerText'),

        text: (loaded) => {
            return {
                position: 'absolute',
                top: 0,
                left: 20,
                color: 'grey',
                transform: 'translateY(265px)',
                /* revisit */
                transition: 'transform 1s ease-out',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.moveCardTextAnimation : null,
                '@media (min-width: 520px)': {
                    transform: 'translateY(335px)',
                }
            };
        },

        moveCardTextAnimation: Radium.keyframes({
            '0%': {
                transform: 'translateY(335px)',
            },

            '100%': {
                transform: 'translateY(150px)',
            }
        }, 'moveCardText'),

        placeName: (loaded) => {
            return {
                fontSize: '17px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.placeNameSizingAnimation : null,
                '@media (min-width: 520px)': {
                    fontSize: '20px'
                }
            };
        },

        placeNameSizingAnimation: Radium.keyframes({
            '0%': {
                fontSize: '20px',
            },

            '100%': {
                fontSize: '40px'
            }
        }),

        address: (loaded) => {
            return {
                color: primaryColor,
                fontSize: '15px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.addressSizingAnimation : null,
                '@media (min-width: 520px)': {
                    fontSize: '17px',
                }
            };
        },

        addressSizingAnimation: Radium.keyframes({
            '0%': {
                fontSize: '17px',
            },

            '100%': {
                fontSize: '28px'
            }
        }),
    },

    cardActions: {
        container: (loaded) => {
            return {
                position: 'absolute',
                bottom: 7.5,
                left: -10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
                fontSize: '14px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardActions.hideActionsAnimation : null,
            };
        },

        hideActionsAnimation: Radium.keyframes({
            '0%': {
                opacity: 1
            },

            '100%': {
                opacity: 0
            }
        }, 'moveCardText'),

        dislike: {
            cursor: 'pointer'
        },

        more: {
            color: 'blue',
            cursor: 'pointer'
        }
    },

    tag: {
        main: (loaded) => {
            return {
                opacity: 0,
                animation: 'x .75s ease-in-out 2s 1 normal forwards',
                animationName: loaded ? STYLES.tag.fadeTagIn : null
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
