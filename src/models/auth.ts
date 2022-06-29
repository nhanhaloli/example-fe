import type { Effect } from 'umi';
import { message } from 'antd';

interface BookModelType {
  namespace: 'auth';
  // eslint-disable-next-line @typescript-eslint/ban-types
  state: {};
  effects: {
    login: Effect;
  };
}

const BookModel: BookModelType = {
  namespace: 'auth',
  state: {},
  effects: {
    *login({ payload }, {}): any {
      if (payload.values.username === 'admin' && payload.values.password === 'admin') {
        localStorage.setItem('auth', JSON.stringify(payload.values));
        window.location.replace('/');
        return;
      }
      return message.error('Wrong username or password');
    },
  },
};

export default BookModel;
