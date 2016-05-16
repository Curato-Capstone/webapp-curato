// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent-bluebird-promise';
import { user as userActions, global as globalActions } from 'redux-curato';

import { routerActions } from 'react-router-redux';

import FullCard from 'components/Reusable/Card/FullCard';

@Radium
class Place extends Component {
    static defaultProps = {};
    props: {
        actions: Object,
        params: Object,
        suggestions: Array<Object>,
        favorites: Array<Object>
    };

    state = { place: null };
    state : { place: Object };

    componentWillMount() {
        const { actions, params, suggestions } = this.props;
        const id = params.id;

        actions.setLoading(true);
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].id === id) {
                this.setState({ place: suggestions[i] });
                actions.setLoading(false);
                return;
            }
        }
        request
            .get(`http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/place/${id}`)
            .then((res) => {
                actions.setLoading(false);
                this.setState({ place: res.body });
            });
    }

    render() {
        const { actions } = this.props;
        const { place } = this.state;

        return (
            <div style={STYLES.container}>
                {place ? <FullCard
                    key={place.id}
                    place={place}
                    favorite={this.checkFavorited(place)}
                    handleFavorite={() => this.handleFavorite(place, 0)}
                    handleBack={() => actions.goBack()}
                /> : null}
            </div>
        );
    }

    handleFavorite(place) {
        if (this.checkFavorited(place)) {
            this.props.actions.removeFavoriteThunk(place);
        } else {
            this.props.actions.addFavoriteThunk(place);
        }
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
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
    }
};

function mapStateToProps(state) {
    return {
        suggestions: state.getIn(['suggestions', 'suggestions']).toJS(),
        favorites: state.getIn(['user', 'favorites']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({
            ...userActions,
            ...globalActions,
            ...routerActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
