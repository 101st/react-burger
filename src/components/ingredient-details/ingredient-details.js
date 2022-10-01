import { shape } from 'prop-types';
import { ingredientType } from '../../utils/types';
import Styles from './style.module.scss';

function IngredientDetails({ currentIngredient }) {
  const { name, image_large, calories, fat, carbohydrates, proteins } = currentIngredient;
  const Test = ({ name, metric, value }) => (
    <div className={`mr-5 text text_type_main-default text_color_inactive`}>
      <div>{name}, {metric}</div>
      <div>{value}</div>
    </div>
  )

  return (
    <>
      <div className={`${Styles.image}`}>
        <img width={'100%'} alt={name} src={image_large} />
      </div>
      <div className={`${Styles.title} mt-4 mb-8 text text_type_main-default`}>{name}</div>
      <div className={`${Styles.details}`}>
        <Test name={`Калорий`} metric={`ккал`} value={calories} />
        <Test name={`Белки`} metric={`г`} value={proteins} />
        <Test name={`Жиры`} metric={`г`} value={fat} />
        <Test name={`Углеводы`} metric={`г`} value={carbohydrates} />
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  currentIngredient: shape(ingredientType).isRequired
}
export default IngredientDetails;