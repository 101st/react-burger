import { bool, number, shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useRef } from "react";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, dragIngredient } from "../../services/actions/constructor";

import Styles from './burger-constructor.module.scss';

function BurgerConstructorItem({ ingredient, isDraggable, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "CONSTRUCTOR",
    hover(ingredient) {
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
    type: "CONSTRUCTOR",
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
      {isDraggable && <div className='mr-2'><DragIcon type="primary" /></div>}
      <ConstructorElement
        text={`${ingredient.name}`}
        isLocked={ingredient.isLocked}
        type={ingredient.type}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => dispatch(removeIngredient(ingredient))}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: shape(ingredientType).isRequired,
  isDraggable: bool,
  index: number,
};

export default BurgerConstructorItem;