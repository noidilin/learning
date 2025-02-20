import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  // useFetcher: interact with action and loader without route transition
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  // therefore, you can trigger an action or loader without actually navigating to the page.
  // and you also won't be redirected to that page after submitting form.
  return (
    <fetcher.Form
      method='post'
      action='/newsletter'
      className={classes.newsletter}
    >
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
