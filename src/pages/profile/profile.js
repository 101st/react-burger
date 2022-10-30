import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUser, getLogout } from '../../services/actions/auth';

import styles from './profile.module.scss';

function Profile({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.container + ' mt-20'}>
      <div className={styles.menu + ' mr-20'}>
        <div>
          <Link to='/profile' className={styles.link}>
            <p className='text text_type_main-medium'>
              Профиль
            </p>
          </Link>
        </div>
        <div>
          <Link to={'/profile/orders'} className={styles.link}>
            <p className='text text_type_main-medium'>
              История заказов
            </p>
          </Link>
        </div>
        <div onClick={() => {
          dispatch(getLogout());
          history.push('/login');
        }}>
          <Link to={'/profile'} className={styles.link}>
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
    </div>
  )
}

export default Profile;