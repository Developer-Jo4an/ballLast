import {combineReducers} from '@reduxjs/toolkit'
import user from "./user";
import requests from "./requests";
import todos from './todos'
import auth from './auth'

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [todos.name]: todos.reducer,
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
});


export default rootReducer;
