import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer, // 's потосу что слово constructor зарезервировано
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});