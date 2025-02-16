import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Event() {
  const data = useLoaderData();

  if (data.isError) return <p>{data.message}</p>;
  return <EventsList events={data.events} />;
}

export default Event;

// structure loader with the related page makes router in app.jsx cleaner
export async function loader() {
  // hooks only available in react components, therefore can't use in loader
  const res = await fetch('http://localhost:8080/events');

  if (!res.ok) {
    // react router will render the cloeset errorElement.
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    // react router will resolve the return promise for you.
    return res;
  }
}
