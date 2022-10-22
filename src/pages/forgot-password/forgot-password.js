import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { getForgotPassword } from "../../services/actions/auth";

import styles from "./forgot-password.module.scss";

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { getForgotPasswordResponseMessage } = useSelector((store) => store.auth);
  const [form, setValue] = useState({ email: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getForgotPassword(form.email));
  }
  useEffect(() => {
    if (getForgotPasswordResponseMessage === true) {
      history.push("/reset-password");
    }
  }, [dispatch, getForgotPasswordResponseMessage])

  return (
    <div className={styles.container + ' mt-20 text_type_main-default'}>
      <h1 className='mb-6'>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          onChange={onChange}
          name='email'
        />
        <Button type='primary' htmlType='submit' size='medium'>Восстановить</Button>
      </form>
      <div className={styles.links + ' text_color_inactive mt-20'}>
        <div className='mb-4'>
          <span>Вспомнили пароль?</span>
          <Link to='/login' className='ml-1'>Войти</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;