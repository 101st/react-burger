import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { useAppSelector } from '../../utils/hooks';

import Styles from './feed-item.module.scss';
import StylesFID from '../feed-item-details/feed-item-details.module.scss';
import { IIngredient } from '../../services/reducers/constructor.types';
import { useLocation } from 'react-router-dom';

export const FeedItem = ({ order }: any) => {
  const location = useLocation();
  const { ingredients } = useAppSelector(store => store.ingredients);
  const uniqIngredients = ingredients.filter((i: { _id: string; }) => order.ingredients.includes(i._id));

  let items = uniqIngredients;
  let extra = '';

  if (uniqIngredients.length > 7) {
    items = uniqIngredients.slice(0, 7);
    extra = '+' + (uniqIngredients.length - 7).toString()
  }

  const price = useMemo(() => {
    return uniqIngredients ? uniqIngredients.map((i: IIngredient) =>
      Number(i.price)).reduce((acc, p) => acc += p) : 0
  }, [uniqIngredients]);

  const getStatus = (status: string) => {
    switch (status) {
      case 'created':
        return <p className={`text text_type_main-small ${StylesFID.created}`}>Создан</p>
      case 'done':
        return <p className={`text text_type_main-small ${StylesFID.done}`}>Выполнен</p>
      case 'pending':
        return <p className={`text text_type_main-small ${StylesFID.pending}`}>Готовится</p>  
      default:
        return <p className={`text text_type_main-small ${StylesFID.canceled}`}>Отменён</p>
    }
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.content}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-default">{order.name}</p>
      {location.pathname === '/profile/orders' && getStatus(order.status)}
      <div className={Styles.content}>
        <div className={Styles.ingredients}>
          {
            items.map((i: any, idx: any) => (
              <div className={Styles.icon} style={{ zIndex: `${1000 - idx}` }} key={`${idx}_${i._id}`}>
                <IngredientIcon image={i.image} info={idx === items.length - 1 ? extra : ''} />
              </div>)
            )
          }
        </div>
        <p className={`text text_type_main-medium ${Styles.price}`}>{price}&nbsp;<CurrencyIcon type="primary" /></p>
      </div>
    </div>
  );
};