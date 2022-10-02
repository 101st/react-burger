import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "./burger-constructor-item";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { addIngredient } from '../../services/actions/constructor';

import Styles from './style.module.scss';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { constructorIngredients, bun } = useSelector(store => store.constructors);

  const [isOrderModalOpen, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'INGREDIENT',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  });

  const boxShadowColor = isHover ? "#4c4cff90" : "transparent";

  return (
    <div className='mt-25' ref={dropTarget}
      style={{ boxShadow: `inset 0px 0px 72px -35px ${boxShadowColor}`, paddingTop: bun ? 0 : '96px' }}>
      <div className={`${Styles.bun} ml-6 pr-4`}>
        {bun && <BurgerConstructorItem
          key={'bun-1'}
          ingredient={{ ...bun, type: 'top', name: bun.name + ' (верх)', isLocked: true }}
        />}
      </div>
      <div className={`${Styles['container']} pr-4`} style={{ marginBottom: bun ? 0 : '96px' }}>
        {constructorIngredients.map((item, index) => {
          if (item.type === 'bun') return null;
          return (
            <BurgerConstructorItem
              key={item.id}
              ingredient={item}
              index={index}
              isDraggable={true}
            />
          )
        })}
      </div>
      <div className={`${Styles.bun} ml-6 mt-4 pr-4`}>
        {bun && <BurgerConstructorItem
          key={'bun-2'}
          ingredient={{ ...bun, type: 'bottom', name: bun.name + ' (низ)', isLocked: true }}
        />}
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
          title={''}
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