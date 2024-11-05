import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// we have the same feature set up like 'store-createStore.jsx', but within
// only one function call
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
