import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteEvent, updateEvent } from '../api/events';

const Show = React.forwardRef((props, ref) => {
    // const { id } = useParams();
    console.log(props.user)
  const details = props.details;
//   const detail = details ? details.find((p) => p._id === id) : null;
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    imageUrl: "",
    description: ""
  });

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    console.log(props.details.imageUrl)
    event.preventDefault();
    updateEvent(props.details._id, editForm)
    setTimeout(() => {
        props.updateNewEvents(true)
    }, 1500)
    props.set(false)
  };

  const handleDelete = () => {
    deleteEvent(props.details._id, props.user.user._id)    
    setTimeout(() => {
        props.updateNewEvents(true)
    }, 1000)
    props.set(false)
  };

  const loaded = () => {
    return (
      <>
        <h1>{details.name}</h1>
        <h2>{details.address}</h2>
        <img
          className="avatar-image"
          src={details.imageUrl}
          alt={details.name}
        />
        <h2>{details.description}</h2>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  useEffect(() => {
    if (details) {
      setEditForm(details);
    }
  }, [details]);

  // Add a condition to render null when 'show' is false
  if (!props.show) {
    return null;
  }

  return (
    <div className="ShowModal" ref={ref}>
    {details ? loaded() : loading()}
      {props.user.user._id === props.details.userId && (
        <>
        <button id="delete" onClick={handleDelete}>
          DELETE
        </button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.address}
              name="address"
              placeholder="address"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.imageUrl}
              name="image"
              placeholder="image URL"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.description}
              name="description"
              placeholder="description"
              onChange={handleChange}
            />
            <input type="submit" value="Update Event" />
          </form>
        </>
      )}
    </div>
  );
})
export default Show;