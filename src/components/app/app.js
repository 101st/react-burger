import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route } from 'react-router-dom';

import {
  setIngredientsStore,
  getIngredients,
} from '../../services/actions/ingredients';

import Styles from './app.module.scss';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';

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
      <Switch>
        <Route exact path='/'>
          <DndProvider backend={HTML5Backend}>
            <div className={Styles.container}>
              {getIngredientsRequest && 'Загрузка ингредиентов...'}
              {getIngredientsFailed && 'Ошибка: Загрузка ингредиентов!'}
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
        </Route>
        <Route exact path='/login'><Login /></Route>
        <Route exact path='/register'><Register /></Route>
        <Route exact path='/forgot-password'><ForgotPassword /></Route>
        <ProtectedRoute exact path='/reset-password'><ResetPassword /></ProtectedRoute>
        <ProtectedRoute exect path='/profile/orders'><div>FEED</div></ProtectedRoute>
        <ProtectedRoute exect path='/profile'><Profile /></ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;