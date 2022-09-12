import { object } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function BurgerConstructorItem({
  currentItem
}) {
  const {
    image_mobile,
    name,
    type,
    price,
    isLocked,
  } = currentItem;

  return (
    <div className={`${Styles['in-stack']} mb-4 ml-8 mr-4`}>
      <ConstructorElement
        className={`mb-4`}
        text={`${name}`}
        isLocked={isLocked}
        type={type}
        price={price}
        thumbnail={image_mobile}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  data: ingredientType,
  ingredientsStack: object,
};

export default BurgerConstructorItem;