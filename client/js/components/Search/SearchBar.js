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
        // position: 'relative'
        display: 'flex'
    },

    input: {
        width: '500px',
        height: '70px',
        fontSize: '23px',
        paddingLeft: '18px',
        boxShadow: '0px 2px 5px 2px rgba(211,211,211,0.75)'
    },

    icon: (clicking) => {
        return {
            // position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // top: 0,
            // right: 0,
            boxShadow: '-6px 0px 8px 2px rgba(211,211,211,0.75)',
            width: '75px',
            height: '72px',
            backgroundColor: primaryColor,
            transform: clicking ? 'translateY(10px)' : 'translateY(0px)',
            transition: 'all 0.15s ease-in'
        };
    }
};
