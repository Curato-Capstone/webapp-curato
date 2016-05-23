// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';

import { primaryColor } from 'utils/colors';

@Radium
export default class UserAvatar extends Component {
    static defaultProps = {};
    props: { name: string };
    state: void;

    render() {
        const { name } = this.props;

        return (
            <div style={STYLES.container} key="userAvatar">
                <Link to="/account" style={STYLES.link}>
                    <div style={STYLES.avatarWrapper(Radium.getState(this.state, 'userAvatar', ':hover'))}>
                        <Avatar
                            className="fa fa-user"
                            color="white"
                            backgroundColor={primaryColor}
                        />
                    </div>
                    <div>{name}</div>
                </Link>
            </div>
        );
    }
}

const STYLES = {
    container: {
        position: 'absolute',
        left: 'calc(100vw - 175px)',
        top: '10px',
        display: 'none',
        height: '50px',
        width: '150px',
        zIndex: 5,
        ':hover': {},
        '@media (min-width: 520px)': {
            display: 'block',
        },
    },

    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },

    avatarWrapper: (hovering) => ({
        transform: hovering ? 'rotateY(180deg)' : '',
        transformOrigin: '50% 50%',
        height: '40px',
        width: '40px',
        marginRight: '12px',
        transition: 'transform 0.4s ease-in-out'
    })
};
