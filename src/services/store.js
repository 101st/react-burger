import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";

import { rootReducer } from './reducers';

const enhancer = applyMiddleware(thunk);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer]
});