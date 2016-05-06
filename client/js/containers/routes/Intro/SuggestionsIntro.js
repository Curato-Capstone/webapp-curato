// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import Header from 'components/Intro/Header';
import Card from 'reusable/Card/Card';
import Button from 'reusable/Button/Button';

@Radium
class Suggestions extends Component {
    static defaultProps = {};
    props: {
        actions: Object,
        favorites: Array<Object>,
        suggestions: Array<Object>
     };
    state: void;

    componentWillMount() {
        // this.props.actions.getSuggestionsNoAccount();
    }

    render() {
        const { actions, suggestions } = this.props;

        return (
            <div style={STYLES.container}>
                <Header text="Your Suggestions!" />
                <div style={STYLES.text}>These are the suggestions we came up with!</div>
                <div style={STYLES.cardContainer}>
                    {suggestions.slice(0, 3).map((place, index) => {
                        return (
                            <div style={STYLES.card} key={place.id}>
                                <Card
                                    place={place}
                                    favorite={this.checkFavorited(place)}
                                    handleFavorite={() => this.handleFavorite(place, index)}
                                    handleDislike={() => actions.removeSuggestion(index)}
                                    handleMore={() => {}}
                                />
                            </div>
                        );
                    })}
                </div>
                <div style={STYLES.buttonContainer}>
                    <Link to="/intro/signup">
                        <Button label="I'm ready to sign up!" type="primary" />
                    </Link>
                </div>
            </div>
        );
    }

    checkFavorited(place) {
        const { favorites } = this.props;

        for (let i = 0; i < favorites.length; i ++) {
            if (favorites[i].id === place.id) {
                return true;
            }
        }

        return false;
    }

    handleFavorite(place, index) {
        if (this.checkFavorited(place)) {
            this.props.actions.removeFavorite(index);
        } else {
            this.props.actions.addFavorite(place);
        }
    }
}

const STYLES = {
    container: {
        height: '100%',
        position: 'relative',
    },

    cardContainer: {
        display: 'flex',
        overflow: 'scroll',
        overflowY: 'hidden',
        height: '350px',
        alignItems: 'center',
        '@media (min-width: 520px)': {
            height: '450px'
        },

    },

    card: {
        transform: 'scale(0.7, 0.7)'
    },

    text: {
        margin: '24px',
        textAlign: 'center'
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
};

function mapStateToProps(state) {
    return {
        favorites: state.getIn(['user', 'favorites']).toJS(),
        suggestions: state.getIn(['suggestions', 'suggestions']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign({}, userActions, suggestionsActions), dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
