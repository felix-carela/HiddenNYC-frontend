import React, { useState, useContext } from 'react';
import {createEvent} from '../api/events'
import { GoogleAuthContext } from './useGoogleAuth';

const EventFormModal = React.forwardRef((props, ref) => {
  const [newForm, setNewForm] = useState({});
  const { user, profile, login, logOut } = useContext(GoogleAuthContext);

  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {

    console.log(profile);

    event.preventDefault();
    // TODO refactor and fix the arguments being passed
    setNewForm({
      name: '',
      address: '',
      image: '',
      description: '',
      coordinates: props.coordinates,
      userId: props.user.id
    });
    createEvent(profile.user._id, profile.user.userName, props.coordinates, newForm.description, newForm.image, newForm.address)
    // TODO this is a hack remove setTImeout and use
    // promise chainging to recieve data after newEvent post is made to db
    setTimeout(() => {
        props.updateNewEvents(true)
    }, 1000)
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
          value={newForm.address}
          name="address"
          placeholder="address"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
});


export default EventFormModal;
