import { useRouteError } from 'react-router';
import { useNavigate } from 'react-router';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button type='submit' onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
