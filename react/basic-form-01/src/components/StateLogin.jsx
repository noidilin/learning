import { Input } from 'postcss';
import { useState } from 'react';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

// NOTE: when you want to listen and validate every change.
export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // NOTE: validate every keystroke
  // const emailIsInvalid =
  //   enteredValues.email !== '' && !enteredValues.email.includes('@');

  // NOTE: validate when lose focus
  const emailIsInvalid =
    didEdit.email !== '' &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && hasMinLength(enteredValues.password, 6);

  function handleSubmit(e) {
    e.preventDefault();
    setEnteredValues({
      email: '',
      password: '',
    });
  }

  function handleInputChange(e, identifier) {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: e.target.value,
    }));
    // NOTE: reset state when user start typing again.
    setDidEdit((prev) => ({ ...prev, [identifier]: false }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prev) => ({ ...prev, [identifier]: true }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onBlur={() => handleInputBlur('email')}
          onChange={(e) => handleInputChange(e, 'email')}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email!'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={() => handleInputBlur('password')}
          onChange={(e) => handleInputChange(e, 'password')}
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please enter a valid password!'}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
