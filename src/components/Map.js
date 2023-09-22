import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  let API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 40.783660, lng: -73.965019
  };

  let center = defaultCenter
  // Step 1: Maintain a state for the markers
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (event) => {
    // Step 2: On map click, retrieve the clicked location
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    center = newMarker

    console.log(center)
    // Step 3: Add the new marker to the markers array state
    setMarkers(currentMarkers => [...currentMarkers, newMarker]);
  };

  return (
     <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
          onClick={handleMapClick}  // Attach the click handler
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
     </LoadScript>
  );
}

export default MapContainer;