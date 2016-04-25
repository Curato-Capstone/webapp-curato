import React, { Component } from 'react';
import Radium from 'radium';
import reduxForm from 'redux-form';

const fields = ['email', 'name', 'password', 'age', 'gender', 'ethnicity'];

@Radium
class SimpleForm extends Component {
    static defaultProps = {};
    props: {
        fields: {
            email: Object,
            name: Object,
            password: Object,
            age: Object,
            gender: Object,
            ethnicity: Object
        },
        handleSubmit: () => void,
        resetForm: () => void,
        submitting: boolean
    };
    state: void;

    render() {
        const {
            fields: { email, name, password, age, gender, ethnicity },
            handleSubmit,
            resetForm,
            submitting
        } = this.props;

        return (<form onSubmit={handleSubmit} style={STYLES.container}>

                <div>
                    <label>Email</label>
                    <div>
                        <input type="email" placeholder="Email" {...email} />
                    </div>
                </div>

                <div>
                    <label>Name</label>
                    <div>
                        <input type="text" placeholder="Name" {...name} />
                    </div>
                </div>

                <div>
                    <label>password</label>
                    <div>
                        <input type="text" placeholder="Age" {...password} />
                    </div>
                </div>

                <div>
                    <label>age</label>
                    <div>
                        <input type="text" placeholder="Age" {...age} />
                    </div>
                </div>

                <div>
                    <label>gender</label>
                    <div>
                        <input type="text" placeholder="gender" {...gender} />
                    </div>
                </div>

                <div>
                    <label>ethnicity</label>
                    <div>
                        <input type="text" placeholder="ethnicity" {...ethnicity} />
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i /> : <i />} Submit
                    </button>
                    <button type="button" disabled={submitting} onClick={resetForm}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'simple',
    fields
})(SimpleForm);

const STYLES = {};
