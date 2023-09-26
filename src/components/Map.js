import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ShowModal from './Modal'
import EventFormModal from './EventFormModal';
const MapContainer = ({user, profile}) => {
  let API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerStyles = {
    height: "95vh",
    width: "100%"
  };
  const defaultCenter = {
    lat: 40.783660, lng: -73.965019
  };
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [showEventModal, setEventModalVis] = useState(false)
  const [showModal, setModalVis] = useState(false)
  const handleMapClick = (event) => {
    console.log(user)
    if(!user){
      return
    }
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCenter(newMarker);
    setMarkers(currentMarkers => [...currentMarkers, newMarker]);
    setEventModalVis(prevState => !prevState)
  };
  const handleShowEvent = () => {
    setModalVis(prevState => !prevState)
  }
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={14}
        center={center}
        onDblClick={handleMapClick}
        options={{ mapId : "af6bc521083dc9cf",
    disableDoubleClickZoom:true }}
      >
        {user&&markers.map((marker, index) => (
          <Marker key={index} position={marker}
          onClick={handleShowEvent}/>
        ))}
      <EventFormModal show={showEventModal} onClose={() => setEventModalVis(false)} />
      <ShowModal show={showModal} onClose={() => setModalVis(false)}/>
      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;

