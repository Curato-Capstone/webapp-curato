// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent-bluebird-promise';

import * as globalActions from 'modules/global';
import { routerActions } from 'react-router-redux';

import FullCard from 'components/Reusable/Card/FullCard';

// const place = {
//     name: 'Pike Place Market',
//     location: { address: '1234 Street Ave., Seattle, WA', formattedAddress: ["719 S King St", "Seattle, WA 98104",
// "United States"] },
//     image: require('images/places/pike_place_market.jpg'),
//     id: '125',
//     categories: [{ name: 'Shop' }],
//     hours: {
//         isOpen: false,
//         status: 'Closed until 10:00 AM'
//     },
//     contact: {
//         formattedPhone: '(206) 623-5124',
//         twitter: 'wingluke'
//     }
// };

@Radium
class Place extends Component {
    static defaultProps = {};
    props: {};

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
        const { actions, routerActions, suggestions } = this.props;
        const { place } = this.state;

        return (
            <div style={STYLES.container}>
                {place ? <FullCard
                    key={place.id}
                    place={place}
                    favorite
                    handleFavorite={() => {}}
                    handleBack={() => actions.goBack()}
                /> : null}
            </div>
        );
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

function mapStateToProps(state, ownProps) {
    return {
        suggestions: state.getIn(['suggestions', 'suggestions']).toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            globalActions,
            routerActions
        ), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
