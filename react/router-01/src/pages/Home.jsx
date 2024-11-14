// change url without sending a new http request
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='/products'>the list of products</Link>.
      </p>
    </>
  );
}

export default Home;
