// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { primaryColor } from 'utils/colors';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import Card from 'reusable/Card/Card';

@Radium
class Favorites extends Component {
    static defaultProps = {};
    props:{
        favorites: Array<
            {
                name : string,
                id : string,
                categories: Array<Object>,
                location: {
                    address: string
                },
                image: string
            }
        >
    };
    state: void;


    render() {
        const { favorites } = this.props;

        return (
            <div style={STYLES.container}>
                {favorites.map((place) => {
                    return (
                        <Card
                            key={place.id}
                            place={place}
                            favorite
                            hideDislike
                            handleFavorite={() => {}}
                            handleDislike={() => {}}
                            handleMore={() => {}}
                        />
                    );
                })}
                {this.renderEmptyState()}
            </div>
        );
    }

    renderEmptyState(): React.Element | void {
        const { favorites } = this.props;

        if (!favorites.length) {
            return (
                <div style={STYLES.empty}>
                    You don't have any favorites! Get some
                    <Link to="/" style={STYLES.suggestionsLink}> suggestions </Link>
                    to add some!
                </div>
            );
        }
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '72px',
        boxSizing: 'border-box'
    },

    empty: {
        fontSize: '18px',
        color: 'grey',
        textAlign: 'center',
        margin: 'auto 5px',
        paddingBottom: '120px',
        '@media (min-width: 520px)': {
            fontSize: '24px',
        },
    },

    suggestionsLink: {
        color: primaryColor,
        fontWeight: 'bold'
    }
};

function mapStateToProps(state) {
    return {
        favorites: state.get('user').toJS().favorites,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({
            ...userActions,
            ...suggestionsActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
