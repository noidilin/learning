import { uiActions } from './uiSlice';
import { cartActions } from './cartSlice';

export function fetchCartData() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        'https://react-redux-http-6b3d3.firebaseio.com/cart.json',
      );
      if (!res.ok) throw new Error('Fetching cart data failed!');
      const resData = await res.json();

      dispatch(
        cartActions.replaceCart({
          items: resData.items || [],
          totalQuantity: resData.totalQuantity,
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        }),
      );
    }
  };
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }),
    );

    try {
      const res = await fetch(
        'https://react-redux-http-6b3d3.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            // HACK: avoid sending internal field 'changed' to backend
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        },
      );
      if (!res.ok) throw new Error('Sending cart data failed!');
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        }),
      );
    }
  };
}
