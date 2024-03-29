import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './ws';

import { TIngredientsState } from './ingredients';
import { TConstructorState } from './constructor';
import { TIngredientDetailsState } from './ingredient-details';
import { TOrderState } from './order';
import { TAuthState } from './auth';
import { TWsState } from './ws';

import { TAuthActions } from './auth.types';
import { TIngredientsActions } from './ingredients.types';
import { TConstructorActions } from './constructor.types';
import { TIngredientDetailsActions } from './ingredient-details.types';
import { TOrderActions } from './order.types';
import { TWsActions } from './ws.types';

export interface IRootReducer {
  ingredients: TIngredientsState,
  constructors: TConstructorState,
  ingredientDetails: TIngredientDetailsState,
  order: TOrderState,
  auth: TAuthState,
  ws: TWsState,
}

export const rootReducer = combineReducers<IRootReducer>({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  auth: authReducer,
  ws: wsReducer,
});

export type TAppActions =
| TIngredientsActions
| TConstructorActions
| TIngredientDetailsActions
| TOrderActions
| TAuthActions
| TWsActions