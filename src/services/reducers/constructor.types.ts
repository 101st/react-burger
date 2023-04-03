import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DRAG_INGREDIENT,
  SET_TOTAL_PRICE,
} from '../actions/constructor';

export interface IIngredient {
  _id: string,
  id?: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number;
  index?: number;
  isLocked?: boolean;
}

type TAddIngredientAction = {
  type: typeof ADD_INGREDIENT,
  ingredient: IIngredient,
};

type TRemoveIngredientAction = {
  type: typeof REMOVE_INGREDIENT,
  ingredient: IIngredient,
};

type TClearConstructor = {
  type: typeof CLEAR_CONSTRUCTOR,
};

type TDragIngredient = {
  type: typeof DRAG_INGREDIENT,
  hoverIndex: number,
  dragIndex: number,
  ingredient: IIngredient | never,
};

type TSetTotalPrice = {
  type: typeof SET_TOTAL_PRICE,
  data: number
};

export type TConstructorActions = (
  TAddIngredientAction |
  TRemoveIngredientAction |
  TClearConstructor |
  TDragIngredient |
  TSetTotalPrice
);