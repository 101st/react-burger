import { number, func, shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

import { setCurrentIngredient } from '../../services/actions/ingredients';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './burger-ingredients.module.scss';

function BurgerIngredientItem({
  ingredient,
  onClick,
  count,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { name, image, price, _id } = ingredient;
  const [, ref] = useDrag({
    type: 'INGREDIENT',
    item: ingredient,
    collect: (monitor) => ({})
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
      <div className={`${Styles['price-container']}`}>
        <div className={`${Styles['price']} mt-1 mb-1`}>
          <span className='text text_type_digits-default mr-1'>{price}</span>
          <CurrencyIcon />
        </div>
      </div>
      <div className={`${Styles['name']}`}>
        {name}
      </div>
    </div>
  )
}

BurgerIngredientItem.propTypes = {
  ingredient: shape(ingredientType).isRequired,
  onClick: func.isRequired,
  count: number,
}

export default BurgerIngredientItem;