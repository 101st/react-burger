import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import {
  getIngredients,
} from '../../services/actions/ingredients';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedItemDetails from '../feed-item-details/feed-item-details';
import Modal from '../modal/modal';

import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProfileForm from '../../pages/profile/profile-form';
import ProfileOrders from '../../pages/profile/profile-orders';
import ProtectedRoute from '../protected-route/protected-route';
import { Feed } from '../../pages/feed/feed';
import NotFound from '../../pages/not-found/not-found';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = (location.state as any)?.background;
  const {
    ingredients,
    getIngredientsRequest,
    getIngredientsFailed,
  } = useAppSelector(store => store.ingredients);

  const handleModalClose = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={Styles.layout}>
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
          <ProtectedRoute auth exact path='/login'><Login /></ProtectedRoute>
          <ProtectedRoute auth exact path='/register'><Register /></ProtectedRoute>
          <ProtectedRoute auth exact path='/forgot-password'><ForgotPassword /></ProtectedRoute>
          <ProtectedRoute auth exact path='/reset-password'><ResetPassword /></ProtectedRoute>
          <Route exact path='/feed'><Feed /></Route>
          <Route path='/feed/:_id' exact><FeedItemDetails /></Route>
          <ProtectedRoute exact path='/profile/orders/:_id'><FeedItemDetails /></ProtectedRoute>
          <ProtectedRoute exact path='/profile/orders'>
            <Profile>
              <ProfileOrders />
            </Profile>
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile'>
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
      </div>

      {background && (
        <Route path='/feed/:_id'>
          <Modal
            onClose={handleModalClose}>
            <FeedItemDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path='/profile/orders/:_id'>
          <Modal
            onClose={handleModalClose}>
            <FeedItemDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;