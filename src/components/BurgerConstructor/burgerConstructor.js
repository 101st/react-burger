import { useState } from 'react';
import { object } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "./item";
import Modal from '../Modal/modal';
import OrderDetails from '../OrderDetails/orderDetails';

import { constructorData } from '../../utils/data';

import Styles from './style.module.scss';

function BurgerConstructor() {
  const [isOrderModalOpen, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  return (
    <div>
      <div className={`${Styles['container']} mt-25`}>
        {constructorData.map((currentItem, index) => {
          return (
            <BurgerConstructorItem
              key={currentItem._id + index}
              currentItem={currentItem}
            />
          )
        }
        )}
      </div>
      <div className={`${Styles.order}`}>
        <div className={`${Styles['price']} mt-10`}>
          <span className='text text_type_digits-medium mr-2'>{610}</span>
          <div className={`${Styles['totla-price']}`}><CurrencyIcon type="primary" /></div>
          <div className='ml-10'>
            <Button type="primary" size="medium" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
          </div>
        </div>
        {modalVisible && <IngredientOrderModal
          onClose={handleCloseModal}
          setModalVisible={setModalVisible}
          orderId={'034536'}
          name={''}
          status={'Ваш заказ начали шльлвить'}
        />}
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: ingredientType,
  ingredientsStack: object,
};

export default BurgerConstructor;