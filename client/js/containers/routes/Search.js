// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as userActions from 'modules/user';
import * as suggestionsActions from 'modules/suggestions';

import SearchBar from 'components/Search/Searchbar';
import Button from 'components/Reusable/Button/Button';

@Radium
class Search extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { suggestions, actions } = this.props;
        
        return (
            <div style={STYLES.container}>
                <div style={STYLES.searchBarContainer}>
                    <SearchBar
                        value={suggestions.searchText}
                        handleChange={(e) => actions.changeSearchText(e.target.value)}
                    />
                    <div style={STYLES.randomButtonContainer}>
                        <Button
                            label="Random Suggestions!"
                            type="primary"
                            style={STYLES.randomButton}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const lowerSearchBarKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(-35px)',
        opacity: 0
    },

    '50%': {
        opacity: 0.3
    },

    '100%': {
        transform: 'translateY(0px)',
        opacity: 1
    }
}, 'lowerSearchBar');


const revealButtonKeyframes = Radium.keyframes({
    '0%': {
    },

    '100%': {
        opacity: 1
    }
}, 'revealButton');

const STYLES = {
    container: {
        width: '100%',
        height: '100vh',
        minHeight: '300px'
    },

    searchBarContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        animation: 'x .8s ease-in-out 0s 1 normal forwards',
        animationName: lowerSearchBarKeyframes,
    },

    randomButtonContainer: {
        opacity: 0,
        animation: 'x 1s ease-in-out 0.5s 1 normal forwards',
        animationName: revealButtonKeyframes,
    },

    randomButton: {
        marginTop: '36px',
    }
};

function mapStateToProps(state) {
    return {
        user: state.get('user').toJS(),
        suggestions: state.get('suggestions').toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(Object.assign(
            {},
            userActions,
            suggestionsActions
        ), dispatch),
        routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
