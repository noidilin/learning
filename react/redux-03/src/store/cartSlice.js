import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const { id, title, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;

      if (!existingItem)
        state.items.push({
          id,
          title,
          price,
          totalPrice: price,
          quantity: 1,
        });

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1)
        state.items = state.items.filter((item) => item.id !== id);

      if (existingItem.quantity >= 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
