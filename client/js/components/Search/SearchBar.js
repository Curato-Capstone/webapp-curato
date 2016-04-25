// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';
import FontAwesome from 'react-fontawesome';

import { primaryColor } from 'utils/colors';

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

    state = { clicking: false, enter: false };
    state : { clicking: boolean, enter: boolean };

    render() {
        const { value, handleChange, handleSubmit } = this.props;
        const { clicking, enter } = this.state;

        return (
            <div style={STYLES.container}>
                <input
                    type="text"
                    value={value}
                    style={STYLES.input}
                    placeholder={'Search for something to do!'}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={this.handleKeyPress}
                />
                <div
                    style={STYLES.icon(clicking || enter)}
                    onClick={() => handleSubmit()}
                    onMouseDown={() => this.setState({ clicking: true })}
                    onMouseUp={() => this.setState({ clicking: false })}
                >
                    <FontAwesome
                        name="search"
                        size="2x"
                        style={{ color: 'white', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
            </div>
        );
    }

    @autobind
    handleKeyPress(e: Object): void {
        if (e.key === 'Enter') {
            this.setState({ enter: true });

            // wait 250ms for cool animation
            setTimeout(() => {
                this.setState({ enter: false });
                // probably should wait another x seconds for button to go up lol
                this.props.handleSubmit();
            }, 250);
        }
    }
}

const STYLES = {
    container: {
        display: 'flex',
        width: '90%',
        maxWidth: '700px'
    },

    input: {
        height: '50px',
        width: '100%',
        paddingLeft: '18px',
        fontSize: '16px',
        boxShadow: '0px 2px 5px 2px rgba(211,211,211,0.75)',
        transition: 'all 0.5s ease-in',
        '@media (min-width: 520px)': {
            height: '70px',
            fontSize: '23px',
        }
    },

    icon: (clicking: boolean) => {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '65px',
            height: '52px',
            boxShadow: '-6px 0px 8px 2px rgba(211,211,211,0.75)',
            backgroundColor: primaryColor,
            transform: clicking ? 'translate(1.5px, 10px)' : 'translate(0px, -2px)',
            /* revisit */
            transition: 'all 0.2s ease-in',
            '@media (min-width: 520px)': {
                width: '80px',
                height: '72px',
            }
        };
    }
};
