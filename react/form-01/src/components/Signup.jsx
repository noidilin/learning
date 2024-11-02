import { useState } from 'react';

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // NOTE: FormData is a browser API
    // input field should have their 'name' prop setup in order to make the API works
    // like, fd.get('email')...
    const fd = new FormData(event.target);

    // NOTE: fd.entries() to shape the param, and use Object.fromEntries to format object.
    // however this method will lost multi-value input field.
    const data = Object.fromEntries(fd.entries());

    // NOTE: therefore we need to manually restore them
    // getAll() return multi-value from the fields that has same name.
    const acquisitionChannel = fd.getAll('acquisition');
    // NOTE: merge the data we manually retrive into our data obj.
    data.acquisition = acquisitionChannel;

    if (data.password !== data['confirm-password']) {
      setPasswordsAreNotEqual(true);
      return;
    }

    // NOTE: reset using event
    // event.target.reset();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        {/* NOTE: 'required' allows browser to validate the form field */}
        <input id='email' type='email' name='email' required />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            required
          />
          <div className='control-error'>
            {passwordsAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' required />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role' required>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        {/* NOTE: set button type to reset to reset the html form */}
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Sign up
        </button>
      </p>
    </form>
  );
}
