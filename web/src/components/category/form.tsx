import { Button, Form, Input, Space } from "antd";
import { FormType } from "../../types/form";

interface FormCategoryType extends FormType { }

export default function FormCategory({ form, onSave, onCancel, asEdit, loading }: FormCategoryType) {
  return (
    <Form
      key={'CategoryForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Form.Item
        label='Nama Kategori'
        name={'name'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Nama Kategori'
          }
        ]}
      >
        <Input
          placeholder='Masukan Nama Kategori'
        />
      </Form.Item>
      <Form.Item
        label='Keterangan Kategori'
        name={'desc'}
        hasFeedback
        rules={[
          {
            required: false,
            message: 'Masukan Keterangan Kategori'
          }
        ]}
      >
        <Input.TextArea
          rows={2}
          placeholder='Masukan Keterangan Kategori'
        />
      </Form.Item>
      <Space
        className="justify-end w-full"
      >
        <Button
          onClick={onCancel}
          loading={loading}
        >Batal</Button>
        <Button
          type="primary"
          onClick={onSave}
          loading={loading}
        >{asEdit ? 'Ubah' : 'Tambah'}</Button>
      </Space>
    </Form>
  )
}
