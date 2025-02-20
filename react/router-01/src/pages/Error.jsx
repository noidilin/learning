import { useRouteError } from 'react-router-dom';
import MainNav from '../components/MainNav';
import PageContent from '../components/PageContent';

function Error() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  // throw a response object in loader function
  // allow useRouteError to access 'status' field automatically
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNav />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default Error;
