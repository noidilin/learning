/* eslint-disable react/prop-types */

import { connect } from 'react-redux';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className='balance'>{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

// connect() will return a function which accept BalanceDisplay as an argument
// then it will return a new component based on BalanceDisplay, while it can access
// to the balance state as props
export default connect(mapStateToProps)(BalanceDisplay);
