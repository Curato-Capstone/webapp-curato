// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import autobind from 'autobind-decorator';

import { primaryColor, secondaryColor } from 'utils/colors';

import MaterialTextField from 'material-ui/TextField';
import eye from 'images/icons/eye.svg';

@Radium
export default class TextField extends Component {
    static defaultProps = {
        disabled : false,
        hintText : '',
        type     : 'primary'
    };

    props: {
        value     : string,
        disabled  : boolean,
        hintText  : string,
        type      : string,
        floatingLabelText : string
    };

    state = { showPassword: false };
    state : { showPassword: boolean };

    render() {
        const { type, ...other } = this.props;
        const { showPassword } = this.state;

        return (
            <div style={STYLES.container}>
                <MaterialTextField
                    type={this.getInputType(type, showPassword)}
                    min="6"
                    max="100"
                    fullWidth
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

    @autobind
    handleEyeClick(): void {
        this.setState({ showPassword: !this.state.showPassword });
    }

    getInputType(type, showPassword): string {
        if (type === 'password') {
            if (showPassword) {
                return 'text'
            } else {
                return 'password'
            }
        }
        return type;
    }
}

const STYLES = {
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%'
    },

    eye: {
        height: '40px',
        width: '40px',
        marginBottom: '4px',
        marginLeft: '10px',
        opacity: 0.8,
        cursor: 'pointer',
    }
};
