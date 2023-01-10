import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer, // 's потому что слово constructor зарезервировано
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  auth: authReducer,
});