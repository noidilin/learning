import { useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetail() {
  const data = useRouteLoaderData('event-detail');
  return <EventItem event={data.event} />;
}

export default EventDetail;

// this loader can fetch data from backend based on dynamic routes
// loader func will automatically receive an object that can be destructured, which contains params value
export async function loader({ request, params }) {
  const id = params.eventId; // we can access params without react hooks
  const res = await fetch('http://localhost:8080/events/' + id);

  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch details for selected event.',
      }),
      { status: 500 },
    );
  } else {
    return res;
  }
}
