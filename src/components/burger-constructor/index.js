import { useEffect, useState } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "./item";
import IngredientOrderModal from '../order-details';

import Styles from './style.module.scss';

function BurgerConstructor({ data, ingredientsStack }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  }

  useEffect(() => {
    const sum = Object.keys(ingredientsStack).reduce((accumulator, currentValue, index) => {
      const { price } = data.find(i => i._id === currentValue);
      const count = ingredientsStack[currentValue];

      return accumulator + (price * count);
    }, 0);
    setTotalPrice(sum);
  }, [ingredientsStack, data])

  return (
    <div>
      <div className={`${Styles['container']} mt-25`}>
        {Object.keys(ingredientsStack).map((item, key) => {

          let type = undefined;
          let isLocked = undefined;

          if (key === 0) { type = 'top'; isLocked = true };
          if (key === Object.keys(ingredientsStack).length - 1) { type = 'bottom'; isLocked = true };

          return <BurgerConstructorItem
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
        <div className={`${Styles['price']} mt-10`}>
          <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
          <div className={`${Styles['totla-price']}`}><CurrencyIcon type="primary" /></div>
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
  )
}

export default BurgerConstructor;