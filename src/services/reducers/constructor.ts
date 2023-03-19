import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DRAG_INGREDIENT,
  SET_TOTAL_PRICE,
} from '../actions/constructor';

import { IIngredient, TConstructorActions } from './constructor.types';

export type TConstructorState = {
  constructorIngredients: IIngredient[],
  bun: IIngredient | null,
  totalPrice: number,
}

const initialState = {
  constructorIngredients: [],
  bun: null,
  totalPrice: 0,
};

export const constructorReducer = (state: TConstructorState = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bun: action.ingredient,
          constructorIngredients: [
            ...state.constructorIngredients
              .filter(({ type }) => type !== 'bun'), action.ingredient, action.ingredient
          ],
        }
      }
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.ingredient],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          ({ id }) => id !== action.ingredient.id
        ),
      };
    }
    case DRAG_INGREDIENT: {
      const state_ = [...state.constructorIngredients];
      const prevIngredient = state_.splice(
        action.hoverIndex,
        1,
        // TODO пока не понял как без as never обойтись
        action.ingredient as never
      );
      state_.splice(action.dragIndex, 1, prevIngredient[0]);
      return {
        ...state,
        constructorIngredients: state_,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return initialState;
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.data,
      };
    }
    default: {
      return state;
    }
  }
};