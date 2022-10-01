import { useState } from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from './burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Styles from './style.module.scss';

const INGREDIENTS_TITLE_MAPPING = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients({
  currentIngredientType,
  setCurrentIngredientType,
  ingredientsStore
}) {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const handleOpenModal = () => {
    setIsIngredientModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsIngredientModalOpen(false);
  }

  return (
    <div className='mr-10'>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      <div className={`${Styles.tabs} mb-10`}>
        {Object.keys(INGREDIENTS_TITLE_MAPPING)
          .map(item => (
            <Tab
              key={`tabs-key-${item}`}
              value={item}
              active={currentIngredientType === item}
              onClick={setCurrentIngredientType}>
              {INGREDIENTS_TITLE_MAPPING[item]}
            </Tab>
          ))}
      </div>
      <div className='mb-6'>
        <h2>{INGREDIENTS_TITLE_MAPPING[currentIngredientType]}</h2>
      </div>
      <div className={`${Styles['container']} pt-6 pl-4 pr-4`}>
        {ingredientsStore.map(item => (
          <BurgerIngredientItem
            key={item._id}
            onClick={handleOpenModal}
            setCurrentIngredient={setCurrentIngredient}
            currentIngredient={item}
            count={0}
          />
        ))}
      </div>
      <Modal
        title={'Детали ингредиента'}
        isOpen={isIngredientModalOpen}
        onClose={handleCloseModal}
      >
        <IngredientDetails
          currentIngredient={currentIngredient}
        />
      </Modal>
    </div>
  )
}

BurgerIngredients.propTypes = {
  currentIngredientType: string.isRequired,
  setCurrentIngredientType: func.isRequired,
  ingredientsStore: arrayOf(shape(ingredientType)).isRequired,
}

export default BurgerIngredients;