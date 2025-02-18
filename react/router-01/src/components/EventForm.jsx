/* eslint-disable react/prop-types */

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData(); // retrieve error response that is caused by status 422
  const navigate = useNavigate();
  const navigation = useNavigation();
  // figure out what is the current transition process, and use this boolean
  // to control save button to prevent multiple submission at one time
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  // <Form> will automatically trigger the action function of the currently active route.
  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// outsource Form submission from components into action function
export async function action({ request, params }) {
  // retrieve input value that is captured by react router with `Form`
  const data = await request.formData();
  const method = request.method;

  const eventData = {
    title: data.get('title'), // parameter is based on each element's name attribute
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    url = 'http://localhost:8080/events/' + params.eventId;
  }

  const res = await fetch(url, {
    // retrieve method from 'request' provided by react router
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  // this status '422' is a validation protection check from the backend
  // here, we just return the response from the backend directly at the same page (no redirect)
  // since redirect will cause user lose their input data.
  if (res.status === 422) return res; // res can be access by useActionData

  if (!res.ok) {
    // throw json({ message: 'Could not save event.' }, { status: 500 });
    throw new Response(JSON.stringify({ message: 'Could not save event.' }), {
      status: 500,
    });
  }

  return redirect('/events'); // redirect user to the certain path
}
