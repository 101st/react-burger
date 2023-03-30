import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { IIngredient } from '../../services/reducers/constructor.types';

import Styles from './burger-ingredients.module.scss';

interface IBurgerIngredientItem {
  ingredient: IIngredient;
  count: number;
}

function BurgerIngredientItem({ ingredient, count }: IBurgerIngredientItem) {
  const location = useLocation();
  const { name, image, price, _id } = ingredient;
  const [, ref] = useDrag({
    type: 'INGREDIENT',
    item: ingredient,
    collect: () => ({})
  });

  return (
    <div className={`${Styles.item} pl-4 pr-4 mb-10`} ref={ref}>
      {count > 0 && <Counter count={count} size='default' />}
      <Link to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}>
        <img width={252} height={126} alt={name} src={image} />
        <div className={Styles.price_container}>
          <div className={`${Styles.price} mt-1 mb-1`}>
            <span className='text text_type_digits-default mr-1'>{price}</span>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
        <div className={Styles.name}>
          {name}
        </div>
      </Link>
    </div>
  )
}

export default BurgerIngredientItem;