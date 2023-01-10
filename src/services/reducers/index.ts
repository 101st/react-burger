import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';
import { authReducer } from './auth';

import { TAuthState } from './auth';

export interface TRootReducer {
  ingredients: any,
  constructors: any,
  ingredientDetails: any,
  order: any,
  auth: TAuthState,
}

export const rootReducer = combineReducers<TRootReducer>({
  ingredients: ingredientsReducer,
  constructors: constructorReducer, // 's потому что слово constructor зарезервировано
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  auth: authReducer,
});