import { Button, Form, Input } from "antd"
import { connect, Dispatch, Loading } from "umi";
import styles from './index.less';

interface Props {
  loading: Loading
  dispatch: Dispatch
}

function Login({loading, dispatch}: Props) {
  const token = localStorage.getItem('auth')
  if (token) {
    window.location.replace('/')
  }

  const onFinish = (values: any) => {
    dispatch?.({
      type: 'auth/login',
      payload: {
        values,
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading.effects['auth/login']} type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        </div>
    </div>
  )
}

export default connect(({loading}: any) => ({loading}))(Login)