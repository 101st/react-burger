import { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from './burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-details';

import Styles from './style.module.scss';

const INGREDIENTS_TITLE_MAPPING = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients() {
  const dispatch = useDispatch();

  const [currentIngredientType, setCurrentIngredientType] = useState("bun");
  const { ingredients } = useSelector((store) => store.ingredients);
  const { constructorIngredients } = useSelector((store) => store.constructors);
  const { isOpen } = useSelector(store => store.ingredientDetails);

  const TABS = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef(),
  }

  const getCount = useCallback((_id) => {
    return constructorIngredients
      .filter(item => item._id === _id).length;
  }, [constructorIngredients]);

  const getIngredientsByType = useCallback((type) => {
    const ingredientsForSpecifyType = ingredients.filter((el) => el.type === type);

    return ingredientsForSpecifyType.map(item => (
      <BurgerIngredientItem
        key={item._id}
        onClick={() => dispatch(setIngredientDetails(item))}
        ingredient={item}
        count={getCount(item._id)}
      />
    ));
  }, [ingredients, dispatch, getCount]);

  const handleSmoothScroll = (type) => {
    TABS[type].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='mr-10'>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      <div className={`${Styles.tabs} mb-10`}>
        {Object.keys(INGREDIENTS_TITLE_MAPPING)
          .map(item => {
            return (
              <Tab
                key={`tabs-key-${item}`}
                value={item}
                active={currentIngredientType === item}
                onClick={() => {
                  setCurrentIngredientType(item);
                  handleSmoothScroll(item);
                }}>
                {INGREDIENTS_TITLE_MAPPING[item]}
              </Tab>
            )
          })}
      </div>
      <div className={`${Styles['container']} pt-6 pl-4 pr-4`}>
        {Object.keys(TABS)
          .map(item => {
            return (
              <div ref={TABS[item]} key={item}>
                <div>{INGREDIENTS_TITLE_MAPPING[item]}</div>
                <div className={`${Styles['ingredient-type-container']}`}>{getIngredientsByType(item)}</div>
              </div>
            )
          })}
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