import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderDetailsLoader from '../order-details/order-details-loader';
import { addIngredient, setTotalPrice } from '../../services/actions/constructor';
import { getOrder } from '../../services/actions/order';
import { CLEAR_ORDER } from '../../services/actions/order';
import { getCookie } from '../../utils/cookies';

import { IIngredient } from '../../interfaces/common';

import Styles from './burger-constructor.module.scss';

function BurgerConstructor() {
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const { constructorIngredients, bun, totalPrice } = useSelector((store: any) => store.constructors);
  const { getOrderRequest, isOpen, name, order } = useSelector((store: any) => store.order);

  const [withBun, setWithBun] = useState(null);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'INGREDIENT',
    drop(item: IIngredient) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  });

  const ingredientsId = useMemo(() => {
    return constructorIngredients.map((ingredient: IIngredient) => ingredient._id);
  }, [constructorIngredients]);

  const boxShadowColor = isHover ? '#4c4cff90' : 'transparent';

  useEffect(() => {
    const totalPrice = constructorIngredients.reduce((acc: number, element: IIngredient) => {
      if (element.type === 'bun') {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, 0);
    dispatch(setTotalPrice(totalPrice));
    setWithBun(constructorIngredients.some((ingredient: IIngredient) => ingredient.type === 'bun'));
  }, [constructorIngredients, dispatch]);

  return (
    <div className='mt-25' ref={dropTarget}
      style={{ boxShadow: `inset 0px 0px 72px -35px ${boxShadowColor}`, paddingTop: bun ? 0 : '96px' }}>
      <div className={`${Styles.bun} ml-6 pr-4`}>
        {bun && <BurgerConstructorItem
          key={'bun-1'}
          ingredient={{ ...bun, name: bun.name + ' (????????)', isLocked: true }}
          isDraggable={false}
          index={0}
          position={'top'} />}
      </div>
      <div className={`${Styles['container']} pr-4`} style={{ marginBottom: bun ? 0 : '96px' }}>
        {constructorIngredients.map((item: IIngredient, index: number) => {
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
          ingredient={{ ...bun, name: bun.name + ' (??????)', isLocked: true }}
          isDraggable={false}
          index={0}
          position={'bottom'} />}
      </div>
      <div className={`${Styles.order}`}>
        <div className={`${Styles['price']} mt-10`}>
          <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
          <div className={`${Styles['totla-price']}`}><CurrencyIcon type='primary' /></div>
          <div className='ml-10'>
            <Button type='primary' htmlType='button' size='medium'
              onClick={() => {
                if (!getCookie('accessToken'))
                  history.push('/login');
                else
                  dispatch(getOrder(ingredientsId));
              }}
              disabled={!withBun}
            >
              ???????????????? ??????????
            </Button>
          </div>
        </div>
        {isOpen && <Modal
          title={''}
          onClose={() => dispatch({ type: CLEAR_ORDER })}
        >
          {getOrderRequest
            ? <OrderDetailsLoader />
            : <OrderDetails
              orderId={order?.number | 1}
              status={`?????? ?????????? '${name}' ???????????? ????????????????`}
            />}
        </Modal>}
      </div>
    </div >
  )
}

export default BurgerConstructor;