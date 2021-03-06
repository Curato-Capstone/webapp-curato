// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { user as userActions, suggestions as suggestionsActions } from 'modules/index';
import type { Place } from 'flow/types';
import PlaceRecord from '../../models/Place';

import { primaryColor } from 'utils/colors';

import Card from 'reusable/Card/Card';

@Radium
class Favorites extends Component {
    static defaultProps = {};
    props:{
        favorites: Array<Place>
    };
    state: void;


    render() {
        const { favorites } = this.props;

        return (
            <div style={STYLES.container}>
                {favorites.map((place, index) => {
                    return (
                        <Card
                            key={place.id || index}
                            place={place}
                            favorite
                            hideDislike
                            handleFavorite={() => {}}
                            handleDislike={() => {}}
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
        paddingLeft: '40px',
        boxSizing: 'border-box',
        '@media (min-width: 520px)': {
            paddingLeft: '80px'
        }
    },

    empty: {
        fontSize: '18px',
        color: 'grey',
        textAlign: 'center',
        margin: 'auto 12px',
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
    const places =  state.get('places').toJS();

    return {
        favorites: state.get('user').toJS().favorites.map((id) => {
            if (places[id]) {
                return places[id];
            }

            return new PlaceRecord();
        })
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
