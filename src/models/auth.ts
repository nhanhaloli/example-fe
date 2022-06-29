import { Effect } from 'umi';
import { message } from 'antd';
import { login } from '@/api/auth';

interface BookModelType {
  namespace: 'auth';
  state: {};
  effects: {
    login: Effect
  };
}

const BookModel: BookModelType = {
  namespace: 'auth',
  state: {},
  effects: {
    *login({payload}, {call}): any {
      const response = yield call(login, payload.values)
      
      if (response && response.statusCode >= 400) {
        return message.error(response.message)
      }
      
      localStorage.setItem('auth', response.access_token)
      window.location.replace('/')
    }
  },
}

export default BookModel