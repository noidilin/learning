import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: 'e1', title: 'event 1' },
  { id: 'e2', title: 'event 2' },
];

function Event() {
  return (
    <>
      <h1>event</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Event;
