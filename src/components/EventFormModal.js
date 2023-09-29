import React, { useState, useContext } from 'react';
import {createEvent} from '../api/events'
import { GoogleAuthContext } from './useGoogleAuth';

const EventFormModal = React.forwardRef((props, ref) => {
  const [newForm, setNewForm] = useState({
    name: "",
    address: "",
    imageUrl: "",
    description: "",
    coordinates: null,
    userId: null
  });
  const { user, profile, login, logOut } = useContext(GoogleAuthContext);

  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    console.log(props.coordinates, props.user.user._id)
    event.preventDefault();
    // TODO refactor and fix the arguments being passed
    const updatedForm = {
      name: newForm.name,
      address: newForm.address,
      imageUrl: newForm.imageUrl,
      description: newForm.description,
      coordinates: props.coordinates,
      userId: props.user.user._id
    };
    createEvent(updatedForm)
    setTimeout(() => {
        props.updateNewEvents(true)
    }, 1000)
    setNewForm({
      name: "",
      address: "",
      imageUrl: "",
      description: "",
      coordinates: null,
      userId: null
    })
    props.setShow(false)
  };

  if (!props.show) {
    return null; // Return null when show is false
  }

  return (
    <div ref={ref} className="EventModal">
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
          required={true}
        />
        <input
          type="text"
          value={newForm.address}
          name="address"
          placeholder="address"
          onChange={handleChange}
          required={true}
        />
        <input
          type="text"
          value={newForm.imageUrl}
          name="imageUrl"
          placeholder="image URL"
          onChange={handleChange}
          required={true}
        />
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
          required={true}
        />
        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
});


export default EventFormModal;
