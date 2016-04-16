import React, { Component } from 'react';
import Radium from 'radium';

import search from '../../../images/icons/search.svg';
import heart from '../../../images/icons/heart.svg';
import logo from '../../../images/logo/full-logo.svg';


import { primaryColor, secondaryColor } from '../../utils/colors';

type Props = {};
class SideNav extends Component {
    static defaultProps = {};
    state: void;
    props: Props;
    
    render() {
        const { } = this.props;
    
        return (
            <div style={STYLES.container}>
                <div style={STYLES.itemContainer}>
                    <div style={STYLES.header}>
                        <object data={logo} style={STYLES.headerLogo} type="image/svg+xml" />
                    </div>
                    <div style={STYLES.item}>
                        <object data={search} style={STYLES.icon} type="image/svg+xml" />
                        <div>Search</div>
                    </div>

                    <div style={STYLES.dividerContainer}>
                        <div style={STYLES.divider}/>
                    </div>

                    <div style={STYLES.item}>
                        <object data={heart} style={STYLES.icon} type="image/svg+xml" />
                        <div>Favorites</div>
                    </div>

                    <div style={STYLES.dividerContainer}>
                        <div style={STYLES.divider}/>
                    </div>

                </div>

            </div>
        );
    }
}

// <div style={STYLES.recentContainer}>
//     <div>Recent Activity</div>
// </div>

const STYLES = {
    container: {
        color: '#B1B3B0',
        height: '100vh',
        minHeight: '600px',
        backgroundColor: 'white',
        width: '225px',
        display: 'inline-block',
        boxShadow: '1px 1px 3px #888888'
    },

    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    header: {
        fontSize: '48px',
        height: '180px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: primaryColor,
        display: 'flex',
        flexDirection: 'column'
    },

    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: '36px',
        fontSize: '36px',
        width: '60%',
        height: '180px'
    },

    icon: {
        width: '60px',
        height: '60px',
        marginRight: '12px',
        marginBottom: '12px'
    },

    dividerContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },

    divider: {
        borderBottom: '0.5px solid #B1B3B0',
        width: '90%',
        // margin: '30px 0'
    },

    headerLogo: {
        width: '95%',
    }
};

export default Radium(SideNav);
