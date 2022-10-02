import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer, // 's потосу что слово constructor зарезервировано
  ingredientDetails: ingredientDetailsReducer,
});