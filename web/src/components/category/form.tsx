import { Form, Input } from "antd";
import { FormType } from "../../types/form";
import FormButton from "../button/form";

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
          disabled={loading}
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
          disabled={loading}
          rows={2}
          placeholder='Masukan Keterangan Kategori'
        />
      </Form.Item>
      <FormButton onSave={onSave} onCancel={onCancel} loading={loading} asEdit={asEdit} />
    </Form>
  )
}
