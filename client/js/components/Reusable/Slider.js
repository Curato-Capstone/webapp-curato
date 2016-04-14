// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import _ from 'lodash';


type State = {
    dragging : boolean,
    value    : number
}
type Props = {
    name  : string,
    value : number
};
class Slider extends Component {
    static defaultProps = {};
    state: State;
    props: Props;

    constructor(props) {
        super(props);

        this.state = {
            dragging : false,
            value: 0
        };
    }

    render() : React.Element {
        const { name } = this.props;
        const { dragging, value } = this.state;

        return (
            <div
                id={this.props.name}
                style={STYLES.container}
                onMouseMove={(e) => {
                    if (dragging) {
                        const left = document.getElementById(name).getBoundingClientRect().left;
                        const location = e.clientX - left;
                        _.debounce(() => this.handleDrag(location), 25)();
                    }
                }}
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
                        <div style={STYLES.tooltip(value, dragging)}>I love eating</div>
                        <div style={STYLES.triangle(value, dragging)} />
                    </div>
                </div>
            </div>
        );
    }

    handleDrag(location) : void {
        if ((location <= 205) && (location >= 0)) {
            this.setState({ value: location -  10 });
        }
    }

    handleClick(e) : void {
        const left = document.getElementById(this.props.name).getBoundingClientRect().left;
        const location = e.clientX - left;
        if ((location <= 205) && (location >= 0)) {
            this.setState({ value: location - 10 });
        }
    }
}

const STYLES = {
    container: {
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '150px',
    },

    slider: {
        height: '20px',
        width: '200px'
    },

    uncoloredBar: {
        cursor: 'pointer',
        position: 'absolute',
        height: '4px',
        width: '200px',
        marginTop: '6px',
        backgroundColor: 'grey',
        pointerEvents: 'none',
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
            userDrag: 'none',
            transition: 'width .55s ease-out',
            userSelect: 'none',
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
            zIndex: 10,
            userDrag: 'none',
            userSelect: 'none'
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
            zIndex: 3,
            userDrag: 'none',
            userSelect: 'none'
        };
    },

    tooltip: (value, dragging) => {
        return {
            left: `${value - 60}px`,
            background: 'rgba(222, 138, 125, 0.95)',
            bottom: '100%',
            color: '#fff',
            display: 'block',
            marginBottom: '-45px',
            opacity: dragging ? 1 : 0,
            padding: '20px',
            pointerEvents: 'none',
            position: 'absolute',
            width: '50%',
            transform: dragging ? 'translateY(0px)' : 'translateY(20px)',
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
            transform: dragging ? 'translateY(-10px)' : 'translateY(10px)',
            height: 0,
            top: 55,
            left: `${value + 10}px`,
            marginLeft: '-13px',
            position: 'absolute',
            width: 0
        };
    }

};

export default Radium(Slider);
