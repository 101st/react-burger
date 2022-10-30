import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import {
  setIngredientsStore,
  getIngredients,
} from '../../services/actions/ingredients';
import {
  clearIngredientDetails
} from '../../services/actions/ingredient-details';

import Styles from './app.module.scss';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProfileForm from '../../pages/profile/profile-form';
import ProfileOrders from '../../pages/profile/profile-orders';
import ProtectedRoute from '../protected-route/protected-route';
import NotFound from '../../pages/not-found/not-found';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  const {
    ingredients,
    getIngredientsRequest,
    getIngredientsFailed,
  } = useSelector((store) => store.ingredients);

  const handleModalClose = () => {
    dispatch(clearIngredientDetails());
    history.goBack();
  };

  useEffect(() => {
    dispatch(setIngredientsStore('main'));
  }, [ingredients, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path='/ingredients/:_id' exact>
          <IngredientDetails />
        </Route>
        <Route exact path='/login'><Login /></Route>
        <Route exact path='/register'><Register /></Route>
        <Route exact path='/forgot-password'><ForgotPassword /></Route>
        <Route exact path='/reset-password'><ResetPassword /></Route>
        <Route exect path='/orders-feed'><div></div></Route>
        <ProtectedRoute exect path='/profile/orders/:id'><div></div></ProtectedRoute>
        <ProtectedRoute exect path='/profile/orders'>
          <Profile>
            <ProfileOrders />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute exect path='/profile'>
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <Route><NotFound /></Route>
      </Switch>
      {background && (
        <Route path='/ingredients/:_id'>
          <Modal
            title='Детали ингредиента'
            onClose={handleModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;