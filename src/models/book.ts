import { Effect, Reducer } from 'umi';
import { getAllBooks, create, update, updateStatus, getDetailValue, deleteBook } from '@/api/book';
import { BookInterface } from '@/types/book';
import { message } from 'antd';

interface BookModelType {
  namespace: 'book';
  state: {
    books: BookInterface[],
    book: BookInterface,
    pagination: {
      totalRecord: number
      current: number
      limit: number
    }
  };
  effects: {
    getAllBooks: Effect;
    create: Effect
    update: Effect
    changeStatus: Effect
    getDetail: Effect
    delete: Effect
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
      hired: false
    },
    pagination: {
      totalRecord: 0,
      current: 0,
      limit: 10
    }
  },
  effects: {
    *getAllBooks({ payload }, { call, put }) {
      const response = yield call(getAllBooks, payload.query)
      yield put({ type: 'setState', payload: { books: response.data, pagination: { ...payload.query, ...response.pagination} } })
    },
    *create({ payload }, { call, put, select }) {
      yield call(create, payload.value)
      message.success('Create success')
      payload.handleCancel()
      const pagination = yield select((state: any) => state.book.pagination)
      yield put({ type: 'getAllBooks', payload: { query: pagination } })
    },
    *update({ payload }, { call, put, select }) {
      yield call(update, payload.value, payload.id)
      message.success('Update success')
      payload.handleCancel()
      const pagination = yield select((state: any) => state.book.pagination)
      yield put({ type: 'getAllBooks', payload: { query: pagination } })
    },
    *changeStatus({ payload }, { call, put }) {
      yield call(updateStatus, payload.id)
      message.success('Change status success')
      yield put({ type: 'getDetail', payload: { id: payload.id } })
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetailValue, payload.id)
      yield put({ type: 'setState', payload: { book: response.data } })
    },
    *delete({ payload }, { call, put, select }) {
      yield call(deleteBook, payload.id)
      message.success('Delete success')
      const pagination = yield select((state: any) => state.book.pagination)
      yield put({ type: 'getAllBooks', payload: { query: { ...pagination, current: 0 } } })
    },
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  },
}

export default BookModel