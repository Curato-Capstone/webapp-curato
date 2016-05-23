// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';
import FontAwesome from 'react-fontawesome';
import autoCompleteTrie from 'utils/trie';

import { primaryColor, secondaryColor } from 'utils/colors';

import AutoComplete from './AutoComplete';

@Radium
export default class SearchBar extends Component {
    static defaultProps = {
        handleChange: () => {},
        handleSubmit: () => {}
    };

    props: {
        value: string,
        handleChange: (value: string) => void,
        handleSubmit: () => void,
    };

    state = {
        clicking: false,
        enter: false,
        selected: -1,
        results: [],
        savedValue: ''
    };
    state : {
        clicking: boolean,
        enter: boolean,
        selected: number,
        results: Array<string>,
        savedValue: string
    };

    render() {
        const { value } = this.props;
        const { clicking, selected, results } = this.state;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.searchContainer}>
                    <input
                        type="text"
                        key="searchInput"
                        value={value}
                        style={STYLES.input}
                        placeholder={'Search for something to do!'}
                        onChange={(e) => this.handleChangeUpdateAuto(e.target.value)}
                        onKeyDown={(e) => this.handleKeyPress(e, results)}
                    />
                    <div
                        style={STYLES.iconContainer(clicking)}
                        onClick={this.search}
                    >
                        <FontAwesome
                            name="search"
                            size="2x"
                            style={STYLES.icon}
                        />
                    </div>
                </div>
                <AutoComplete
                    searchTerm={value.toLowerCase()}
                    show={Radium.getState(this.state, 'searchInput', ':focus')}
                    handleResultClick={(v) => this.handleChangeUpdateAuto(v)}
                    selected={selected}
                    results={results}
                />
            </div>
        );
    }

    @autobind
    handleKeyPress(e: Object, results: Array<string>): void {
        const { value } = this.props;
        const { selected, savedValue } = this.state;

        if (e.key === 'Enter') {
            this.search();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();

            if (selected + 1 !== results.length) {
                if (selected === -1) {
                    this.setState({ selected: selected + 1, savedValue: value });
                } else {
                    this.setState({ selected: selected + 1 });
                }

                this.handleChangeNoUpdateAuto(results[selected + 1]);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();

            if (selected - 1 !== -2) {
                this.setState({ selected: selected - 1 });
                this.handleChangeNoUpdateAuto(results[selected - 1] || savedValue || value);
            }
        } else {
            this.setState({ retainResults: false, selected: -1 });
        }
    }

    handleChangeUpdateAuto(value: string) {
        this.props.handleChange(value);
        this.setState({ results: autoCompleteTrie.find(value) || [] });
    }

    handleChangeNoUpdateAuto(value: string) {
        this.props.handleChange(value);
    }

    @autobind
    search() {
        this.setState({ clicking: true });

        // wait 250ms for cool animation
        setTimeout(() => {
            this.setState({ clicking: false });
            setTimeout(() => this.props.handleSubmit(), 300);
        }, 300);
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: '700px',
    },

    searchContainer: {
        display: 'flex',
        width: '100%'
    },

    input: {
        height: '50px',
        width: '100%',
        paddingLeft: '18px',
        fontSize: '15px',
        fontFamily: 'Montserrat',
        fontWeight: '300',
        boxShadow: '0px 2px 5px 2px rgba(211,211,211,0.75)',
        ':focus': {},
        '@media (min-width: 520px)': {
            height: '70px',
            fontSize: '23px',
        }
    },

    iconContainer: (clicking: boolean) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '65px',
        height: '52px',
        cursor: 'pointer',
        boxShadow: '-6px 0px 8px 2px rgba(211,211,211,0.75)',
        backgroundColor: primaryColor,
        transform: clicking ? 'translate(1.5px, 10px)' : 'translate(0px, -3px)',
        transition: 'transform 0.25s ease-in',
        ':hover': {
            transform: clicking ? 'translate(1.5px, 10px)' : 'translate(0px, -1px)'
        },
        '@media (min-width: 520px)': {
            width: '80px',
            height: '72px',
        }
    }),

    icon: {
        color: secondaryColor,
        textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)'
    }
};
