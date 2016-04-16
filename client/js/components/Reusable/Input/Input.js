import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor, secondaryColor } from '../../../utils/colors';

import eye from '../../../../images/icons/eye.svg';

import TextField from '../../../../../node_modules/material-ui/lib/text-field';


@Radium
export default class Input extends Component {
    static defaultProps = {};
    props: {
        value     : string,
        disabled? : boolean,
        hintText? : string,
        type?     : string,
        hintText? : string
    };
    state: { showPassword: boolean };

    constructor(props) {
        super(props);

        this.state = { showPassword: false };
        this.handleEyeClick = this.handleEyeClick.bind(this);
    }

    render() {
        const { type, ...other } = this.props;
        const { showPassword } = this.state;

        return (
            <div style={STYLES.container}>
                <TextField
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    underlineStyle={{ borderColor: primaryColor }}
                    underlineFocusStyle={{ borderColor: primaryColor }}
                    floatingLabelStyle={{ color: secondaryColor }}
                    {...other}
                />
                {type === 'password' ?
                    <img
                        style={STYLES.eye}
                        src={eye}
                        onClick={this.handleEyeClick}
                    />
                    : null
                }
            </div>
        );
    }

    handleEyeClick() {
        this.setState({ showPassword: !this.state.showPassword });
    }
}

const STYLES = {
    container: {
        alignItems: 'flex-end',
        display: 'flex',
        width: '200px'
    },
    
    eye: {
        cursor: 'pointer',
        height: '40px',
        marginBottom: '4px',
        marginLeft: '10px',
        opacity: 0.8,
        width: '40px'
    }
};
