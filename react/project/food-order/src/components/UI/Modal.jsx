import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// NOTE: default value to prevent className becomes undefined
function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    // NOTE: recommended pattern that makes sure the ref is lock in with the modal
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    // NOTE: since the clean up function runs at different moment,
    // there are chances that dialog.current is referring to different thing.
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
}

export default Modal;
