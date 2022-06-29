import type { Effect, Reducer } from 'umi';
import type { BookInterface } from '@/types/book';
import { message } from 'antd';

interface BookModelType {
  namespace: 'book';
  state: {
    books: BookInterface[];
    book: BookInterface;
    pagination: {
      totalRecord: number;
      current: number;
      limit: number;
    };
  };
  effects: {
    create: Effect;
    getDetail: Effect;
  };
  reducers: {
    setState: Reducer<any>;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    books: [],
    book: {
      title: '',
      price: '',
      hired: false,
    },
    pagination: {
      totalRecord: 0,
      current: 0,
      limit: 10,
    },
  },
  effects: {
    *create({ payload }, { put, select }) {
      message.success('Create success');
      payload.handleCancel();
      const books = yield select((state: any) => state.book.books);
      books.push(payload.value);
      yield put({ type: 'setState', payload: { books: [...books] } });
    },
    *getDetail({ payload }, { select, put }) {
      const books = yield select((state: any) => state.book.books);
      const book = books.find((b: any) => b.title === payload.id);
      if (!book) {
        message.error('have no book');
        return;
      }
      yield put({ type: 'setState', payload: { book } });
    },
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default BookModel;
