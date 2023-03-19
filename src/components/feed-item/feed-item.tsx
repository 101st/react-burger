import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { useAppSelector } from '../../utils/hooks';

import Styles from './feed-item.module.scss';
import { IIngredient } from '../../services/reducers/constructor.types';

export const FeedItem = ({ order }: any) => {
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

  return (
    <div className={Styles.main}>
      <div className={Styles.content}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{order.createdAt.toLocaleString()}</p>
      </div>
      <p className="text text_type_main-default">{order.name}</p>
      <div className={Styles.content}>
        <div className={Styles.ingredients}>
          {
            items.map((i: any, idx: any) => (
              <div className={Styles.icon} style={{ zIndex: `${1000 - idx}` }} key={`${idx}_${i._id}`}>
                <IngredientIcon image={i.image} info={idx === items.length - 1 ? extra : ''} />
              </div>
            ))
          }
        </div>
        <p className={`text text_type_main-medium ${Styles.price}`}>{price}&nbsp;<CurrencyIcon type="primary" /></p>
      </div>
    </div>
  );
};