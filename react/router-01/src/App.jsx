import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Error from './pages/Error';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

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
      /* path that don't start with '/' is relative route
       * which will be append after the current route path. */
      { path: 'products', element: <Products /> },
      // identifier placeholder for useParams to dynamic route
      { path: 'products/:productId', element: <ProductDetail /> },
    ],
  },
]);

function App() {
  // <RouterProvider/> is expecting a router object
  // returned from createBrowserRouter
  return <RouterProvider router={router} />;
}

export default App;
