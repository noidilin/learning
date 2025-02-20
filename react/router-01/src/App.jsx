import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Error from './pages/Error';
import Home from './pages/Home';
import Events, { loader as eventsLoader } from './pages/Events';
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootEvent from './pages/RootEvents';
import { action as manipulateEventAction } from './components/EventForm';
import Newsletter, { action as newsletterAction } from './pages/Newsletter';

// the classic way of create route
const router = createBrowserRouter([
  {
    path: '/', // acts like a path dependent layout wrapper
    element: <Root />, // render this JSX code when this route is activated
    errorElement: <Error />,
    children: [
      // index is default displayed route when parent route is active
      { index: true, element: <Home /> },
      {
        path: 'events', // relative path
        element: <RootEvent />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader, // outsource the loader from individual page
          },
          {
            path: ':eventId', // identifier placeholder for useParams to dynamic route
            id: 'event-detail', // for `useRouteLoaderData` to access the specific loader
            loader: eventDetailLoader, // this loader will executed whenever child route is visited
            // restructure route for 'edit' page to access loader, preventing writing same loader in different place
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: manipulateEventAction,
              },
            ],
          },
          { path: 'new', element: <NewEvent />, action: manipulateEventAction },
        ],
      },
      { path: 'newsletter', element: <Newsletter />, action: newsletterAction },
    ],
  },
]);

function App() {
  // <RouterProvider/> is expecting a router object
  // returned from createBrowserRouter
  return <RouterProvider router={router} />;
}

export default App;
