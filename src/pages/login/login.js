import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';

const Login = () => {
  const [form, setValue] = useState({ email: '', password: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Вход</h1>
      <form className={styles.form} onSubmit={console.log}>
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
          name='password'
        />
        <Button type='primary' htmlType='button' size='medium'>Войти</Button>
      </form>
      <div className={styles.links + ' text_color_inactive mt-20'}>
        <div className='mb-4'>
          <span>Вы - новый пользователь?</span>
          <Link to='/register' className='ml-1'>Зарегистрироваться</Link>
        </div>
        <div>
          <span>Забыли пароль?</span>
          <Link to='/forgot-password' className='ml-1'>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}

export default Login