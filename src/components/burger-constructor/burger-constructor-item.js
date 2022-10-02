import { bool, shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './style.module.scss';

function BurgerConstructorItem({
  currentItem,
  isDraggable,
}) {
  return (
    <div className={`${Styles['in-stack']} mb-4`}>
      {isDraggable && <div className='mr-2'><DragIcon type="primary" /></div>}
      <ConstructorElement
        text={`${currentItem.name}`}
        isLocked={currentItem.isLocked}
        type={currentItem.type}
        price={currentItem.price}
        thumbnail={currentItem.image_mobile}
      />
    </div>
  )
}

/* BurgerConstructorItem.propTypes = {
  currentItem: shape(ingredientType).isRequired,
  isDraggable: bool,
}; */

export default BurgerConstructorItem;