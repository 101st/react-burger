export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const clearIngredientDetails = () => ({
  type: CLEAR_INGREDIENT_DETAILS
});

export const setIngredientDetails = (ingredient) => ({
  type: SET_INGREDIENT_DETAILS,
  ingredient
});