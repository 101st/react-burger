import {
  CLEAR_INGREDIENT_DETAILS,
  SET_INGREDIENT_DETAILS,
} from '../actions/ingredient-details';
import { IIngredient } from './constructor.types';

type TClearIngredientDetails = {
  type: typeof CLEAR_INGREDIENT_DETAILS,
  ingredient: IIngredient,
};

type TSetIngredientDetails = {
  type: typeof SET_INGREDIENT_DETAILS,
  ingredient: IIngredient,
};

export type TIngredientDetailsActions = (
  TClearIngredientDetails |
  TSetIngredientDetails
);