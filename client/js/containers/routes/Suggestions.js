// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import FlipMove from 'react-flip-move';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import Card from 'reusable/Card/Card';

@Radium
class Suggestions extends Component {
    static defaultProps = {};
    props: {
        suggestions: Array<{
            name : string,
            id : string,
            location: {
                address: string
            },
            image: string
        }>,
        favorites: Array<{
            id: string
        }>,
        actions: Object
    };
    state: void;

    render() {
        const { actions, suggestions } = this.props;

        return (
            <div style={STYLES.container}>
                <FlipMove className="suggestionsContainer" style={STYLES.cardsContainer}>
                    {suggestions.slice(0, 2).map((place, index) => {
                        return (
                            <div key={place.id} enterAnimation="fade" leaveAnimation="fade">
                                <Card
                                    key={place.id}
                                    place={place}
                                    favorite={this.checkFavorited(place)}
                                    handleFavorite={() => this.handleFavorite(place, index)}
                                    handleDislike={() => actions.removeSuggestion(index)}
                                    handleMore={() => {}}
                                />
                            </div>
                        );
                    })}
                </FlipMove>
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
        width: '100%',
        minHeight: '100vh'
    },

    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '64px'
    },

    cardContainer: {
        transform: 'scale(1, 1)',
        '@media (min-width: 1200px)': {
            transform: 'scale(0.8, 0.8)',
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.get('user').toJS(),
        favorites: state.getIn(['user', 'favorites']).toJS(),
        suggestions: state.getIn(['suggestions', 'suggestions']).toJS(),
        location: ownProps.location
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            userActions,
            suggestionsActions,
        ), dispatch),
        routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
