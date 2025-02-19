import { Suspense } from 'react';
import { Await, redirect, useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetail() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>{' '}
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetail;

async function loadEvent(id) {
  const res = await fetch('http://localhost:8080/events/' + id);

  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch details for selected event.',
      }),
      { status: 500 },
    );
  } else {
    const data = await res.json();
    return data.event;
  }
}

async function loadEvents() {
  const res = await fetch('http://localhost:8080/events');
  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch events.',
      }),
      { status: 500 },
    );
  } else {
    const data = await res.json();
    return data.events;
  }
}

// this loader can fetch data from backend based on dynamic routes
// loader func will automatically receive an object that can be destructured, which contains params value
export async function loader({ params }) {
  const id = params.eventId; // we can access params without react hooks
  return {
    event: await loadEvent(id), // `await` make sure this data to be loaded before navigating to the page
    events: loadEvents(), // load this after the page is loaded
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const res = await fetch('http://localhost:8080/events/' + eventId, {
    // retrieve method from 'request' provided by react router
    method: request.method,
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event' }), {
      status: 500,
    });
  }

  return redirect('/events');
}
