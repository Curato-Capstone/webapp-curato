import React, { Component } from 'react';
import Radium from 'radium';

import SearchBar from 'components/Search/Searchbar';
import Button from 'components/Reusable/Button/Button';
@Radium
export default class Search extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.searchBarContainer}>
                    <SearchBar />
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
        transform: 'translateY(-10px)',
        opacity: 0
    },

    '50%': {
        opacity: 0.3
    },

    '100%': {
        transform: 'translateY(25px)',
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
