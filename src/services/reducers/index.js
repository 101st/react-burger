import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer, // 's потосу что слово constructor зарезервировано
});