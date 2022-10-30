import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, patchUser } from '../../services/actions/auth';

import styles from './profile.module.scss';

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const [showButtons, setShowButtons] = useState(false);
  const [form, setValue] = useState({
    email: user?.email ?? '',
    name: user?.name ?? '',
    password: '',
  })

  const onChange = (e) => {
    const newData = { ...form, [e.target.name]: e.target.value };
    if (JSON.stringify(newData) !== JSON.stringify({ ...user, password: '' }))
      setShowButtons(true);
    else
      setShowButtons(false);
    setValue(newData);
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.fields}>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch(patchUser({ name: form.name, email: form.email }))
      }}>
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
          value={form.password || ''}
          name='password'
        />
        <div className={styles['form-buttons']}>
          {showButtons && [
            <Button
              key='1'
              type='primary'
              htmlType='submit'
              size='medium'>Сохранить</Button>,
            <Button
              key='2'
              type='primary'
              onClick={() => {
                setValue({ ...user, password: '' }); setShowButtons(false);
              }}
              htmlType='button'
              size='medium'>Отмена</Button>]}
        </div>
      </form>
    </div>
  )
}

export default ProfileForm;