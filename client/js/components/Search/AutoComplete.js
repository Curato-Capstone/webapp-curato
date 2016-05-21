// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FlipMove from 'react-flip-move';

import { primaryColor, secondaryColor } from 'utils/colors';

@Radium
export default class SearchBar extends Component {
    static defaultProps = {};
    props: {
        show: boolean,
        handleResultClick: () => void,
        selected: number,
        results: Array<string>
    };
    state : void;

    render() {
        const { show, results } = this.props;

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
        return results.map((result, index) => {
            return (
                <div
                    key={result}
                    style={STYLES.result(this.props.selected === index)}
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
        height: results.length && show ? results.length * 28 + 10 : 0,
        opacity: results.length && show ? 1 : 0,
        transform: 'translateY(5px)',
        padding: results.length && show ? '10px 0' : '',
        boxShadow: '0px 2px 5px 2px rgba(211,211,211,0.75)',
        transition: 'height 0.5s ease-in-out, padding 0.5s ease-in-out, opacity 0.5s ease-in-out'
    }),

    result: (selected) => ({
        height: '20px',
        padding: '6px 5px',
        cursor: 'pointer',
        opacity: selected ? 0.5 : 1,
        backgroundColor: selected ? '#d3d3d3' : '',
        ':hover': {
            opacity: '0.5',
            backgroundColor: '#d3d3d3'
        }
    })
};
