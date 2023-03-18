import { FC } from 'react';
import Styles from './ingredient-icon.module.scss'

interface IProps {
    image: string;
    info?: string;
}
export const IngredientIcon: FC<IProps> = ({ image, info }) => {
    return (<div className={Styles.ingredientBg}>
        <div className={Styles.ingredient} style={{ backgroundImage: `url(${image})` }}>
            {/* <p className='text text_type_main-default'>{info}</p> */}
        </div>
    </div>);
}