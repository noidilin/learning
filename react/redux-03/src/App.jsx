import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { fetchCartData, sendCartData } from './store/cartActions';

let isInitial = true;

function App() {
  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // BUG: still brake backend code in strict mode
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]); // react-redux will ensure that dispatch will never change.

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
