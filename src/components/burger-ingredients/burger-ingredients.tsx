import { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from './burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-details';
import { useInView } from 'react-intersection-observer';

import Styles from './burger-ingredients.module.scss';
import { IIngredient } from '../../services/reducers/constructor.types';

const INGREDIENTS_TITLE_MAPPING: { [key: string]: string } = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинка',
}

function BurgerIngredients() {
  const dispatch = useDispatch();

  const [currentIngredientType, setCurrentIngredientType] = useState('bun');
  const { ingredients } = useSelector((store: any) => store.ingredients);
  const { constructorIngredients } = useSelector((store: any) => store.constructors);
  const { isOpen } = useSelector((store: any) => store.ingredientDetails);

  const [bunRef, inViewBuns] = useInView({ threshold: 1 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 1 });
  const [mainRef, inViewMain] = useInView({ threshold: .4 });

  const TABS: { [key: string]: any } = { //TODO убрать тип any
    bun: { scroll: bunRef, click: useRef() },
    sauce: { scroll: sauceRef, click: useRef() },
    main: { scroll: mainRef, click: useRef() },
  }

  const getCount = useCallback((_id) => {
    return constructorIngredients
      .filter((item: IIngredient) => item._id === _id).length;
  }, [constructorIngredients]);

  const getIngredientsByType = useCallback((type) => {
    const ingredientsForSpecifyType = ingredients.filter((el: IIngredient) => el.type === type);

    return ingredientsForSpecifyType.map((item: IIngredient) => (
      <BurgerIngredientItem
        key={item._id}
        onClick={() => dispatch(setIngredientDetails(item))}
        ingredient={item}
        count={getCount(item._id)}
      />
    ));
  }, [ingredients, dispatch, getCount]);

  const handleSmoothScroll = (type: string) => {
    TABS[type].click.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (inViewBuns) {
      setCurrentIngredientType('bun');
    } else if (inViewSauce) {
      setCurrentIngredientType('sauce');
    } else if (inViewMain) {
      setCurrentIngredientType('main');
    }
  }, [inViewBuns, inViewSauce, inViewMain]);

  return (
    <div className='mr-10'>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
      <div className={`${Styles.tabs} mb-10`}>
        {Object.keys(INGREDIENTS_TITLE_MAPPING)
          .map((item: string) => {
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
              <div ref={TABS[item]?.scroll} key={item}>
                <div ref={TABS[item]?.click}>{INGREDIENTS_TITLE_MAPPING[item]}</div>
                <div className={`${Styles['ingredient-type-container']}`}>{getIngredientsByType(item)}</div>
              </div>
            )
          })}
      </div>
      {isOpen && <Modal
        title={'Детали ингредиента'}
        onClose={() => dispatch(clearIngredientDetails())}
      >
        <IngredientDetails />
      </Modal>}
    </div>
  )
}

export default BurgerIngredients;