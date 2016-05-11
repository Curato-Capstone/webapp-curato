import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from 'modules/user';

import AccountForm from 'components/Forms/AccountForm/AccountForm';
import Avatar from 'material-ui/Avatar';

@Radium
class Account extends Component {
    static defaultProps = {};
    props: { actions: Object};
    state: void;

    render() {
        const { actions } = this.props;

        return (
            <div style={STYLES.container}>
                <Avatar className="fa fa-paper-plane" size={250} style={STYLES.avatar} />
                <AccountForm onSubmit={() => actions.updateAccount()} />
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
        paddingLeft: '40px',
        boxSizing: 'border-box',
        '@media (min-width: 520px)': {
            paddingLeft: '80px'
        }
    },

    avatar: {
        // height: '200px',
        // width: '200px'
    }
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({ ...userActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
