import React from 'react';
import './App.module.scss';

import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredients';

const BASE_URL = 'https://norma.nomoreparties.space'

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`${BASE_URL}/api/ingredients`)
      .then(response => response.json())
      .then(response => response.success && setData(response.data))
      .catch(console.log);
  }, []);
  return <>
    <AppHeader />
    <BurgerIngredients data={data} />
  </>;
}

export default App;