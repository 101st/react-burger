import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';
import { authReducer } from './auth';

import { TIngredientsState } from './ingredients';
import { TConstructorState } from './constructor';
import { TIngredientDetailsState } from './ingredient-details';
import { TOrderState } from './order';
import { TAuthState } from './auth';

export interface TRootReducer {
  ingredients: TIngredientsState,
  constructors: TConstructorState,
  ingredientDetails: TIngredientDetailsState,
  order: TOrderState,
  auth: TAuthState,
}

export const rootReducer = combineReducers<TRootReducer>({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  auth: authReducer,
});