import { useRef, useState } from 'react';

export default function Login() {
  const [emailIsValid, setEmailIsValid] = useState(true);

  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    // NOTE: reset value with useRef is harder that useState
    // email.current.value = '' is not recommended.
    const enteredEmail = email.current.value;
    const enteredPassword = email.current.value;

    setEmailIsValid(enteredEmail.includes('@'));

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
