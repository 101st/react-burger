import { useState, useEffect } from 'react';
import Styles from './style.module.scss';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const BASE_URL = 'https://norma.nomoreparties.space'

function App() {
  const [data, setData] = useState([]);
  const [currentIngredientType, setCurrentIngredientType] = useState('main');
  const [ingredientsStore, setIngredientsStore] = useState(() =>
    data.filter(item => item.type === currentIngredientType));

  useEffect(() => {
    setIngredientsStore(data.filter(item => item.type === currentIngredientType))
  }, [data, currentIngredientType])

  useEffect(() => {
    fetch(`${BASE_URL}/api/ingredients`)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error(`Ошибка запроса к серверу. Код ${response?.status}`);
      })
      .then(response => {
        if (response.success)
          setData(response.data);
        else
          throw new Error('Ошибка ответа сервера');
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <AppHeader />
      <div className={Styles.container}>
        <BurgerIngredients
          currentIngredientType={currentIngredientType}
          setCurrentIngredientType={setCurrentIngredientType}
          ingredientsStore={ingredientsStore}
        />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;