import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapShow from './MapShow';
function Show(props) {
  // set up nav function with the useNavigate hook
  const navigate = useNavigate();
  const { id } = useParams();
  const events = props.events;
  const event = events ? events.find((p) => p._id === id) : null;
  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    image: ""
  });
  // handleChange function for form
  const handleChange = (event) => {
    setEditForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateEvents(editForm);
  };
  const handleDelete = () => {
    props.deleteEvents(person._id);
    navigate('/');
  };
  const loaded = () => {
    return (
      <>
        <h1>{event.name}</h1>
        <h2>{event.title}</h2>
        <img
          className="avatar-image"
          src={event.image}
          alt={event.name}
        />
        <button id="delete" onClick={handleDelete}>
          DELETE
        </button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };
  useEffect(() => {
    if(event) {
      setEditForm(event);
    }
  }, [event]);
  return (
    <div className="event">
      { event ? loaded() : loading() }
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
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}
export default Show;