import { string, number, func } from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function BurgerIngredientItem({ _id, name, image, proteins, count, onClickHandler }) {
  return (
    <div className={`${Styles.item} pl-4 pr-4 mb-10`} data-id={_id} onClick={onClickHandler}>
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
  _id: string,
  name: string,
  image: string,
  proteins: number,
  count: number,
  onClickHandler: func
}

export default BurgerIngredientItem;