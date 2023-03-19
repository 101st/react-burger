import { IIngredient } from "../reducers/constructor.types";
import { AppDispatch, AppThunk } from "../store";

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const clearIngredientDetails = (): AppThunk => async (dispatch: AppDispatch) => ({
  type: CLEAR_INGREDIENT_DETAILS
});

export const setIngredientDetails = (ingredient: IIngredient): AppThunk => async (dispatch: AppDispatch) => ({
  type: SET_INGREDIENT_DETAILS,
  ingredient
});