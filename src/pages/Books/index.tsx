import { Button, Col, notification, Row, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import type { Dispatch, Loading } from 'umi';
import { connect, Link } from 'umi';
import BookForm from './components/Form';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  book: any;
}

function Book({ book }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    notification.info({
      message: <strong>Note:</strong>,
      description: (
        <div>
          <p>1. You can create new Book (button create)</p>
          <p>2. Go to detail page by click on title</p>
          <p>2. I save all everything on Redux so it all clear when reload</p>
          <p>3. I intent to add update and delete feature but, as my view, it should be simple</p>
        </div>
      ),
      placement: 'bottomLeft',
      duration: null,
    });
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      key: '_id',
      dataIndex: '_id',
      render: (_, record, ids) => ids + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record) => <Link to={`/list/${record.title}`}>{value}</Link>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) =>
        new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value),
    },
    {
      title: 'Hired',
      dataIndex: 'hired',
      key: 'hired',
      render: (value) => (value ? <Tag color="volcano">Hired</Tag> : <Tag color="green">Free</Tag>),
    },
    {
      title: 'Year release',
      dataIndex: 'yearRelease',
      key: 'yearRelease',
    },
  ];

  return (
    <React.Fragment>
      <Row align="middle" justify="end">
        <Col>
          <Button type="primary" onClick={showModal}>
            Create
          </Button>
        </Col>
      </Row>
      <br />
      <Table rowKey="_id" dataSource={book.books} columns={columns} />
      <BookForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editId={editId}
        setEditId={setEditId}
      />
    </React.Fragment>
  );
}

export default connect(({ loading, book }: any) => ({ loading, book }))(Book);
