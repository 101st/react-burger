import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, patchUser } from '../../services/actions/auth';

import styles from './profile.module.scss';

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const [form, setValue] = useState({
    email: user?.email ?? '',
    password: user?.password ?? '',
    name: user?.name ?? '',
  })

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
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
          <Button
            type='primary'
            htmlType='submit'
            disabled={form?.name === user?.name && form?.email === user?.email && form?.password === ''}
            size='medium'>Сохранить</Button>
          <Button
            type='primary'
            onClick={() => { setValue(user) }}
            disabled={form?.name === user?.name && form?.email === user?.email && form?.password === ''}
            htmlType='button'
            size='medium'>Отмена</Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm;