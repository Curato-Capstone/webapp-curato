// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';

@Radium
export default class UserAvatar extends Component {
    static defaultProps = {};
    props: { name: string };
    state: void;

    render() {
        const { name } = this.props;

        return (
            <div style={STYLES.container}>
                <Link to="/account" style={STYLES.link}>
                    <Avatar className="fa fa-paper-plane" style={STYLES.avatarIcon} />
                    <div>{name}</div>
                </Link>
            </div>
        );
    }
}

const STYLES = {
    container: {
        position: 'absolute',
        left: 'calc(100vw - 150px)',
        display: 'none',
        height: '50px',
        width: '150px',
        marginRight: '20px',
        marginTop: '5px',
        zIndex: 5,
        '@media (min-width: 520px)': {
            display: 'block',
        },
    },

    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },

    avatarIcon: {
        marginRight: '12px'
    }
};
