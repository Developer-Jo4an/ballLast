import {combineReducers} from '@reduxjs/toolkit'
import user from "./user";
import requests from "./requests";
import auth from './auth'
import game from './game';

const rootReducer = combineReducers({
  [game.name]: game.reducer,
  [auth.name]: auth.reducer,
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
});


export default rootReducer;
