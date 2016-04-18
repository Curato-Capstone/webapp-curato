// @flow
import React, { Component } from 'react';
import Radium from 'radium';

class Slider extends Component {
    static defaultProps = {
        tooltipValues : [],
        handleChange  : () => {}
    };
    props: {
        name          : string,
        value         : number,
        tooltipValues : Array<string>,
        handleChange  : (value: number) => void
    };
    state: { dragging : boolean };
    state = { dragging: false };

    render() : React.Element {
        const { name, value } = this.props;
        const { dragging } = this.state;

        return (
            <div
                id={name}
                style={STYLES.container}
                onMouseMove={(e) => this.handleDrag(e)}
                onMouseLeave={() => this.setState({ dragging: false })}
                onMouseUp={() => this.setState({ dragging: false })}
            >
                <div
                    style={STYLES.slider}
                    onClick={(e) => this.handleClick(e)}
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

    handleDrag(e): void {
        if (this.state.dragging) {
            const left = document.getElementById(this.props.name).getBoundingClientRect().left;
            const location = e.clientX - left;

            if ((location <= 215) && (location >= 10)) {
                window.requestAnimationFrame(() => this.props.handleChange(location - 10));
            }
        }
    }

    handleClick(e): void {
        const left = document.getElementById(this.props.name).getBoundingClientRect().left;
        const location = e.clientX - left;
        if ((location <= 215) && (location >= 10)) {
            this.props.handleChange(location - 10);
        }
    }

    getTooltipText(): React.Element {
        const { value, tooltipValues } = this.props;

        const length = tooltipValues.length;

        for (let i = 0; i <= length; i++) {
            if (value < (215 / length) * (i + 1)) {
                return (
                    <div key={tooltipValues[i]}>
                        {tooltipValues[i]}
                    </div>
                );
            }
        }
        return <div />;
    }
}

const STYLES = {
    container: {
        alignItems: 'flex-end',
        display: 'inline-flex',
        height: '105px',
        justifyContent: 'center',
        position: 'relative',
        width: '220px',
    },

    slider: {
        height: '20px',
        width: '200px',
        userDrag: 'none',
        userSelect: 'none',
    },

    uncoloredBar: {
        cursor: 'pointer',
        position: 'absolute',
        height: '4px',
        width: '200px',
        marginTop: '6px',
        backgroundColor: 'grey',
        borderRadius: '5px'
    },

    coloredBar: (value) => {
        return {
            position: 'absolute',
            cursor: 'pointer',
            height: '4px',
            width: `${value + 5}px`,
            marginTop: '6px',
            backgroundColor: '#BC4432',
            zIndex: 5,
            transition: 'width .55s ease-out',
            borderRadius: '5px'
        };
    },

    circle: (value) => {
        return {
            position: 'absolute',
            cursor: 'pointer',
            height: '16px',
            width: '16px',
            borderRadius: '50%',
            backgroundColor: '#BC4432',
            left: `${value}px`,
            zIndex: 10
        };
    },

    biggerCircle: (value, dragging) => {
        return {
            position: 'absolute',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
            backgroundColor: 'lightgrey',
            transition: 'opacity .25s ease-out',
            opacity: dragging ? 0.2 : 0,
            left: `${value}px`,
            zIndex: 3
        };
    },

    tooltip: (value, dragging) => {
        return {
            left: `${value - 75}px`,
            background: 'rgba(222, 138, 125, 0.95)',
            bottom: '100%',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '-45px',
            opacity: dragging ? 1 : 0,
            padding: '20px',
            pointerEvents: 'none',
            position: 'absolute',
            width: '60%',
            transform: dragging ? 'translateY(20px)' : 'translateY(40px)',
            transition: 'all .3s ease-out',
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.28)'
        };
    },

    triangle: (value, dragging) => {
        return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderTop: 'solid rgba(222, 138, 125, 0.95) 10px',
            transition: 'all .3s ease-out',
            opacity: dragging ? 1 : 0,
            transform: dragging ? 'translateY(10px)' : 'translateY(30px)',
            height: 0,
            top: 55,
            left: `${value + 10}px`,
            marginLeft: '-13px',
            position: 'absolute',
            width: 0
        };
    },

    tooltipText: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '20px',
        userSelect: 'none'
    }

};

export default Radium(Slider);
