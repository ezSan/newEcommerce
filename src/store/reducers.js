// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import dollarReducer from './dollarReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  dollar: dollarReducer, 
});

export default rootReducer;
