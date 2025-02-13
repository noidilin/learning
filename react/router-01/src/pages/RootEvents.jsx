import { Outlet } from 'react-router-dom';
import EventsNav from '../components/EventsNav';

function RootEvent() {
  return (
    <>
      <EventsNav />
      <Outlet />
    </>
  );
}

export default RootEvent;
