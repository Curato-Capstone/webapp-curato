// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

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
                            handleFavorite={() => {}}
                            handleDislike={() => {}}
                            handleMore={() => {}}
                        />
                    );
                })}
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '64px',
        minHeight: '100vh'
    }
};

function mapStateToProps(state) {
    return {
        favorites: state.get('user').toJS().favorites,
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
