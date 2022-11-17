import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Styles from './ingredient-details.module.scss';

import { IIngredient } from '../../interfaces/common';

interface IUseParam {
  _id: string
}

interface IConsist {
  name: string | undefined;
  metric: string | undefined;
  value: number | undefined;
};

function IngredientDetails() {
  const { _id } = useParams<IUseParam>();
  const { ingredients } = useSelector((store: any) => store.ingredients);
  const [currentIngredient, setCurrentIngredient] = useState<IIngredient | null>(null);

  const Consist = ({ name, metric, value }: IConsist) => (
    <div className={`mr-5 text text_type_main-default text_color_inactive`}>
      <div>{name}, {metric}</div>
      <div>{value}</div>
    </div>
  )

  useEffect(() => {
    setCurrentIngredient(ingredients.find((i: IIngredient) => i._id === _id));
  }, [ingredients, _id]);

  return (
    <div className={`${Styles.container} pt-20`}>
      <div className={`${Styles.image}`}>
        <img alt={currentIngredient?.name} src={currentIngredient?.image_large} />
      </div>
      <div className={`${Styles.title} mt-4 mb-8 text text_type_main-default`}>{currentIngredient?.name}</div>
      <div className={`${Styles.details}`}>
        <Consist name={`Калорий`} metric={`ккал`} value={currentIngredient?.calories} />
        <Consist name={`Белки`} metric={`г`} value={currentIngredient?.proteins} />
        <Consist name={`Жиры`} metric={`г`} value={currentIngredient?.fat} />
        <Consist name={`Углеводы`} metric={`г`} value={currentIngredient?.carbohydrates} />
      </div>
    </div>
  )
}

export default IngredientDetails;