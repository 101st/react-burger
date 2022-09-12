import { useEffect, useState } from 'react';
import { object } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "./burgerConstructorItem";
import Modal from '../Modal/modal';
import OrderDetails from '../OrderDetails/orderDetails';

import { constructorData } from '../../utils/data';

import Styles from './style.module.scss';

function BurgerConstructor() {
  const [isOrderModalOpen, setModalVisible] = useState(false);
  const [bun, setBun] = useState({});

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  useEffect(() => {
    setBun(constructorData.find(({ type }) => type === 'bun'));
  }, [])

  return (
    <div className='mt-25'>
      <div className='pl-6 mr-10'>
        <BurgerConstructorItem
          key={'bun-1'}
          currentItem={{ ...bun, type: 'top', name: bun.name + ' (верх)' }}
          isDraggable={false}
        />
      </div>
      <div className={`${Styles['container']}`}>
        {constructorData.map((currentItem, index) => {
          if (currentItem.type === 'bun') return null;
          return (
            <BurgerConstructorItem
              key={currentItem._id + index}
              currentItem={currentItem}
              isDraggable={true}
            />
          )
        }
        )}
      </div>
      <div className='pl-6 mr-10'>
        <BurgerConstructorItem
          key={'bun-2'}
          currentItem={{ ...bun, type: 'bottom', name: bun.name + ' (низ)' }}
          isDraggable={false} />
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
        <Modal
          title={'Детали ингредиента'}
          isOpen={isOrderModalOpen}
          onClose={handleCloseModal}
        >
          <OrderDetails
            onClose={handleCloseModal}
            setModalVisible={setModalVisible}
            orderId={'034536'}
            name={''}
            status={'Ваш заказ начали шльлвить'}
          />
        </Modal>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: ingredientType,
  ingredientsStack: object,
};

export default BurgerConstructor;