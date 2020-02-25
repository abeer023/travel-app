import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import userReducer from './userReducer';

export default combineReducers({  
  cities: cityReducer,
  auth: userReducer  
});
