import { currencyFormatter } from '../util/formatting';

import { useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext';
import CartContext from '../store/CartContext';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      // NOTE: prevent the state not sync with the UI when close modal with `ESC` key which is a browser feature
      // since progress changed from cart to checkout will also trigger onClose, we need to add a condition
      onClose={userProgressCtx.progress === 'cart' ? handleClose : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' id='full-name' type='text' />
        <Input label='E-Mail Address' id='email' type='email' />
        <Input label='Street' id='street' type='text' />
        <div className='control-row'>
          <Input label='Postal Code' id='postal-code' type='text' />
          <Input label='City' id='city' type='text' />
        </div>
        <p className='modal-actions'>
          <Button type='button' textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
