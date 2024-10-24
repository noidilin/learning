import { currencyFormatter } from '../util/formatting';

import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className='cart'
      open={userProgressCtx.progress === 'cart'}
      // NOTE: prevent the state not sync with the UI when close modal with `ESC` key which is a browser feature
      onClose={handleClose}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item)}
          />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout </Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
