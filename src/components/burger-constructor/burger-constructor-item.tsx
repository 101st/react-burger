import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, dragIngredient } from '../../services/actions/constructor';

import { IIngredient } from '../../services/reducers/constructor.types';

import Styles from './burger-constructor.module.scss';
import { useAppDispatch } from '../../utils/hooks';

interface IBurgerConstructorItem {
  ingredient: IIngredient;
  isDraggable: boolean;
  position?: 'top' | 'bottom' | undefined;
  index: number;
}

function BurgerConstructorItem({ ingredient, isDraggable, position, index }: IBurgerConstructorItem) {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [, drop] = useDrop({
    accept: 'CONSTRUCTOR',
    hover(ingredient: IIngredient) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      dispatch(dragIngredient(dragIndex, hoverIndex, ingredient));
      ingredient.index = hoverIndex;
    },

  });

  const [{ opacity }, drag] = useDrag({
    type: 'CONSTRUCTOR',
    item: { ...ingredient, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${Styles['in-stack']} mb-4`}
      ref={ref}
      style={{ opacity }}
    >
      {isDraggable && <div className='mr-2'><DragIcon type='primary' /></div>}
      <ConstructorElement
        text={`${ingredient.name}`}
        isLocked={ingredient.isLocked}
        type={position}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => dispatch(removeIngredient(ingredient))}
      />
    </div>
  )
}

export default BurgerConstructorItem;