import React, { Component } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

import { primaryColor, secondaryColor } from 'utils/colors';

@Radium
export default class SearchBar extends Component {
    static defaultProps = {
        handleChange: () => {},
        handleEnter: () => {}
    };

    props: {
        value: string,
        handleChange: (value: string) => void,
        handleEnter: () => void,
    };

    state : { clicking: boolean, enter: boolean };
    state = { clicking: false, enter: false };

    render() {
        const { value } = this.props;
        const { clicking, enter } = this.state;

        return (
            <div style={STYLES.container}>
                <input
                    type="text"
                    style={STYLES.input}
                    placeholder={'Search for something to do!'}
                    onKeyDown={(e) => this.handleKeyPress(e)}
                />
                <div
                    style={STYLES.icon(clicking || enter)}
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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ enter: true });

            setTimeout(() => {
                this.setState({ enter: false });
                this.props.handleEnter();
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
        width: '100%',
        fontSize: '16px',
        height: '50px',
        paddingLeft: '18px',
        boxShadow: '0px 2px 5px 2px rgba(211,211,211,0.75)',
        transition: 'all 0.5s ease-in',
        '@media (min-width: 520px)': {
            height: '70px',
            fontSize: '23px',
        }
    },

    icon: (clicking) => {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '-6px 0px 8px 2px rgba(211,211,211,0.75)',
            width: '65px',
            height: '52px',
            backgroundColor: primaryColor,
            transform: clicking ? 'translate(1.5px, 10px)' : 'translate(0px, -2px)',
            transition: 'all 0.25s ease-in',
            '@media (min-width: 520px)': {
                width: '80px',
                height: '72px',
            }
        };
    }
};
