/* eslint-disable react/prop-types */

import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  // trigger action programmatically without react router's <Form>
  const submit = useSubmit();

  function startDeleteHandler() {
    // use built-in confirm function to make sure user really want to delete
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      // first argument is the data you want to submit,
      // but 'delete' method don't pass data
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to='edit'>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
