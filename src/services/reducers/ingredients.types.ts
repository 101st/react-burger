import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
} from '../actions/ingredients';
import { IIngredient } from './constructor.types';

type TGetIngredientsActions = {
  type: (typeof GET_INGRIDIENTS_REQUEST | typeof GET_INGRIDIENTS_FAILED),
};

type TGetIngredientsSuccessAction = {
  type: typeof GET_INGRIDIENTS_SUCCESS,
  ingredients: IIngredient[],
};

export type TIngredientsActions = (
  TGetIngredientsActions |
  TGetIngredientsSuccessAction
);