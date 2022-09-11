import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailModal from '../ingredient-details';

import Styles from './style.module.scss';

function BurgerConstructorItem(props) {
  const {
    image_mobile, name, type, price, isLocked
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

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
        text={name}
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

export default BurgerConstructorItem;