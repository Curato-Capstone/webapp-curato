import React, { Component } from 'react';
import Radium from 'radium';

import placeImage from '../../../../images/places/emp.jpg';

@Radium
export default class Card extends Component {
    static defaultProps = {};
    state: void;
    props: {
        fullscreen: boolean
    };

    render() {
        const { fullscreen } = this.props;

        return (
            <div style={STYLES.styleContainer}>
                <div style={STYLES.container}>

                    <div style={STYLES.imageContainer(fullscreen)}>
                        <img style={STYLES.image(fullscreen)} src={placeImage} />
                    </div>

                    <div style={STYLES.cardTextContainer}>
                        <div style={STYLES.cardText}>
                            <div>EMP Museum</div>
                            <div>EMP Museum</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const pulseKeyframes = Radium.keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 0
    },
    '100%': {
        transform: 'translateY(100px)',
        opacity: 1
    }
}, 'pulse');

const STYLES = {
    styleContainer: {

    },

    container: {
        position: 'relative',
        marginLeft: '200px'
    },

    imageContainer: (fullscreen) => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            height: !fullscreen ? '200px' : '400px',
            width: !fullscreen ? '100vw' : '350px',
            transition: 'all 1s ease-out',
        };
    },

    image: (fullscreen) => {
        return {
            transition: 'all 1s ease-out',
            width: !fullscreen ? '100%' : '900px'
        };
    },

    cardTextContainer: {
        boxShadow: '2px 2px 4px #888888',
        height: '400px',
        width: '380px',
        marginLeft: '-15px',
        background: 'white',
        position: 'absolute',
        animation: 'x 1s ease 0s 1 normal forwards',
        animationName: pulseKeyframes,
        top: 0,
        zIndex: -1,
    },

    cardText: {
        position: 'absolute',
        color: 'grey',
        top: 300 + 20,
        left: 20
    }
};
