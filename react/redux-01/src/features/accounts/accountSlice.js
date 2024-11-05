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

// // setup initial state as default param in reducer function
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return { ...state, balance: state.balance - action.payload };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     case 'account/convertingCurrency':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     // redux don't recommend to throw error at default block
//     default:
//       return state;
//   }
// }
//
// // this is a convention that is used a lot in redux code pattern
// // it can be also applied to useReducer() workflow
// export function deposit(amount, currency) {
//   // value comes from value attribute in the option element tag
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//
//   // if we return a function here redux knows that this is a async action that needs to execute
//   // before dispatch anything to store.
//   return async (dispatch, getState) => {
//     // note that the dispatch function can still be trigger in any time
//     dispatch({ type: 'account/convertingCurrency' });
//
//     // API call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//
//     // delay dispatch function until async task is finished
//     dispatch({ type: 'account/deposit', payload: converted });
//   };
// }
//
// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }
//
// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount: amount, purpose: purpose },
//   };
// }
//
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }
