import { bool, shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function BurgerConstructorItem({
  currentItem,
  isDraggable,
}) {
  const {
    image_mobile,
    name,
    type,
    price,
    isLocked,
  } = currentItem;

  return (
    <div className={`${Styles['in-stack']} mb-4`}>
      {isDraggable && <div className='mr-2'><DragIcon type="primary" /></div>}
      <ConstructorElement
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
  currentItem: shape(ingredientType),
  isDraggable: bool,
};

export default BurgerConstructorItem;