import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

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
  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(setIngredientsStore('main'));
  }, [ingredients, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={Styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;