import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from './burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-details';

import {
  setCurrentIngredientType,
  setIngredientsStore,
} from '../../services/actions/ingredients';

import Styles from './style.module.scss';

const INGREDIENTS_TITLE_MAPPING = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { currentIngredientType, ingredientsStore } = useSelector((store) => store.ingredients);
  const { constructorIngredients } = useSelector((store) => store.constructors);
  const { isOpen } = useSelector(store => store.ingredientDetails);

  const getCount = useCallback((_id) => {
    return constructorIngredients
      .filter(item => item._id === _id).length;
  }, [constructorIngredients]);

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
              onClick={() => {
                dispatch(setCurrentIngredientType(item));
                dispatch(setIngredientsStore(item));
              }}>
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
            onClick={() => dispatch(setIngredientDetails(item))}
            ingredient={item}
            count={getCount(item._id)}
          />
        ))}
      </div>
      <Modal
        title={'Детали ингредиента'}
        isOpen={isOpen}
        onClose={() => dispatch(clearIngredientDetails())}
      >
        <IngredientDetails />
      </Modal>
    </div>
  )
}

export default BurgerIngredients;