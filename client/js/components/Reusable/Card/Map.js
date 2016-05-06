import React, { Component } from 'react';
import Radium from 'radium';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

@Radium
export default class MyMap extends Component {
    static defaultProps = {};
    props: { lat: number, lng: number };
    state = {width: '90%'};
    componentWillMount() {
        console.log('here')
    }

    render() {
        const { lat, lng, name } = this.props;
        console.log(lat, lng - 1)
        return (
            <Map center={[lat, lng - .05]} zoom={18} style={STYLES.map(this.state.width)}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    detectRetina='true'
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        <span>{name}</span>
                    </Popup>
                </Marker>
            </Map>
        );
    }
}

const STYLES = {
    map: (width) => {
        return {
            width: width,
            height: '200px'
        }
    }
};
