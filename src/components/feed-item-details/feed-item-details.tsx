import { useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { IIngredient } from '../../services/reducers/constructor.types'
import Styles from './feed-item-details.module.scss';
import { TOrder } from '../../services/reducers/order.types';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getWsConnectionClosedAction, getWsConnectionStartAction } from '../../services/actions/ws';
import { WS_ORDER_URL } from '../../utils/const';

type TIngredientGroup = { item: IIngredient; count: number };

const group = (ingredients: IIngredient[], currentOrder: { ingredients: string[] }): TIngredientGroup[] => {
  let filtredIngredients = [];
  for (const value of currentOrder.ingredients) {
    const ing = ingredients.find(i => i._id === value);
    if (ing) {
      filtredIngredients.push(ing);
    }
  }

  const acc: TIngredientGroup[] = [];
  filtredIngredients.forEach(i => {
    let grp = acc.find(g => g.item._id === i._id);
    if (!grp) {
      grp = { item: i, count: 0 };
      acc.push(grp);
    }
    grp.count++;
  });
  return acc;
}

const FeedItemDetails = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { _id: id } = useParams<{ _id: string }>();
  const { ingredients } = useAppSelector(store => store.ingredients);
  const { commonFeed, userFeed, wsConnected } = useAppSelector(store => store.ws);
  const [orders, setOrders] = useState<TOrder[]>([]);

  const [currentOrder, setCurrentOrder] = useState<TOrder>();
  const [addInfo, setAddInfo] = useState<{ price: number, date: Date } | null>(null);
  const [groups, setGroups] = useState<TIngredientGroup[]>([]);

  useEffect(() => {

    if (!ingredients) return;
    if (!orders) return;
    const currentOrder = orders.find((o: TOrder) => o._id === id);

    if (!currentOrder) return;
    setCurrentOrder(currentOrder);
    const groups = group(ingredients, currentOrder);
    setGroups(groups);
    const price = groups.map(g => g.item.price * g.count).reduce((acc, n) => acc += n);
    const date = new Date(currentOrder.createdAt);
    setAddInfo({ price, date });

  }, [orders, id, ingredients]);

  useEffect(() => {

    if (wsConnected) return;

    if (location.pathname.match(new RegExp('/feed'))) {
      dispatch(getWsConnectionStartAction(WS_ORDER_URL + '/all'));
    }

    if (location.pathname.match(new RegExp('/profile/orders'))) {
      dispatch(getWsConnectionStartAction(WS_ORDER_URL, true));
    }
    return () => {
      dispatch(getWsConnectionClosedAction());
    }

  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (location.pathname.match(new RegExp('/feed')) && commonFeed) {
      setOrders(commonFeed?.orders)
    }

    if (location.pathname.match(new RegExp('/profile/orders')) && userFeed) {
      setOrders(userFeed?.orders)
    }
  }, [commonFeed, userFeed, location.pathname]);

  return (
    <div className={`${Styles.container} pt-20`}>
      <h2 className={`${Styles.firstRow}`}><p className='text text_type_main-large-default'>#{currentOrder?.number}</p></h2>
      <div className={Styles.nameRow}>
        <h2 className='text text_type_main-large-default'>{currentOrder?.name}</h2>
        {(currentOrder?.status === 'done') && <p className={`text text_type_main-small ${Styles.done}`}>Выполнен</p>}
      </div>
      <div className={Styles.itemsRow}>
        <p className='text text_type_main-default mt-10'>Состав:</p>
        <div className={Styles.items}>
          {groups.map(g => (<div className={Styles.ingredient} key={g.item._id}>
            <IngredientIcon image={g.item.image} />
            <p className={`text text_type_main-default`}>{g.item.name}</p>
            <div className={Styles.itemPrice}>
              <p className={`text text_type_digits-default`}>{g.count}x{g.item.price}&nbsp;</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>))}
        </div>
      </div>
      <div className={`${Styles.lastRow} mt-5`}>
        <div className={`text text_type_main-small ${Styles.time}`}>{addInfo?.date.toLocaleString()}</div>
        <div className={Styles.itemPrice}>
          <p className={`text text_type_digits-default`}>{addInfo?.price}&nbsp;</p>
          <CurrencyIcon type='primary' /></div>
      </div>
    </div>
  );
}

export default FeedItemDetails;