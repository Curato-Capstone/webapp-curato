// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { user as userActions, suggestions as suggestionsActions } from 'modules/index';

import SearchBar from 'components/Search/SearchBar';
import Button from 'components/Reusable/Button/Button';

@Radium
class Search extends Component {
    static defaultProps = {};
    props: { searchText: string, actions: Object };
    state: void;

    render() {
        const { searchText, actions } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.searchBarContainer}>
                    <SearchBar
                        value={searchText}
                        handleChange={actions.changeSearchText}
                        handleSubmit={() => {
                            actions.getSuggestions()
                                .then(() => actions.push('/suggestions'));
                        }}
                    />
                    <div style={STYLES.randomButtonContainer}>
                        <Button
                            label="Random Suggestions!"
                            type="primary"
                            handleClick={() => {
                                actions.getSuggestions({ random: true })
                                    .then(() => actions.push('/suggestions'));
                            }}
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
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        paddingLeft: '40px',
        boxSizing: 'border-box',
        '@media (min-width: 520px)': {
            paddingLeft: '80px'
        }
    },

    searchBarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '40vh',
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        opacity: 0,
        animation: 'x .8s ease-in-out 0s 1 normal forwards',
        animationName: lowerSearchBarKeyframes,
    },

    randomButtonContainer: {
        opacity: 0,
        animation: 'x 1s ease-in-out 0.5s 1 normal forwards',
        animationName: revealButtonKeyframes,
    },

    randomButton: {
        marginTop: '24px'
    }
};

function mapStateToProps(state) {
    return {
        searchText: state.get('suggestions').toJS().searchText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({
            ...userActions,
            ...suggestionsActions,
            ...routerActions
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
