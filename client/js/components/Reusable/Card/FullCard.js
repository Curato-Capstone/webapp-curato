// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';
import FontAwesome from 'react-fontawesome';
import smoothScroll from 'smoothscroll';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import type { Place } from 'flow/types';
import { primaryColor } from 'utils/colors';

import Heart from 'components/Reusable/Icons/Heart';
import Tag from './Tag';
import Map from './Map';

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

    componentDidMount() {
        setTimeout(() => smoothScroll(document.getElementById('top'), 1500));
    }

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
                            {this.renderMap(place.location.lat, place.location.lng, place.name)}
                            <div style={[STYLES.info.contact, STYLES.info.body]}>
                                <h2 style={STYLES.info.header}>Contact Info</h2>
                                {this.renderPhoneNumber(place.contact.formattedPhone)}
                                {this.renderTwitter(place.contact.twitter)}
                                {this.renderFourSquare(place.id)}
                                {this.renderWebsite(place.url)}
                            </div>
                            {this.renderHours(place.hours)}
                            {this.renderDescription(place.description)}
                        </div>
                    </div>
                    <span style={STYLES.cardText.shadow(loaded)}></span>

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
                        id="top"
                    />
                    <div style={STYLES.tag.main(loaded)}>
                        <Tag text={place.categories[0].name} />
                    </div>
                    <div style={STYLES.cardImage.arrow(loaded)}>
                        <FontAwesome
                            onClick={handleBack}
                            name="arrow-left"
                            size="2x"
                        />
                    </div>

                    <div key="fab" style={STYLES.cardImage.favoriteButton(loaded)}>
                        <FloatingActionButton
                            onClick={handleFavorite}
                            style={Radium.getState(this.state, 'fab', ':hover') ?
                                { transform: 'translateY(6px)' } : {}
                            }
                        >
                            <Heart active={favorite} styles={STYLES.cardImage.heart} />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }

    renderPhoneNumber(phoneNumber: string) {
        if (phoneNumber) {
            return (
                <div style={STYLES.info.link.container}>
                    <FontAwesome name="phone" size="2x" style={STYLES.info.link.phone} />
                    <div>{phoneNumber}</div>
                </div>
            );
        }
    }

    renderTwitter(twitterLink: string) {
        if (twitterLink) {
            return (
                <a href={`http://www.twitter.com/${twitterLink}`} style={STYLES.info.link.container}>
                    <FontAwesome name="twitter" size="2x" style={STYLES.info.link.twitter} />
                    <div>{twitterLink}</div>
                </a>
            );
        }
    }

    renderFourSquare(venueID: string) {
        return (
            <a href={`http://www.foursquare.com/v/${venueID}`} style={STYLES.info.link.container}>
                <FontAwesome name="foursquare" size="2x" style={STYLES.info.link.foursquare} />
                <div>Venue Page</div>
            </a>
        );
    }

    renderWebsite(website: string) {
        if (website) {
            return (
                <a href={website} style={STYLES.info.link.container}>
                    <FontAwesome name="globe" size="2x" style={STYLES.info.link.website} />
                    <div>Website</div>
                </a>
            );
        }
    }

    renderHours(hours: Object) {
        const hoursList = [['Monday', 'Mon'], ['Tuesday', 'Tue'], ['Wednesday', 'Wed'],
            ['Thursday', 'Thu'], ['Friday', 'Fri'], ['Saturday', 'Sat'], ['Sunday', 'Sun']];

        const dayLookup = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        };

        const dayNumber = new Date().getDay();

        if (hours) {
            return (
                <div style={STYLES.info.body}>
                <h2 style={STYLES.info.header}>Hours</h2>
                    {hoursList.map((day) => (
                        <div key={day[0]}>
                            <span style={STYLES.info.hour(dayLookup[day[0]] === dayNumber)}>
                                {day[0]}:
                            </span>
                            <span style={STYLES.info.hourText(hours[day[1]])}>
                                {hours[day[1]]}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
    }

    renderDescription(description: string) {
        if (description) {
            return (
                <div style={STYLES.info.body}>
                    <h2 style={STYLES.info.header}>Description</h2>
                    <div>{description}</div>
                </div>
            );
        }
    }

    renderMap(lat: number, lng: number, name: string) {
        return (
            <div style={STYLES.map}>
                <h2 style={STYLES.info.header}>Location</h2>
                <Map name={name} lat={lat} lng={lng} />
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

const STYLES = {
    container: (loaded) => ({
        position: 'relative',
        height: '450px',
        fontWeight: '300',
        animation: 'x 1s ease-in-out 1s 1 normal forwards',
        animationName: loaded ? STYLES.expandContainerAnimation : null,
    }),

    expandContainerAnimation: Radium.keyframes({
        '0%': {},
        '100%': { height: 'calc(100% - 140px)' }
    }),

    cardImage: {
        container: (loaded) => ({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '320px',
            height: '380px',
            backgroundColor: 'white',
            boxShadow: '0px 13px 20px -4px rgba(0,0,0,0.5)',
            animation: 'x 2s ease-in-out 0s 1 normal forwards',
            animationName: loaded ? STYLES.cardImage.raiseImageAnimation : null
        }),

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

        main: (loaded) => ({
            width: '900px',
            minWidth: '900px',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardImage.expandImageAnimation : null,
        }),

        expandImageAnimation: Radium.keyframes({
            '0%': { width: '900px' },
            '100%': { width: '100vw' }
        }),

        arrow: (loaded) => ({
            position: 'absolute',
            top: 10,
            left: 10,
            opacity: 0,
            color: primaryColor,
            cursor: 'pointer',
            transform: 'scale(1.2, 1.2)',
            animation: 'x 1s ease-in-out 2.5s 1 normal forwards',
            animationName: loaded ? STYLES.cardImage.fadeArrowIn : null
        }),

        fadeArrowIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 0.75 }
        }),

        favoriteButton: (loaded) => ({
            position: 'absolute',
            bottom: 0,
            transform: 'scale(0.6, 0.6) translateY(20px)',
            right: '2vw',
            opacity: 0,
            animation: 'x 1s ease-in-out 2.75s 1 normal forwards',
            animationName: loaded ? STYLES.cardImage.fadeFavoriteButton : null,
            ':hover': {}
        }),

        fadeFavoriteButton: Radium.keyframes({
            '0%': {},
            '100%': {
                opacity: 1,
                transform: 'scale(1, 1) translateY(-10px)',
            }
        }),

        heart: {
            width: '56px',
            marginTop: '3px',
            transform: 'scale(1.35, 1.35)'
        }
    },

    cardText: {
        container: (loaded) => ({
            position: 'absolute',
            top: -55,
            left: -7.5,
            height: '450px',
            width: '335px',
            background: 'white',
            opacity: 0,
            animation: 'x 1.7s ease-in-out 0.3s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.lowerTextAnimation : null
        }),

        lowerTextAnimation: Radium.keyframes({
            '0%': {
                transform: 'translateY(0)',
                opacity: 0
            },

            '50%': {
                transform: 'translateY(45px)',
                opacity: 1,
                height: '450px'
            },

            '100%': {
                transform: 'translateY(45px)',
                opacity: 1,
                width: '100%',
                height: 'calc(100% + 90px)',
            }
        }),

        shadow: (loaded) => ({
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '5px',
            width: '100%',
            boxShadow: '3px 8px 12px #888888',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.fadeShadow : null
        }),

        fadeShadow: Radium.keyframes({
            '0%': {},
            '100%': { opacity: 0 }
        }),

        text: (loaded) => ({
            position: 'absolute',
            top: 0,
            left: 20,
            marginRight: '12px',
            marginBottom: '30px',
            color: 'grey',
            width: 'calc(100% - 20px)',
            transform: 'translateY(335px)',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.moveCardTextAnimation : null
        }),

        moveCardTextAnimation: Radium.keyframes({
            '0%': { transform: 'translateY(335px)' },

            '100%': { transform: 'translateY(150px)' }
        }),

        placeName: (loaded) => ({
            fontSize: '20px',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.placeNameSizingAnimation : null
        }),

        placeNameSizingAnimation: Radium.keyframes({
            '0%': { },
            '100%': { fontSize: 'calc(2.5vw + 16px)' }
        }),

        address: (loaded) => ({
            color: primaryColor,
            fontSize: '17px',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardText.addressSizingAnimation : null
        }),

        addressSizingAnimation: Radium.keyframes({
            '0%': { },
            '100%': { fontSize: 'calc(1vw + 16px)' }
        })
    },

    cardActions: {
        container: (loaded) => ({
            position: 'absolute',
            bottom: 5,
            left: -10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            fontSize: '14px',
            animation: 'x 1s ease-in-out 1s 1 normal forwards',
            animationName: loaded ? STYLES.cardActions.hideActionsAnimation : null,
        }),

        hideActionsAnimation: Radium.keyframes({
            '0%': { opacity: 1 },
            '100%': { opacity: 0, display: 'none' }
        }),

        dislike: {
            cursor: 'pointer',
            color: '#f44336',
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
            animation: 'x .75s ease-in-out 2s 1 normal forwards',
            animationName: loaded ? STYLES.tag.fadeTagIn : null
        }),

        fadeTagIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        })
    },

    info: {
        container: (loaded) => ({
            display: 'flex',
            flexWrap: 'wrap',
            opacity: 0,
            animation: 'x 1s ease-in-out 1.75s 1 normal forwards',
            animationName: loaded ? STYLES.info.fadeInfoIn : null
        }),

        fadeInfoIn: Radium.keyframes({
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        }),

        header: {
            color: primaryColor,
            fontWeight: 400
        },

        body: {
            marginBottom: '16px',
            marginRight: '75px'
        },

        contact: {
            display: 'flex',
            flexDirection: 'column',
        },

        link: {
            container: {
                display: 'inline-flex',
                alignItems: 'center',
            },

            phone: {
                color: '',
                width: '36px'
            },

            twitter: {
                color: '#019FE9',
                width: '36px'
            },

            foursquare: {
                color: '#F94876',
                width: '36px'
            },

            website: {
                color: 'green',
                width: '36px'
            }
        },

        hour: (isToday) => ({
            width: '105px',
            display: 'inline-block',
            fontWeight: isToday ? '600' : '400',
            marginBottom: '1px',
            fontStyle: isToday ? 'italic' : '',
            // textDecoration: isToday ? 'underline' : ''
        }),

        hourText: (text) => ({
            color: text === 'Closed' ? '#c62828' : '#2E7D32'
        })
    },

    map: {
        width: '100%',
        height: '400px',
        paddingBottom: '30px',
        marginBottom: '50px'
    }
};
