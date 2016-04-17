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
                    <Button
                        label="Random Suggestions!"
                        type="primary"
                        style={STYLES.randomButton}
                    />
                </div>
            </div>
        );
    }
}

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
        flexDirection: 'column'
    },

    randomButton: {
        marginTop: '36px'
    }
};
