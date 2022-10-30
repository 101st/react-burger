import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getUser, getLogout } from '../../services/actions/auth';

import styles from './profile.module.scss';

function Profile({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const isActive = (path) => {
    if (pathname === path)
      return styles['text_color_active'];
    return 'text_color_inactive';
  }


  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.container + ' mt-20'}>
      <div className={styles.menu + ' mr-20'}>
        <div>
          <Link to='/profile' className={`${styles.link} ${isActive('/profile')}`}>
            <p className='text text_type_main-medium'>
              Профиль
            </p>
          </Link>
        </div>
        <div>
          <Link to={'/profile/orders'} className={`${styles.link}  ${isActive('/profile/orders')}`}>
            <p className='text text_type_main-medium'>
              История заказов
            </p>
          </Link>
        </div>
        <div onClick={() => {
          dispatch(getLogout());
          history.push('/login');
        }}>
          <Link to={'/profile'} className={`${styles.link}  text_color_inactive`}>
            <p className='text text_type_main-medium'>
              Выход
            </p>
          </Link>
        </div>
        <div className={styles['add-info'] + ' mt-20'}>
          <p className='text text_type_main-small'>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      {children}
    </div >
  )
}

export default Profile;