// change url without sending a new http request
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='events'>the list of products</Link>.
      </p>
      {/*  this will send a HTTP request when the link is clicked.
      <p>
        Go to <a href='/events'>events (link with anchor attribute) </a>.
      </p>
      */}
    </>
  );
}

export default Home;
