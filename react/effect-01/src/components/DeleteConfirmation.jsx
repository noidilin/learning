/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => onConfirm(), TIMER);

    // NOTE: execute when component is unmounted.
    return () => {
      clearTimeout(timer);
    };
    // NOTE: be careful when adding function or object as dependency, it might result in infinite loop!
    // implement useCallback() to fix the function.
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button onClick={onCancel} className='button-text'>
          No
        </button>
        <button onClick={onConfirm} className='button'>
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}

export default DeleteConfirmation;
