import { nanoid } from 'nanoid';
import { IIngredient } from '../reducers/constructor.types';
import { AppDispatch, AppThunk } from '../store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const DRAG_INGREDIENT = 'DRAG_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export const addIngredient: AppThunk = (ingredient: IIngredient) => (dispatch: AppDispatch) => {
  const id = nanoid();
  ingredient = { ...ingredient, id };

  dispatch({
    type: ADD_INGREDIENT,
    ingredient,
  })
};

export const dragIngredient: AppThunk = (
  dragIndex: number | undefined,
  hoverIndex: number,
  ingredient: IIngredient
) => (dispatch: AppDispatch) => dispatch({
  type: DRAG_INGREDIENT,
  dragIndex,
  hoverIndex,
  ingredient,
});

export const removeIngredient: AppThunk = (ingredient: IIngredient) => (dispatch: AppDispatch) => {
  dispatch({
    type: REMOVE_INGREDIENT,
    ingredient,
  })
};

export const clearConstructor: AppThunk = () => (dispatch: AppDispatch) => dispatch({ type: CLEAR_CONSTRUCTOR });

export const setTotalPrice: AppThunk = (totalPrice: number) => (dispatch: AppDispatch) => dispatch({
  type: SET_TOTAL_PRICE,
  data: totalPrice,
});