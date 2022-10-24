import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/auth";

import styles from "./profile.module.scss";
import { store } from "../../services/store";

function Profile() {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(store => store.auth);
  const [form, setValue] = useState({
    email: user?.email ?? '',
    password: user?.password ?? '',
    name: user?.name ?? '',
  })

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, [dispatch, accessToken]);

  return (
    <div className={styles.container + ' mt-20'}>
      <div className={styles.menu + ' mr-20'}>
        <div>
          <Link to='/profile' className={styles.link}>
            <p className="text text_type_main-medium">
              Профиль
            </p>
          </Link>
        </div>
        <div>
          <Link to={'/profile/orders'} className={styles.link}>
            <p className="text text_type_main-medium">
              История заказов
            </p>
          </Link>
        </div>
        <div onClick={console.log}>
          <Link to={'/profile'} className={styles.link}>
            <p className="text text_type_main-medium">
              Выход
            </p>
          </Link>
        </div>
        <div className={styles['add-info'] + ' mt-20'}>
          <p className="text text_type_main-small">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className={styles.fields}>
        <form onSubmit={console.log}>
          <Input
            type='text'
            placeholder='Имя'
            onChange={onChange}
            icon='EditIcon'
            value={form.name}
            name='name'
          />
          <Input
            type='email'
            placeholder='E-mail'
            onChange={onChange}
            icon='EditIcon'
            value={form.email}
            name='email'
          />
          <Input
            type='password'
            placeholder='Пароль'
            onChange={onChange}
            icon='EditIcon'
            value={form.password}
            name='password'
          />
        </form>
      </div>
    </div>
  )
}

export default Profile;