import { nanoid } from 'nanoid';
import { IIngredient } from '../reducers/constructor.types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const DRAG_INGREDIENT = 'DRAG_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export const addIngredient = (ingredient: IIngredient) => {
  const id = nanoid();
  ingredient = { ...ingredient, id };

  return {
    type: ADD_INGREDIENT,
    ingredient,
  };
};

export const dragIngredient = (dragIndex: number | undefined, hoverIndex: number, ingredient: IIngredient) => ({
  type: DRAG_INGREDIENT,
  dragIndex,
  hoverIndex,
  ingredient,
});

export const removeIngredient = (ingredient: IIngredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient,
});

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});

export const setTotalPrice = (totalPrice: number) => ({
  type: SET_TOTAL_PRICE,
  data: totalPrice,
});