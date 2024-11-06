// we can write mutate code within createSlice, and package 'immer' will
// convert it to immuate code for us behind the scene.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // the actions created by RTK can only accepted one argument
      // if you want to accept more than one argument, you have to turn this
      // action into object, and setup a `prepare()` method to define a payload object
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// use old action function for simplicity in this case.
export function deposit(amount, currency) {
  // value comes from value attribute in the option element tag
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  // if we return a function here redux knows that this is a async action that needs to execute
  // before dispatch anything to store.
  return async (dispatch, getState) => {
    // note that the dispatch function can still be trigger in any time
    dispatch({ type: 'account/convertingCurrency' });

    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // delay dispatch function until async task is finished
    dispatch({ type: 'account/deposit', payload: converted });
  };
}
