// change url without sending a new http request
import { Link } from 'react-router-dom';
import PageContent from '../components/PageContent';

function Home() {
  return (
    <PageContent title='Welcome!'>
      <p>
        Go to <Link to='events'>the list of products</Link>.
      </p>
      {/* SPA and router:
       * this will send a HTTP request when the link is clicked. */}
      <p>
        Go to <a href='/events'>events (link with anchor attribute) </a>.
      </p>
    </PageContent>
  );
}

export default Home;
