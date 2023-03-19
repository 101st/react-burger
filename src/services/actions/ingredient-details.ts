import { AppDispatch, AppThunk } from "../store";

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const clearIngredientDetails: AppThunk = () => (dispatch: AppDispatch) => dispatch({
  type: CLEAR_INGREDIENT_DETAILS
});