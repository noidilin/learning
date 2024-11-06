const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

// setup initial state as default param in reducer function
export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

// this is a convention that is used a lot in redux code pattern
// it can be also applied to useReducer() workflow
export function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}
