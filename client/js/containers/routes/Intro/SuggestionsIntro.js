// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { user as userActions, suggestions as suggestionsActions } from 'modules/index';

import { primaryColor } from 'utils/colors';

import Header from 'components/Intro/Header';
import Card from 'reusable/Card/Card';
import Button from 'reusable/Button/Button';
import Dots from 'reusable/Dots/Dots';

@Radium
class Suggestions extends Component {
    static defaultProps = {};
    props: {
        actions: Object,
        favorites: Array<Object>,
        suggestions: Array<Object>
    };
    state = { suggestionNum: 0 };
    state : { suggestionNum: number };

    render() {
        const { actions, suggestions } = this.props;
        const { suggestionNum } = this.state;

        const place = suggestions[suggestionNum];
        const items = suggestions.map((suggestion, index) => {
            return {
                name: suggestion.id,
                handleClick: () => this.setState({ suggestionNum: index })
            };
        });

        return (
            <div style={STYLES.container}>
                <Header text="Your Suggestions!" />
                <div style={STYLES.text}>
                    These are the suggestions we came up with!
                    If you like it, tap on the heart to add it to
                    your favorites. If you don't, tap on "I don't like this",
                    and you won't see it suggested again. We use this information
                    to help give you even better suggestions in the future!
                </div>
                <div style={STYLES.cardContainer}>
                    { suggestions.length ?
                        <div style={STYLES.card} key={place.id}>
                            <Card
                                place={place}
                                favorite={this.checkFavorited(place)}
                                handleFavorite={() => this.handleFavorite(place)}
                                handleDislike={() => actions.removeSuggestion(suggestionNum)}
                                handleMore={() => {}}
                            />
                        </div> : this.renderEmpty()
                    }
                    <div style={STYLES.dots.container}>
                        <FontAwesome
                            name="arrow-left"
                            size="2x"
                            style={{
                                ...STYLES.dots.leftArrow,
                                ...STYLES.dots.arrow(suggestionNum === 0)
                            }}
                            onClick={() => this.setState({ suggestionNum: suggestionNum - 1 })}
                        />
                        <Dots
                            items={items}
                            active={suggestionNum}
                        />
                        <FontAwesome
                            name="arrow-right"
                            size="2x"
                            style={{
                                ...STYLES.dots.rightArrow,
                                ...STYLES.dots.arrow(suggestionNum === 2)
                            }}
                            onClick={() => this.setState({ suggestionNum: suggestionNum + 1 })}
                        />
                    </div>
                </div>
                <div style={STYLES.buttonContainer}>
                    <Link to="/intro/signup">
                        <Button label="One Last Step!" type="primary" />
                    </Link>
                </div>
            </div>
        );
    }

    checkFavorited(place) {
        const { favorites } = this.props;

        for (let i = 0; i < favorites.length; i ++) {
            if (favorites[i] === place.id) {
                return true;
            }
        }

        return false;
    }

    handleFavorite(place) {
        if (this.checkFavorited(place)) {
            this.props.actions.removeFavoriteIntro(place.id);
        } else {
            this.props.actions.addFavorite(place.id);
        }
    }

    renderEmpty() {
        return (
            <div style={STYLES.empty.text} key="empty">
                <p>
                    Didn't like any of our suggestions?
                    We'll try harder next time!
                </p>
                <p>
                    Maybe try changing your
                    <Link to="/intro/preferences" style={STYLES.empty.link}> preferences</Link>!
                </p>
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        height: '420px',
        transform: 'scale(0.9, 0.9) translateY(-30px)',
        '@media (min-width: 520px)': {
            height: '500px'
        },
    },

    text: {
        fontSize: '12px',
        margin: '24px',
        textAlign: 'center',
        '@media (min-width: 520px)': {
            fontSize: '15px'
        },
    },

    buttonContainer: {
        // position: 'absolute',
        // bottom: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },

    dots: {
        container: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
        },

        arrow: (disabled: bool) => ({
            color: disabled ? 'grey' : primaryColor,
            pointerEvents: disabled ? 'none' : '',
            cursor: disabled ? '' : 'pointer'
        }),

        leftArrow: {
            // marginRight: '5px'
        },

        rightArrow: {
            color: primaryColor,
            marginLeft: '16px'
        }
    },

    empty: {
        text: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '16px',
            textAlign: 'center',
            margin: '30px',
            color: 'grey',
            '@media (min-width: 520px)': {
                fontSize: '20px',
            }
        },

        link: {
            color: primaryColor,
            fontWeight: 'bold'
        }
    }
};

function mapStateToProps(state) {
    const places =  state.get('places').toJS();

    return {
        favorites: state.getIn(['user', 'favorites']).toJS(),
        suggestions: state.getIn(['suggestions', 'suggestions']).toJS().map((id) => places[id]),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({ ...userActions, ...suggestionsActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
