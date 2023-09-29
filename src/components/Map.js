import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EventFormModal from './EventFormModal';
import ShowModal from './Modal';
import { getAllEvents } from '../api/events';

const MapContainer = ({ user, profile }) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const defaultCenter = {
    lat: 40.783660, lng: -73.965019
  };

  
  const eventModalRef = useRef(null)
  const showModalRef = useRef(null)
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [markerDetails, setMarkerDetails] = useState(null);
  const [newEvent, updateNewEvents] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log('firing')
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchEvents();
    updateNewEvents(false)
  }, [newEvent, eventModalRef, showModalRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        eventModalRef.current && !eventModalRef.current.contains(event.target) ||
        showModalRef.current && !showModalRef.current.contains(event.target)
      ) {
        setShowModal(false);
        setShowEventModal(false);
        setMarkers(markers => markers.slice(0, markers.length - 1));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, showEventModal]);

  const handleMapClick = (event) => {
    if (!user) return;

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    setCenter(newMarker);
    setMarkers(prev => [...prev, newMarker]);
    setShowEventModal(true);
  };

  const handleMarkerClick = (event) => {
    setMarkerDetails(event);
    setShowModal(true);
  };

  const mapContainerStyles = {
    height: "95vh",
    width: "100%"
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={14}
        center={center}
        onDblClick={handleMapClick}
        options={{ mapId: "af6bc521083dc9cf", disableDoubleClickZoom: true }}
      >
        {user && events.map(event => (
          <Marker
            key={event._id}
            position={{ lat: event.coordinates.lat,  lng: event.coordinates.lng} }
            onClick={() => handleMarkerClick(event)}
          />
        ))}
        {user && markers.map((marker, index) => (
          <Marker key={index} position={marker} onClick={() => handleMarkerClick(marker)} />
        ))}
        <EventFormModal ref={eventModalRef} user={profile} show={showEventModal} setShow={setShowEventModal} updateNewEvents={updateNewEvents} coordinates={center} onClose={() => setShowEventModal(false)} />
        <ShowModal ref={showModalRef} set={setShowModal} show={showModal} user={profile} details={markerDetails} updateNewEvents={updateNewEvents} onClose={() => setShowModal(false)} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;