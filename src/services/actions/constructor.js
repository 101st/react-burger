import { nanoid } from "nanoid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const DRAG_INGREDIENT = "DRAG_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const addIngredient = (ingredient) => {
  const id = nanoid();
  ingredient = { ...ingredient, id };

  return {
    type: ADD_INGREDIENT,
    ingredient,
  };
};

export const dragIngredient = (dragIndex, hoverIndex, ingredient) => ({
  type: DRAG_INGREDIENT,
  dragIndex,
  hoverIndex,
  ingredient,
});

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient,
});

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});