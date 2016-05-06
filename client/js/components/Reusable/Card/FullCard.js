// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';
import FontAwesome from 'react-fontawesome';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
        handleBack: () => void
    };
    state = { loaded: false };
    state : { loaded: bool };

    render() {
        const { place, favorite, handleFavorite, handleBack } = this.props;
        const { loaded } = this.state;

        return (
            <div style={STYLES.container(loaded)}>
                <div style={STYLES.cardText.container(loaded)}>

                    <div style={STYLES.cardText.text(loaded)}>
                        <div style={STYLES.cardText.placeName(loaded)}>
                            {this.truncateName(place.name)}
                        </div>
                        <div style={STYLES.cardText.address(loaded)}>{place.location.address}</div>
                        <div style={STYLES.info.container(loaded)}>
                            <div>
                                <h3>Contact Info</h3>
                                <div>Phone: {place.contact.formattedPhone}</div>
                                {this.renderTwitter(place.contact.twitter)}
                                {this.renderFourSquare(place.id)}
                            </div>
                            {this.renderHours()}
                        </div>
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
                    <div style={STYLES.cardImage.arrow(loaded)}>
                        <FontAwesome
                            onClick={handleBack}
                            name="long-arrow-left"
                            size="2x"
                        />
                    </div>

                    <div style={STYLES.cardImage.favoriteButton(loaded)}>
                        <FloatingActionButton>
                            <Heart active={favorite} styles={STYLES.cardImage.heart} />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }

    renderTwitter(twitterLink: string) {
        return (
            <a href={`http://www.twitter.com/${twitterLink}`} style={STYLES.info.twitter.container}>
                <FontAwesome name="twitter" size="2x" style={STYLES.info.twitter.icon} />
                <div>{twitterLink}</div>
            </a>
        );
    }

    renderFourSquare(venueID: string) {
        return (
            <div>
                <a href={`http://www.foursquare.com/${venueID}`} style={STYLES.info.foursquare.container}>
                    <FontAwesome name="foursquare" size="2x" style={STYLES.info.foursquare.icon} />
                    <div>Venue Page</div>
                </a>
            </div>
        )
    }

    renderHours() {
        const { place } = this.props;

        if (place.hours) {
            return (
                <div>
                    <h3>Hours</h3>
                    <div></div>
                </div>
            );
        }
    }

    truncateName(name: string) {
        return name.length >= 50 ? `${name.substring(0, 48)}...` : name;
    }

    @autobind
    handleImageLoad() {
        this.setState({ loaded: true });
    }
}

const STYLES = {
    container: (loaded) => {
        return {
            position: 'relative',
            height: '450px',
            transition: 'height 1s ease-out',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.expandContainerAnimation : null,
        }
    },

    expandContainerAnimation: Radium.keyframes({
        '0%': {},
        '100%': { height: 'calc(100% - 140px)' }
    }),

    cardImage: {
        container: (loaded) => {
            return {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '320px',
                height: '380px',
                backgroundColor: 'white',
                willChange: 'height, width, transform',
                transition: 'height 1s ease-out, width 1s ease-out',
                animation: 'x 2s ease-in-out 0s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.raiseImageAnimation : null
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
        }),

        main: (loaded) => {
            return {
                transition: 'width 1s ease-out',
                width: '900px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.expandImageAnimation : null,
            };
        },

        expandImageAnimation: Radium.keyframes({
            '0%': { width: '900px' },
            '100%': { width: '100%' }
        }),

        arrow: (loaded) => {
            return {
                position: 'absolute',
                top: 10,
                left: 10,
                opacity: 0,
                color: '#d3d3d3',
                cursor: 'pointer',
                transform: 'scale(1.2, 1.75)',
                animation: 'x 1s ease-in-out 2.5s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.fadeArrowIn : null
            };
        },

        fadeArrowIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 0.65 }
        }),

        favoriteButton: (loaded) => {
            return {
                transform: 'scale(0.75, 0.75)',
                position: 'absolute',
                bottom: 10,
                right: 10,
                opacity: 0,
                animation: 'x 1s ease-in-out 2.5s 1 normal forwards',
                animationName: loaded ? STYLES.cardImage.fadeFavoriteButton : null
            };
        },

        fadeFavoriteButton: Radium.keyframes({
            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 1
            }
        }),

        heart: {
            width: '56px',
            transform: 'scale(1.25, 1.25)'
        }
    },

    cardText: {
        container: (loaded) => {
            return {
                position: 'absolute',
                top: -55,
                left: -7.5,
                height: '450px',
                width: '335px',
                boxShadow: '3px 8px 12px #888888',
                background: 'white',
                opacity: 0,
                transition: 'all 1s ease-out',
                animation: 'x 1.7s ease-in-out 0.3s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.lowerTextAnimation : null
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
                height: 'calc(100% + 90px)',
            }
        }),

        text: (loaded) => {
            return {
                position: 'absolute',
                top: 0,
                left: 20,
                color: 'grey',
                transform: 'translateY(335px)',
                transition: 'transform 1s ease-out',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.moveCardTextAnimation : null
            };
        },

        moveCardTextAnimation: Radium.keyframes({
            '0%': { transform: 'translateY(335px)' },

            '100%': { transform: 'translateY(150px)' }
        }),

        placeName: (loaded) => {
            return {
                fontSize: '20px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.placeNameSizingAnimation : null
            };
        },

        placeNameSizingAnimation: Radium.keyframes({
            '0%': { },
            '100%': { fontSize: 'calc(2.5vw + 16px)' }
        }),

        address: (loaded) => {
            return {
                color: primaryColor,
                fontSize: '17px',
                animation: 'x 1s ease-in-out 1s 1 normal forwards',
                animationName: loaded ? STYLES.cardText.addressSizingAnimation : null
            };
        },

        addressSizingAnimation: Radium.keyframes({
            '0%': { },
            '100%': { fontSize: 'calc(1vw + 16px)' }
        })
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
            '0%': { opacity: 1 },
            '100%': { opacity: 0 }
        }),

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
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        })
    },

    info: {
        container: (loaded) => {
            return {
                opacity: 0,
                animation: 'x 1s ease-in-out 1.75s 1 normal forwards',
                animationName: loaded ? STYLES.info.fadeInfoIn : null
            };
        },

        fadeInfoIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        }),

        twitter: {
            container: {
                display: 'inline-flex',
                alignItems: 'center'
            },

            icon: {
                color: '#019FE9',
                width: '32px'
            }
        },

        foursquare: {
            container: {
                display: 'inline-flex',
                alignItems: 'center'
            },

            icon: {
                color: '#F94876',
                width: '32px'
            }
        }
    },
};
