import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const VehicleLocation = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap defaultZoom={8} defaultCenter={{lat: 42.7034, lng: 24.1770}}>
            {props.isMarkerShown && <Marker position={{lat: 42.7034, lng: 24.1770}}/>}
        </GoogleMap>
    );
}));

export default VehicleLocation;