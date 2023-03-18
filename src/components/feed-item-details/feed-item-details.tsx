import { useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { IIngredient } from '../../services/reducers/constructor.types'
import Styles from './feed-item-details.module.scss';
import { TOrder } from '../../services/reducers/order.types';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getWsConnectionStartAction } from '../../services/actions/ws';
import { WS_ORDER_URL } from '../../utils/const';

type TIngredientGroup = { item: IIngredient; count: number };

const group = (ingredients: IIngredient[]): TIngredientGroup[] => {
  const acc: TIngredientGroup[] = [];
  ingredients.forEach(i => {
    let grp = acc.find(g => g.item._id === i._id);
    if (!grp) {
      grp = { item: i, count: 0 };
      acc.push(grp);
    }
    grp.count++;
    if (i.type === 'bun') {
      grp.count++;
    }
  });
  return acc;
}

const FeedItemDetails = () => {
  const dispatch = useAppDispatch()
  const { _id: id } = useParams<{ _id: string }>();
  const { ingredients } = useAppSelector((store: any) => store.ingredients);
  const { feed, wsConnected } = useAppSelector((store: any) => store.ws);

  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const [addInfo, setAddInfo] = useState<{ price: any, date: any } | null>(null);
  const [groups, setGroups] = useState<TIngredientGroup[]>([]);

  useEffect(() => {
    if (!feed?.orders) {
      if (!wsConnected) {
        dispatch(getWsConnectionStartAction(WS_ORDER_URL + '/all'));
      }
      return;
    }

    const currentOrder = feed.orders.find((o: any) => o._id === id);
    setCurrentOrder(currentOrder);
    const filtredIngredients = ingredients.filter((i: any) => currentOrder && currentOrder.ingredients.find((oi: any) => oi === i._id)) || [];
    const groups = group(filtredIngredients);
    setGroups(groups);
    const price = groups.map(g => g.item.price * g.count).reduce((acc, n) => acc += n);
    const date = new Date(currentOrder.createdAt);
    setAddInfo({ price, date });

  }, [dispatch, ingredients, id, wsConnected, feed?.orders]);

  return (
    <div className={`${Styles.container} pt-20`}>
      <div className={Styles.firstRow}><p className='text text_type_digits-default'>#{currentOrder?.number}</p></div>
      <div className={Styles.nameRow}>
        <p className='text text_type_main-default'>{currentOrder?.name}</p>
        {(currentOrder?.status === 'done') && <p className={`text text_type_main-small ${Styles.done}`}>Выполнен</p>}
      </div>
      <div className={Styles.itemsRow}>
        <p className='text text_type_main-default'>Состав:</p>
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
      <div className={Styles.lastRow}>
        <p className={`text text_type_main-small ${Styles.time}`}>{addInfo?.date.toLocaleString()}</p>
        <div className={Styles.itemPrice}>
          <p className={`text text_type_digits-default`}>{addInfo?.price}&nbsp;</p>
          <CurrencyIcon type='primary' /></div>
      </div>
    </div>
  );
}

export default FeedItemDetails;