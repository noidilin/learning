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

/* setup multiple pages routing in SPA
 * 1. define route (which path)
 * 2. load the route definition
 * 3. link component to route */

// the classic way of create route
const router = createBrowserRouter([
  {
    path: '/', // acts like a path dependent layout wrapper
    element: <Root />, // render this JSX code when this route is activated
    errorElement: <Error />,
    /* Root wrapper
     * 1. define similar layout structure
     * 2. group similar page into same route */
    children: [
      /* index is the default route that should be displayed
       * if the parent route's path is currently active */
      { index: true, element: <Home /> },
      {
        /* path that don't start with '/' is relative route
         * which will be append after the current route path. */
        path: 'events',
        element: <RootEvent />,
        children: [
          /* loader:
           * This func will be executed by react router when this route is visited
           * even before the page component has been rendered.
           * The advantage of loader is you can rely on the data being there,
           * once the page component is being rendered.
           * Note that higher level route can't access the data returned from loader func. */
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
    ],
  },
]);

function App() {
  // <RouterProvider/> is expecting a router object
  // returned from createBrowserRouter
  return <RouterProvider router={router} />;
}

export default App;
