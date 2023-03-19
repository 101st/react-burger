import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

import { setCurrentIngredient } from '../../services/actions/ingredients';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { IIngredient } from '../../services/reducers/constructor.types';

import Styles from './burger-ingredients.module.scss';
import { useAppDispatch } from '../../utils/hooks';

interface IBurgerIngredientItem {
  ingredient: IIngredient;
  onClick: Function;
  count: number;
}

function BurgerIngredientItem({ ingredient, onClick, count }: IBurgerIngredientItem) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { name, image, price, _id } = ingredient;
  const [, ref] = useDrag({
    type: 'INGREDIENT',
    item: ingredient,
    collect: () => ({})
  });

  return (
    <div className={`${Styles.item} pl-4 pr-4 mb-10`} ref={ref} onClick={() => {
      dispatch(setCurrentIngredient(ingredient));
      onClick();
    }}>
      {count > 0 && <Counter count={count} size='default' />}
      <Link to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}>
        <img width={252} height={126} alt={name} src={image} />
      </Link>
      <div className={Styles.price_container}>
        <div className={`${Styles.price} mt-1 mb-1`}>
          <span className='text text_type_digits-default mr-1'>{price}</span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
      <div className={Styles.name}>
        {name}
      </div>
    </div>
  )
}

export default BurgerIngredientItem;