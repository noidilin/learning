/* eslint-disable react/prop-types */

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  // NOTE: expose the method to parent component
  useImperativeHandle(ref, () => {
    return {
      open() {
        // NOTE: showModal() is a method provided by dialog element
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    // NOTE: useful tailwind syntax for setup modal backdrop
    <dialog
      ref={dialog}
      className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'
    >
      {children}
      {/* NOTE: html syntax that allows user to close modal */}
      <form method='dialog' className='mt-4 text-right'>
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root'),
  );
});

export default Modal;
