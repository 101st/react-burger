import { number, func, shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


import Styles from './style.module.scss';

function BurgerIngredientItem({
  onClick,
  setCurrentIngredient,
  currentIngredient,
  count
}) {
  const { name, image, proteins, } = currentIngredient;

  return (
    <div className={`${Styles.item} pl-4 pr-4 mb-10`} onClick={() => {
      setCurrentIngredient(currentIngredient);
      onClick();
    }}>
      {count > 0 && <Counter count={count} size="default" />}
      <img width={252} height={126} alt={name} src={image} />
      <div className={`${Styles['proteins-container']}`}>
        <div className={`${Styles['proteins']} mt-1 mb-1`}>
          <span className='text text_type_digits-default'>{proteins}</span>
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
  onClick: func.isRequired,
  setCurrentIngredient: func.isRequired,
  currentIngredient: shape(ingredientType).isRequired,
  count: number,
}

export default BurgerIngredientItem;