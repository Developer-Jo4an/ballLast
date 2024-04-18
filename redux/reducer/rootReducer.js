import {combineReducers} from '@reduxjs/toolkit'
import user from "./user";
import requests from "./requests";
import auth from './auth'

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
});


export default rootReducer;
