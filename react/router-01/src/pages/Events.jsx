import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function Event() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default Event;

async function loadEvents() {
  // hooks only available in react components, therefore can't use in loader
  const res = await fetch('http://localhost:8080/events');

  if (!res.ok) {
    // react router will render the cloeset errorElement.
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    // although react router will resolve the return promise for you,
    // so you can return promise like this: `return res`
    // however, we're going to pass loadEvents func to our loader to defer it
    // we have to resolve it here
    const data = await res.json();
    return data.events;
  }
}

// structure loader with the related page makes router in app.jsx cleaner
export async function loader() {
  // defer shines when you have pages with multiple HTTP request with different speeds.
  return { events: loadEvents() };
}
