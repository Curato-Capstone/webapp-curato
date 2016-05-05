// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent-bluebird-promise';

import * as globalActions from 'modules/global';

import FullCard from 'components/Reusable/Card/FullCard';

const place = {
    name: 'Pike Place Market',
    location: { address: '1234 Street Ave., Seattle, WA', formattedAddress: ["719 S King St", "Seattle, WA 98104",
"United States"] },
    image: require('images/places/pike_place_market.jpg'),
    id: '125',
    categories: [{ name: 'Shop' }],
    hours: {
        isOpen: false,
        status: 'Closed until 10:00 AM'
    },
    contact: {
        formattedPhone: '(206) 623-5124',
        twitter: 'wingluke'
    }
};

@Radium
class Place extends Component {
    static defaultProps = {};
    props: {};

    state = { place: null };
    state : {};

    componentWillMount() {
        const { actions } = this.props;

        // actions.setLoading(true);
        // request.get('')
    }

    render() {
        const {  } = this.props;

        return (
            <div style={STYLES.container}>
                <FullCard
                    key={place.id}
                    place={place}
                    favorite
                    handleFavorite={() => {}}
                />
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '700px',
        width: '100%'
    }
};

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            globalActions,
        ), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
