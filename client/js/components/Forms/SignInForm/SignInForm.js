import React, { Component } from 'react';
import Radium from 'radium';
import { Field, reduxForm } from 'redux-form/immutable';

import Button from 'reusable/Button/Button';
import Input from 'reusable/Input/TextField';

@Radium
class SignInForm extends Component {
    static defaultProps = {};
    props: {
        handleSubmit: () => void,
        reset: () => void,
        submitting: boolean,
        pristine: boolean
    };
    state: void;

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit} style={STYLES.form}>
                <div style={STYLES.fieldContainer}>
                    <Field name="email" component={email =>
                        <div style={STYLES.field}>
                            <Input
                                type="email"
                                floatingLabelText="Email"
                                errorText={email.touched && email.error ? email.error : ''}
                                {...email}
                            />
                        </div>
                    }
                    />
                </div>

                <div style={STYLES.fieldContainer}>
                    <Field name="password" component={password =>
                        <div style={STYLES.field}>
                            <Input
                                type="password"
                                floatingLabelText="Password"
                                errorText={password.touched && password.error ? password.error : ''}
                                {...password}
                            />
                        </div>
                    }
                    />
                </div>

                <div style={STYLES.buttonContainer}>
                    <Button
                        label="Login"
                        disabled={submitting}
                        type="submit"
                        style={STYLES.submitButton}
                    />
                </div>
            </form>
        );
    }
}

const STYLES = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

        alignItems: 'center',
        width: '90%',
        padding: '0 16px',
        maxWidth: '500px',
        boxSizing: 'border-box'
    },

    buttonContainer: {
        marginTop: 'auto',
        marginBottom: '12px'
    },

    submitButton: {
        marginRight: '12px'
    },

    fieldContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3px'
    },

    field: {
        width: '100%'
    }
};

SignInForm = reduxForm({
    form: 'SignInForm',
})(SignInForm);

export default SignInForm;
