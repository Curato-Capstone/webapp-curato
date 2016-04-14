import React, { Component } from 'react';
import Radium from 'radium';

import search from '../../../images/search.svg';
import list from '../../../images/list.svg';

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
                    <div style={STYLES.header}>Curato</div>
                    <div style={STYLES.item}>
                        <img style={STYLES.icon} src={search} />
                        <div>Search</div>
                    </div>
                    <div style={STYLES.item}>
                        <img style={STYLES.icon} src={list} />
                        <div>Favorites</div>
                    </div>
                </div>
                <div style={STYLES.recentContainer}>
                    <div>Recent Activity</div>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        height: '100vh',
        minHeight: '600px',
        paddingTop: '12px',
        backgroundColor: '#BC4432',
        width: '200px'
    },

    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    header: {
        color: 'white',
        fontSize: '54px',
        marginRight: '12px',
        marginBottom: '24px'
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        fontSize: '28px',
        marginBottom: '48px'
    },

    icon: {
        width: '70px',
        height: '70px',
        marginBottom: '5px'
    }


};

export default Radium(SideNav);
