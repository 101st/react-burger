import React, { useEffect, useState } from 'react';
import { Tab, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientItem from './burger-ingredient-item';
import BurgerIngredientItemStack from '../burger-constructor';
import IngredientOrderModal from './ingredient-order-modal';

import Styles from './style.module.scss';

const INGREDIENTS_TITLE_MAPPING = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState('main');
  const [ingredientsStore, setIngredientsStore] = React.useState(() => data.filter(item => item.type === current));
  const [ingredientsStack, setIngredientsStack] = React.useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);


  const ingredientClickHandler = e => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    if (ingredientsStack[id] === undefined) {
      setIngredientsStack({
        ...ingredientsStack,
        ...{ [id]: 1 }
      })
      return;
    }

    setIngredientsStack({
      ...ingredientsStack,
      ...{ [id]: ingredientsStack[id] + 1 }
    })
  }


  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  }

  useEffect(() => {
    setIngredientsStore(data.filter(item => item.type === current))
  }, [current, data]);

  useEffect(() => {
    const sum = Object.keys(ingredientsStack).reduce((accumulator, currentValue, index) => {
      const { price } = data.find(i => i._id === currentValue);
      const count = ingredientsStack[currentValue];

      return accumulator + (price * count);
    }, 0);
    setTotalPrice(sum);
  }, [ingredientsStack, data])

  return <div className={Styles.container}>
    <div className='mr-10'>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>

      <div className={`${Styles.tabs} mb-10`}>
        {Object.keys(INGREDIENTS_TITLE_MAPPING)
          .map(item => <Tab key={`tabs-key-${item}`} value={item} active={current === item} onClick={setCurrent}>
            {INGREDIENTS_TITLE_MAPPING[item]}
          </Tab>)}
      </div>

      <div className='mb-6'>
        <h2>{INGREDIENTS_TITLE_MAPPING[current]}</h2>
      </div>

      <div className={`${Styles['ingredients-store-container']} pt-6 pl-4 pr-4`}>
        {ingredientsStore.map(item =>
          <BurgerIngredientItem
            onClickHandler={ingredientClickHandler}
            key={item._id} {...item} count={ingredientsStack[item._id]}
          />
        )}
      </div>

    </div>
    <div>
      <div className={`${Styles['ingredients-stack-container']} mt-25`}>
        {Object.keys(ingredientsStack).map((item, key) => {

          let type = undefined;
          let isLocked = undefined;

          if (key === 0) { type = 'top'; isLocked = true };
          if (key === Object.keys(ingredientsStack).length - 1) { type = 'bottom'; isLocked = true };

          return <BurgerIngredientItemStack
            key={item}
            {...data.find(i => i._id === item)}
            count={ingredientsStack[item]}
            type={type}
            isLocked={isLocked}
          />
        }
        )}
      </div>
      <div className={`${Styles.order}`}>
        <div className={`${Styles['item-price']} mt-10`}>
          <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
          <div className={`${Styles['totla-proce']}`}><CurrencyIcon type="primary" /></div>
          <div className='ml-10'>
            <Button type="primary" size="medium" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
          </div>
        </div>
        {modalVisible && <IngredientOrderModal
          onClose={handleCloseModal}
          orderId={'034536'}
          name={''}
          status={'Ваш заказ начали шльлвить'}
        />}
      </div>

    </div>
  </div>
}

export default BurgerIngredients;