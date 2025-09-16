import { currencyFormatter } from '../util/formatting';

import { useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext';
import CartContext from '../store/CartContext';
import useHttp from '../hooks/useHttp';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import Error from './Error';

// NOTE: needs to placed outside component,
// otherwise this object will be recreated every time the component re-render
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) actions = <span>Sending order data...</span>;

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with ore details via email within the next few
          minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      // NOTE: prevent the state not sync with the UI when close modal with `ESC` key which is a browser feature
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' id='name' type='text' />
        <Input label='E-Mail Address' id='email' type='email' />
        <Input label='Street' id='street' type='text' />
        <div className='control-row'>
          <Input label='Postal Code' id='postal-code' type='text' />
          <Input label='City' id='city' type='text' />
        </div>
        {error && <Error title='Failed to submit order' message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
