// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor } from 'utils/colors';

type Item = {
    name  : string,
    handleClick : () => void,
};

@Radium
export default class Dots extends Component {
    static defaultProps = {};
    props: {
        items  : Array<Item>,
        active : number
    };
    state: void;


    render() {
        const { items, active } = this.props;

        return (
            <div style={STYLES.container}>
                {items.map((item, index) => (
                    <div key={item.name}>
                        <div
                            key={`${item.name}-dot`}
                            data-tip data-for="intro"
                            onClick={item.handleClick}
                            style={[STYLES.dot, STYLES.active(active === index)]}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

const STYLES = {
    container : {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px'
    },

    dot: {
        height: '10px',
        width: '10px',
        opacity: '.25',
        borderRadius: '50%',
        backgroundColor: primaryColor,
        marginLeft: '16px',
        cursor: 'pointer',
        transition: 'height 0.2s ease-out, width 0.2s ease-out, opacity 0.45s ease-out',
        ':hover': {
            opacity: 1
        }
    },

    active: (active: boolean): Object|void => {
        if (active) {
            return {
                opacity: '1',
                height: '14px',
                width: '14px'
            };
        }
    }
};
