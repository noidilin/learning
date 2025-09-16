import { useSelector } from 'react-redux';

function Customer() {
  // It functions like Context API
  // the field 'customer' is defined in the rootReducer
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
