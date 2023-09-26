import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EventFormModal(props) {
  const [newForm, setNewForm] = useState({
    name: '',
    address: '',
    image: '',
    description: '',
  });

  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createDetails(newForm);
    setNewForm({
      name: '',
      address: '',
      image: '',
      description: '',
    });
  };

  const loaded = () => {
    return props.details.map((detail) => (
      <div key={detail._id} className="detail">
        <Link to={`/details/${detail._id}`}>
          <h1>{detail.name}</h1>
        </Link>
      </div>
    ));
  };

  if (!props.show) {
    return null; // Return null when show is false
  }

  return (
    <section className="EventModal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
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
      {props.details ? loaded() : <p>Loading...</p>}
    </section>
  );
}

export default EventFormModal;
