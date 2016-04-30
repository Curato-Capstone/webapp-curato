// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';

class Slider extends Component {
    static defaultProps = {
        tooltipValues : [],
        handleChange  : () => {}
    };

    props: {
        name          : string,
        // value is in terms of the slider itself, 0 = beginning, 200 = end
        value         : number,
        tooltipValues : Array<string>,
        handleChange  : (value: number) => void
    };

    state : { dragging : boolean };
    state = { dragging: false };

    render() : React.Element {
        const { name, value } = this.props;
        const { dragging } = this.state;

        return (
            <div
                id={name}
                style={STYLES.container}
                onMouseMove={this.handleDrag}
                onMouseLeave={() => this.setState({ dragging: false })}
                onMouseUp={() => this.setState({ dragging: false })}
            >
                <div
                    style={STYLES.slider}
                    onClick={this.handleClick}
                >
                    <div style={STYLES.uncoloredBar} />
                    <div style={STYLES.coloredBar(value)} />
                    <div>
                        <div
                            style={STYLES.circle(value)}
                            onMouseDown={() => this.setState({ dragging: true })}
                        />
                        <div style={STYLES.biggerCircle(value, dragging)} />
                    </div>
                    <div>
                        <div style={STYLES.tooltip(value, dragging)}>
                                {this.getTooltipText()}
                        </div>
                        <div style={STYLES.triangle(value, dragging)} />
                    </div>
                </div>
            </div>
        );
    }

    @autobind
    handleDrag(e): void {
        if (this.state.dragging) {
            const left = document.getElementById(this.props.name).getBoundingClientRect().left;
            const location = e.clientX - left;

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
    handleClick(e): void {
        const left = document.getElementById(this.props.name).getBoundingClientRect().left;
        const location = e.clientX - left;

        // 280 = length (200) + left padding (70) + (container (220) - slider (200)) / 2
        // 80 = left padding (70) + (container width (220) - slider width (200))
        if ((location <= 280) && (location >= 80)) {
            this.props.handleChange(location - 80);
        }
    }

    getTooltipText(): React.Element | void {
        const { value, tooltipValues } = this.props;
        const length = tooltipValues.length;

        for (let i = 0; i <= length; i++) {
            // 200 = length (200)
            if (value < ((200 + 1) / length) * (i + 1)) {
                return (
                    <div style={STYLES.tooltipText} key={tooltipValues[i]}>
                        {tooltipValues[i]}
                    </div>
                );
            }
        }
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

    coloredBar: (value: number) => {
        return {
            position: 'absolute',
            height: '4px',
            width: `${value + 5}px`,
            marginTop: '6px',
            cursor: 'pointer',
            backgroundColor: '#BC4432',
            zIndex: 5,
            borderRadius: '5px',
            transition: 'width .55s ease-out'
        };
    },

    circle: (value: number) => {
        return {
            position: 'absolute',
            left: `${value + 70}px`,
            height: '16px',
            width: '16px',
            cursor: 'pointer',
            borderRadius: '50%',
            backgroundColor: '#BC4432',
            zIndex: 10
        };
    },

    biggerCircle: (value: number, dragging: boolean) => {
        return {
            position: 'absolute',
            left: `${value + 70}px`,
            height: '50px',
            width: '50px',
            marginLeft: '-16px',
            marginTop: '-16px',
            borderRadius: '50%',
            cursor: 'pointer',
            backgroundColor: 'lightgrey',
            opacity: dragging ? 0.2 : 0,
            zIndex: 3,
            transition: 'opacity .25s ease-out'
        };
    },

    tooltip: (value: number, dragging: boolean) => {
        return {
            position: 'absolute',
            left: `${value - 5}px`,
            bottom: '100%',
            display: 'flex',
            justifyContent: 'center',
            background: 'rgba(222, 138, 125, 0.95)',
            color: '#fff',
            marginBottom: '-45px',
            opacity: dragging ? 0.9 : 0,
            padding: '20px',
            pointerEvents: 'none',
            width: '40%',
            zIndex: 100,
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.28)',
            transform: dragging ? 'translateY(20px)' : 'translateY(40px)',
            /* revisit */
            transition: 'all .3s ease-out',
        };
    },

    triangle: (value: number, dragging: boolean) => {
        return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderTop: 'solid rgba(222, 138, 125, 0.95) 10px',
            transition: 'all .3s ease-out',
            opacity: dragging ? 1 : 0,
            transform: dragging ? 'translateY(10px)' : 'translateY(30px)',
            height: 0,
            top: 55,
            left: `${value + 80}px`,
            marginLeft: '-13px',
            position: 'absolute',
            width: 0
        };
    },

    tooltipText: {}
};

export default Radium(Slider);
