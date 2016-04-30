import React, { Component } from 'react';
import Radium from 'radium';

import AccountForm from 'components/Forms/AccountForm/AccountForm';
import Avatar from 'material-ui/Avatar';

@Radium
class Account extends Component {
    static defaultProps = {};
    state: void;
    props: {};

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <Avatar className="fa fa-paper-plane" size={250} style={STYLES.avatar} />
                <AccountForm />
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: '30px',
        height: '100%',
        minHeight: '100vh'
    },

    avatar: {
        // height: '200px',
        // width: '200px'
    }
};

export default Account;
