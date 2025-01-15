import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input } from "antd";

export const FormSignIn = ({ form, onSubmit }: {
  form: FormInstance;
  onSubmit: () => void;
}) => {
  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form box"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: 'Masukan Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Masukan Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>


      <Form.Item className='text-center mt-4'>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          MASUK
        </Button>
      </Form.Item>
    </Form>
  )
}