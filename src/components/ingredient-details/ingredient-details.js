import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Styles from './ingredient-details.module.scss';

function IngredientDetails() {
  const { _id } = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const Test = ({ name, metric, value }) => (
    <div className={`mr-5 text text_type_main-default text_color_inactive`}>
      <div>{name}, {metric}</div>
      <div>{value}</div>
    </div>
  )

  useEffect(() => {
    setCurrentIngredient(ingredients.find((i) => i._id === _id));
  }, [ingredients, _id]);

  return (
    <div className={`${Styles.container} pt-20`}>
      <div className={`${Styles.image}`}>
        <img alt={currentIngredient?.name} src={currentIngredient?.image_large} />
      </div>
      <div className={`${Styles.title} mt-4 mb-8 text text_type_main-default`}>{currentIngredient?.name}</div>
      <div className={`${Styles.details}`}>
        <Test name={`Калорий`} metric={`ккал`} value={currentIngredient?.calories} />
        <Test name={`Белки`} metric={`г`} value={currentIngredient?.proteins} />
        <Test name={`Жиры`} metric={`г`} value={currentIngredient?.fat} />
        <Test name={`Углеводы`} metric={`г`} value={currentIngredient?.carbohydrates} />
      </div>
    </div>
  )
}

export default IngredientDetails;