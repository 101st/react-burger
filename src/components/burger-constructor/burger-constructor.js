import { useEffect, useState } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "./burger-constructor-item";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

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
      <div className={`${Styles.bun} ml-6 pr-4`}>
        <BurgerConstructorItem
          key={'bun-1'}
          currentItem={{ ...bun, type: 'top', name: bun.name + ' (верх)' }}
        />
      </div>
      <div className={`${Styles['container']} pr-4`}>
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
      <div className={`${Styles.bun} ml-6 mt-4 pr-4`}>
        <BurgerConstructorItem
          key={'bun-2'}
          currentItem={{ ...bun, type: 'bottom', name: bun.name + ' (низ)' }}
        />
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
            orderId={'034536'}
            status={'Ваш заказ начали шльлвить'}
          />
        </Modal>
      </div>
    </div>
  )
}

export default BurgerConstructor;