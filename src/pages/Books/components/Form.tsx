import { getDetailValue } from "@/api/book";
import { Form, Input, InputNumber, Modal, Spin, Switch } from "antd"
import { useEffect } from "react";
import { connect, Dispatch, Loading } from "umi";

interface Props {
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  dispatch: Dispatch
  loading: Loading
  editId: string
  setEditId: (editId: string) => void
}

function BookForm({isModalVisible, setIsModalVisible, dispatch, loading, editId, setEditId}: Props) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields()
      .then(value => {
        if (editId) {
          return dispatch?.({
            type: 'book/update',
            payload: {
              value,
              id: editId,
              handleCancel
            }
          })
        }

        dispatch?.({
          type: 'book/create',
          payload: {
            value,
            handleCancel
          }
        })
      })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields()
    setEditId('')
  };

  useEffect(() => {
    if(editId) {
      async function fetchDetail(id: string) {
        const detailValue = await getDetailValue(id)
        
        form.setFieldsValue({
          title: detailValue.title,
          price: detailValue.price,
          yearRelease: detailValue.yearRelease,
          hired: detailValue.hired
        })
      }

      fetchDetail(editId)
    }
  }, [editId])

  return (
    <Modal 
      title="Update List Book" 
      visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
      okButtonProps={{
        loading: loading.effects['book/create']
      }}
    >
      <Spin spinning={!!loading.effects['book/create']}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="BookForm"
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title book!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price book!' }]}
          >
            <InputNumber style={{width: '100%'}} />
          </Form.Item>
          <Form.Item
            label="Year Release"
            name="yearRelease"
          >
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
          {
            editId ? (
              <Form.Item name="hired" label="Hired" valuePropName="checked">
                <Switch />
              </Form.Item>
            ) : ''
          }
        </Form>
      </Spin>
    </Modal>
  )
}

export default connect(({loading}: any) => ({loading}))(BookForm)