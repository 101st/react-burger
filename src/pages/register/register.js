import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.scss';

import { getRegister } from '../../services/actions/auth';

function Register() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: 'Username', email: 'test-data@yandex.ru', password: 'password' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getRegister(form));
  }
  return (
    <div className={styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Регистрация</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder='Имя'
          value={form.name}
          onChange={onChange}
          name='name'
        />
        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          onChange={onChange}
          name='email'
        />
        <Input
          type='password'
          placeholder='Пароль'
          value={form.password}
          onChange={onChange}
          icon='ShowIcon'
          name='password'
        />
        <Button type='primary' htmlType='submit' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={styles.links + ' text_color_inactive mt-20'}>
        <p className='text text_type_main-small'>
          Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;