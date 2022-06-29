import { Breadcrumb, Card, Descriptions, Spin, Switch, Typography } from "antd"
import React, { useEffect } from "react"
import { connect, Dispatch, Link, Loading, useParams } from "umi"

const { Text } = Typography

interface Props {
  loading: Loading
  dispatch: Dispatch
  book: any
}

function BookDetail({loading, dispatch, book}: Props) {
  const params: { id: string } = useParams()

  useEffect(() => {
    if (params.id) {
      dispatch?.({
        type: 'book/getDetail',
        payload: {
          id: params.id
        }
      })
    }
  }, [])

  const changeStatus = () => {
    dispatch?.({
      type: 'book/changeStatus',
      payload: {
        id: params.id
      }
    })
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/list">List book</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{book.book.title}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card>
      <Spin spinning={!!loading.effects['book/changeStatus'] || !!loading.effects['book/getDetail']}>
        <Descriptions title="Book Info">
          <Descriptions.Item label="Title"><Text strong>{book.book.title}</Text></Descriptions.Item>
          <Descriptions.Item label="Price"><Text strong>{new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(book.book.price)}</Text></Descriptions.Item>
          <Descriptions.Item label="Year release"><Text strong>{book.book.yearRelease}</Text></Descriptions.Item>
          <Descriptions.Item label="Author"><Text strong>{book.book.author}</Text></Descriptions.Item>
          <Descriptions.Item label="Status">
            <Switch onClick={changeStatus} checked={book.book.hired} />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Card>
    </React.Fragment>
  )
}

export default connect(({loading, book}:any) => ({loading, book}))(BookDetail)
