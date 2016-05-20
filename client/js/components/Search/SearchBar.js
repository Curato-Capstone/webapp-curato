// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';
import FontAwesome from 'react-fontawesome';

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

    state = { clicking: false, enter: false, };
    state : { clicking: boolean, enter: boolean };

    render() {
        const { value, handleChange } = this.props;
        const { clicking } = this.state;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.searchContainer}>
                    <input
                        type="text"
                        key="searchInput"
                        value={value}
                        style={STYLES.input}
                        placeholder={'Search for something to do!'}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={this.handleKeyPress}
                    />
                    <div
                        style={STYLES.icon(clicking)}
                        onClick={this.search}
                    >
                        <FontAwesome
                            name="search"
                            size="2x"
                            style={{ color: secondaryColor, textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                    </div>
                </div>
                <AutoComplete
                    searchTerm={value.toLowerCase()}
                    show={Radium.getState(this.state, 'searchInput', ':focus')}
                    handleResultClick={(v) => handleChange(v)}
                />
            </div>
        );
    }

    @autobind
    handleKeyPress(e: Object): void {
        if (e.key === 'Enter') {
            this.search();
        }
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

    icon: (clicking: boolean) => ({
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
    })
};
