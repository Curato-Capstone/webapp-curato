import React, { Component } from 'react';
import Radium from 'radium';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

@Radium
export default class MyMap extends Component {
    static defaultProps = {};
    props: {
        lat: number,
        lng: number,
        name: string
    };
    state: void;

    componentDidMount() {
        setTimeout(() => this.refs.map.getLeafletElement().invalidateSize(false), 2000);
    }

    render() {
        const { lat, lng, name } = this.props;

        return (
            <div style={STYLES.map}>
                <Map ref="map" center={[lat, lng]} zoom={18} style={STYLES.map}>
                    <TileLayer
                        url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
                        detectRetina="true"
                    />
                    <Marker position={[lat, lng]}>
                        <Popup>
                            <span>{name}</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}

const STYLES = {
    map: {
        '@media screen and (min-width: 900px)': {
            width: '70%'
        },
        width: '100%',
        height: '100%'
    }
};
