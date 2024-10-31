/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react';

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    // NOTE: working on this temp array, and finally replace the one in the state.
    const updatedItems = [...state.items];
    const existingItem = state.items[existingCartItemIndex];

    // NOTE: check if item already exist in the list
    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    // NOTE: working on this temp array, and finally replace the one in the state.
    const updatedItems = [...state.items];
    const existingItem = state.items[existingCartItemIndex];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

// NOTE: context makes component having access to the state
export function CartContextProvider({ children }) {
  // NOTE: reducer organize complex states
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(item) {
    dispatchCartAction({ type: 'REMOVE_ITEM', item });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const initContext = { items: cart.items, addItem, removeItem, clearCart };

  return (
    <CartContext.Provider value={initContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
