import React, { Component } from 'react';
import Radium from 'radium';

import FullCard from 'components/Reusable/Card/FullCard';

const place = {
    name: 'EMP',
    address: '1234 Street Ave., Seattle, WA',
    image: require('images/places/emp.jpg'),
    id: '123'
};

@Radium
export default class Place extends Component {
    static defaultProps = {};
    props: {};
    state: void;
    
    render() {
        const {  } = this.props;
    
        return (
            <div style={STYLES.container}>
                <FullCard
                    key={place.id}
                    place={place}
                    favorite={true}
                    handleFavorite={() => {}}
                    handleDislike={() => {}}
                    handleMore={() => {}}
                />
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '700px'
    }
};
