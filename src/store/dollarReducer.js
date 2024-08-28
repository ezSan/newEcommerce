const initialState = {
    value: null, 
  };
  
  const dollarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DOLLAR_VALUE':
        return {
          ...state,
          value: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dollarReducer;
  