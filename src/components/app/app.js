import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  setIngredientsStore,
  getIngredients,
} from '../../services/actions/ingredients';

import Styles from './style.module.scss';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const dispatch = useDispatch();
  const {
    ingredients,
    getIngredientsRequest,
    getIngredientsFailed,
  } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(setIngredientsStore('main'));
  }, [ingredients, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={Styles.container}>
          {getIngredientsRequest && "Загрузка ингредиентов..."}
          {getIngredientsFailed && "Ошибка: Загрузка ингредиентов!"}
          {
            !getIngredientsRequest
            && !getIngredientsFailed
            && ingredients.length
            && <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>}
        </div>
      </DndProvider>
    </>
  );
}

export default App;