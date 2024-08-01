const initialState = {
    user: null,
    isAuthenticated: false,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  }
  