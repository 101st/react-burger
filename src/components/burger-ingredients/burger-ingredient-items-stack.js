import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailModal from './ingredient-detail-modal';

import Styles from './style.module.scss';

function BurgerIngredientItemsStore(props) {
  const {
    image_mobile, image_large, name, type, price, isLocked,
    calories, carbohydrates, fat, proteins
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  }

  return (
    <div className={`${Styles['item-in-stack']} mb-4 ml-8 mr-4`} onClick={handleOpenModal}>
      <ConstructorElement
        className={`mb-4`}
        text={name}
        isLocked={isLocked}
        type={type}
        price={price}
        thumbnail={image_mobile}
      />
      {modalVisible && <IngredientDetailModal
        onClose={handleCloseModal}
        image_large={image_large}
        name={name}
        calories={calories}
        carbohydrates={carbohydrates}
        fat={fat}
        proteins={proteins}
      />}
    </div>
  )
}

export default BurgerIngredientItemsStore;