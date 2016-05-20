// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FlipMove from 'react-flip-move';

import autoCompleteTrie from 'utils/trie';
import { primaryColor, secondaryColor } from 'utils/colors';

@Radium
export default class SearchBar extends Component {
    static defaultProps = { searchTerm: '' };
    props: {
        searchTerm: string,
        show: boolean,
        handleResultClick: () => void,
    };
    state : void;

    render() {
        const { searchTerm, show } = this.props;
        const results = autoCompleteTrie.find(searchTerm) || [];

        return (
            <div style={STYLES.containerWrapper}>
                <FlipMove
                    enterAnimation="accordianVertical"
                    leaveAnimation="accordianVertical"
                    style={STYLES.container(results, show)}
                >
                    {this.renderResults(results)}
                </FlipMove>
            </div>
        );
    }

    renderResults(results: Array<string>) {
        return results.map((result) => {
            return (
                <div
                    key={result}
                    style={STYLES.result}
                    onClick={() => this.props.handleResultClick(result)}
                >
                    {result}
                </div>
            );
        });
    }
}

const STYLES = {
    containerWrapper: {
        width: 'calc(100% - 50px)',
        '@media (min-width: 520px)': {
            width: 'calc(100% - 70px)'
        }
    },

    container: (results, show) => ({
        width: '100%',
        backgroundColor: 'white',
        height: show ? results.length * 25 + 10 : 0,
        opacity: results.length && show ? 1 : 0,
        transform: 'translateY(5px)',
        padding: '10px 0',
        transition: 'height 0.5s ease-in-out, opacity 0.5s ease-in-out'
    }),

    result: {
        height: '20px',
        padding: '5px 5px',
        cursor: 'pointer',
        ':hover': {
            opacity: '0.5',
            backgroundColor: '#d3d3d3'
        }
    }
};
