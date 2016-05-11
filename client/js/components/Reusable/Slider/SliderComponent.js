// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';

import { primaryColor } from 'utils/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

@Radium
export default class SliderComponent extends Component {
    static defaultProps = {
        tooltipValues : [],
        updateValue   : () => {},
        color         : primaryColor
    };

    props: {
        name          : string,
        // value is in terms of the slider itself, 0 = beginning, 200 = end
        value         : number,
        tooltipValues : Array<string>,
        handleChange  : (value: number) => void,
        updateValue   : () => void,
        color         : string
    };

    state = { dragging: false };
    state : { dragging : boolean };

    render() : React.Element {
        const { name, value, color } = this.props;
        const { dragging } = this.state;

        return (
            <div
                id={name}
                style={STYLES.container}
                onMouseMove={this.handleDrag}
                onTouchMove={this.handleDrag}
                onTouchEnd={this.handleDragDone}
                onMouseLeave={this.handleDragDone}
                onMouseUp={this.handleDragDone}
            >
                <div
                    style={STYLES.slider}
                    onClick={this.handleClick}
                >
                    <div style={STYLES.uncoloredBar} />
                    <div style={STYLES.coloredBar(value, color)} />
                    <div>
                        <div
                            style={STYLES.circle(value, color)}
                            onMouseDown={() => this.setState({ dragging: true })}
                            onTouchStart={() => this.setState({ dragging: true })}
                        />
                        <div
                            style={STYLES.biggerCircle(value, dragging)}
                            onMouseDown={() => this.setState({ dragging: true })}
                            onTouchStart={() => this.setState({ dragging: true })}
                        />
                    </div>
                    <div>
                        <div style={STYLES.tooltip(value, dragging, color)}>
                                {this.getTooltipText()}
                        </div>
                        <div style={STYLES.triangle(value, dragging, color)} />
                    </div>
                </div>
            </div>
        );
    }

    @autobind
    handleDrag(e: Object): void {
        if (this.state.dragging) {
            const left = document.getElementById(this.props.name).getBoundingClientRect().left;

            let location;
            if (e.touches) {
                location = e.touches[0].clientX - left;
            } else {
                location = e.clientX - left;
            }

            // 280 = length (200) + left padding (70) + (container (220) - slider (200)) / 2
            // 80 = left padding (70) + (container width (220) - slider width (200))
            let moveTo;
            if ((location <= 280) && (location >= 80)) {
                moveTo = location - 80;
            } else if (location >= 280) {
                moveTo = 200;
            } else if (location <= 80) {
                moveTo = 0;
            }
            window.requestAnimationFrame(() => this.props.handleChange(moveTo));
        }
    }

    @autobind
    handleClick(e: Object): void {
        const left = document.getElementById(this.props.name).getBoundingClientRect().left;
        const location = e.clientX - left;

        // 280 = length (200) + left padding (70) + (container (220) - slider (200)) / 2
        // 80 = left padding (70) + (container width (220) - slider width (200))
        if ((location <= 280) && (location >= 80)) {
            this.props.handleChange(location - 80);
        }
    }

    @autobind
    handleDragDone(): void {
        this.setState({ dragging: false });
        this.props.updateValue();
    }

    getTooltipText(): React.Element | void {
        const { value, tooltipValues } = this.props;
        const length = tooltipValues.length;

        const index = Math.round(value / (200 / (length - 1)));
        return (
            <div style={STYLES.tooltipText} key={index}>
                {tooltipValues[index]}
            </div>
        );
    }
}

// |--70px--[-10px-____200px____-10px-]--70px--|
const STYLES = {
    container: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '105px',
        width: '220px',
        padding: '0 70px 30px 70px'
    },

    slider: {
        height: '20px',
        width: '200px',
        userDrag: 'none',
        userSelect: 'none',
    },

    uncoloredBar: {
        position: 'absolute',
        height: '4px',
        width: '200px',
        marginTop: '6px',
        cursor: 'pointer',
        backgroundColor: 'grey',
        borderRadius: '5px'
    },

    coloredBar: (value: number, color: string) => ({
        position: 'absolute',
        height: '4px',
        width: `${value + 5}px`,
        marginTop: '6px',
        cursor: 'pointer',
        backgroundColor: color,
        zIndex: 5,
        borderRadius: '5px',
        transition: 'width .55s ease-out'
    }),

    circle: (value: number, color: string) => ({
        position: 'absolute',
        left: '70px',
        height: '16px',
        width: '16px',
        cursor: 'pointer',
        borderRadius: '50%',
        transform: `translateX(${value}px)`,
        backgroundColor: color,
        userSelect: 'none',
        zIndex: 10,
    }),

    biggerCircle: (value: number, dragging: boolean) => ({
        position: 'absolute',
        left: '70px',
        height: '50px',
        width: '50px',
        marginLeft: '-16px',
        marginTop: '-16px',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: `translateX(${value}px)`,
        backgroundColor: 'lightgrey',
        opacity: dragging ? 0.2 : 0,
        zIndex: 3,
        transition: 'opacity .25s ease-out'
    }),

    tooltip: (value: number, dragging: boolean, color: string) => ({
        position: 'absolute',
        left: `${value - 20}px`,
        bottom: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: ColorManipulator.lighten(color, 0.3),
        color: '#fff',
        marginBottom: '-45px',
        textAlign: 'center',
        opacity: dragging ? 0.9 : 0,
        padding: '20px',
        pointerEvents: 'none',
        width: '45%',
        zIndex: 100,
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.28)',
        transform: dragging ? 'translateY(20px)' : 'translateY(40px)',
        transition: 'all .3s ease-out',
    }),

    triangle: (value: number, dragging: boolean, color: string) => ({
        position: 'absolute',
        top: 55,
        left: `${value + 82}px`,
        marginLeft: '-13px',
        borderLeft: 'solid transparent 10px',
        borderRight: 'solid transparent 10px',
        borderTop: `solid ${ColorManipulator.lighten(color, 0.3)} 10px`,
        opacity: dragging ? 1 : 0,
        transform: dragging ? 'translateY(10px)' : 'translateY(30px)',
        transition: 'all .3s ease-out',
    }),

    tooltipText: {}
};
