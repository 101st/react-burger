import { string, object, func } from 'prop-types';
import { ingredientType } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from './item';
import Styles from './style.module.scss';

const INGREDIENTS_TITLE_MAPPING = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients({
  ingredientClickHandler,
  ingredientsStack,
  currentIngredientType,
  setCurrentIngredientType,
  ingredientsStore }) {
  return (
    <>
      <div className='mr-10'>
        <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>

        <div className={`${Styles.tabs} mb-10`}>
          {Object.keys(INGREDIENTS_TITLE_MAPPING)
            .map(item => <Tab key={`tabs-key-${item}`} value={item} active={currentIngredientType === item} onClick={setCurrentIngredientType}>
              {INGREDIENTS_TITLE_MAPPING[item]}
            </Tab>)}
        </div>

        <div className='mb-6'>
          <h2>{INGREDIENTS_TITLE_MAPPING[currentIngredientType]}</h2>
        </div>

        <div className={`${Styles['container']} pt-6 pl-4 pr-4`}>
          {ingredientsStore.map(item =>
            <BurgerIngredientItem
              onClickHandler={ingredientClickHandler}
              key={item._id} {...item} count={ingredientsStack[item._id]}
            />
          )}
        </div>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredientClickHandler: func,
  ingredientsStack: object,
  currentIngredientType: string,
  setCurrentIngredientType: func,
  ingredientsStore: ingredientType,
}

export default BurgerIngredients;