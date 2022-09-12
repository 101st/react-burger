import { useState } from 'react';
import { object } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailModal from '../ingredient-details/ingredient-details';

import Styles from './style.module.scss';

function BurgerConstructorItem(props) {
  const {
    image_mobile, name, type, price, isLocked
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const getType = type => {
    if (type === 'top') return ' (верх)';
    if (type === 'bottom') return ' (низ)';
    return '';
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  }

  return (
    <div className={`${Styles['in-stack']} mb-4 ml-8 mr-4`} onClick={handleOpenModal}>
      <ConstructorElement
        className={`mb-4`}
        text={`${name}${getType(type)}`}
        isLocked={isLocked}
        type={type}
        price={price}
        thumbnail={image_mobile}
      />
      {modalVisible && <IngredientDetailModal
        onClose={handleCloseModal}
        setModalVisible={setModalVisible}
        {...props}
      />}
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  data: ingredientType,
  ingredientsStack: object,
};

export default BurgerConstructorItem;