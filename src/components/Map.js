import React, { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ShowModal from './Modal'
import EventFormModal from './EventFormModal';
import { getAllEvents } from '../api/events';

const MapContainer = ({user, profile}) => {
  let API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  const defaultCenter = {
    lat: 40.783660, lng: -73.965019
  };
  const eventModalRef = useRef(null);
  const showModalRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [showEventModal, setEventModalVis] = useState(false)
  const [showModal, setModalVis] = useState(false);
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async() =>{
      const data = await getAllEvents()
      console.log(data)
      setEvents(data)
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (eventModalRef.current && !eventModalRef.current.contains(event.target)) ||
        (showModalRef.current && !showModalRef.current.contains(event.target))
      ) {
        setModalVis(false);
        setEventModalVis(false);
        setMarkers(markers => markers.slice(0, markers.length - 1));
      }
    };
  
    if (showModal || showEventModal) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showModal, showEventModal]);
  

  const mapContainerStyles = {
    height: "95vh",
    width: "100%"
  };

  const handleMapClick = (event) => {
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
        options={{ mapId : "af6bc521083dc9cf", disableDoubleClickZoom:true }}
      >
        {user&&events && events.map(event => (
          <Marker 
            key={event._id} 
            position={{lat:event.coordinates.latitude, lng: event.coordinates.longitude}}
            onClick={() => handleShowEvent} // Pass the event to the handler if needed
          />
        ))}
        {user && markers.map((marker, index) => (
          <Marker user={profile} key={index} position={marker}
          onClick={handleShowEvent}/>
        ))}
        <EventFormModal ref={eventModalRef} show={showEventModal} coordinates={center} onClose={() => setEventModalVis(false)} />
        <ShowModal ref={showModalRef} show={showModal} user={profile} onClose={() => setModalVis(false)} />

      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;

