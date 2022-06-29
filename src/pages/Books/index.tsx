import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, Tag, Tooltip } from "antd"
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { connect, Dispatch, Link, Loading } from 'umi';
import BookForm from "./components/Form";

const { confirm } = Modal;

interface Props {
  dispatch: Dispatch
  loading: Loading
  book: any
}

function Book({ dispatch, loading, book }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState('');

  const getAllBooks = (filter: Object) => {
    dispatch?.({
      type: 'book/getAllBooks',
      payload: {
        query: {
          ...book.pagination,
          ...filter
        }
      }
    })
  }

  useEffect(() => {
    console.log('run');
    
    getAllBooks({})
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onDelete = (id: string) => {
    confirm({
      content: 'Delete this book',
      onOk() {
        dispatch?.({
          type: 'book/delete',
          payload: {
            id,
          }
        })
      },
    });
  }

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      key: '_id',
      dataIndex: '_id',
      render: (_, record, ids) => ids + 1
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record) => <Link to={`/list/${record._id}`}>{value}</Link>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value)
    },
    {
      title: 'Hired',
      dataIndex: 'hired',
      key: 'hired',
      render: (value) => value ? <Tag color="volcano">Hired</Tag> : <Tag color="green">Free</Tag>
    },
    {
      title: 'Year release',
      dataIndex: 'yearRelease',
      key: 'yearRelease',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <React.Fragment>
          <Space size="large">
            <Tooltip title="Edit">
              <Button onClick={() => {
                  setEditId(record._id)
                  setIsModalVisible(true)
                }}>
                <EditOutlined/>
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => onDelete(record._id)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        </React.Fragment>
      )
    },
  ];

  const onChange = (paginationProps: any) => {
    getAllBooks({
      current: paginationProps.current - 1
    })
  }

  return (
      <React.Fragment>
        <Row align="middle" justify="end">
          <Col>
            <Button type="primary" onClick={showModal}>Create</Button>
          </Col>
        </Row>
        <br />
        <Table 
          loading={loading.effects['book/getAllBooks']} 
          rowKey='_id' 
          dataSource={book.books} 
          columns={columns}
          pagination={{
            total: book.pagination.totalRecord,
            current: book.pagination.current + 1,
            pageSize: book.pagination.limit
          }}
          onChange={onChange}
        />
        <BookForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} editId={editId} setEditId={setEditId} />
      </React.Fragment>
  )
}

export default connect(({ loading, book }: any) => ({ loading, book }))(Book)