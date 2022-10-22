import { string, func } from 'prop-types';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeaderItem({ id, name, activeMenuItem, setActiveMenuItem, link = '/#' }) {
  return (
    <nav className='pl-5 pr-5 mr-2' onClick={() => { setActiveMenuItem(id) }}>
      <BurgerIcon type={activeMenuItem === id ? 'primary' : 'secondary'} />
      <a className={`ml-2 ${activeMenuItem !== id && 'text_color_inactive'}`} href={link}>{name}</a>
    </nav>
  )
}

AppHeaderItem.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  activeMenuItem: string.isRequired,
  setActiveMenuItem: func.isRequired,
}

export default AppHeaderItem;