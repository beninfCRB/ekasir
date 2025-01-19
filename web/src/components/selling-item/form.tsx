import { Form, Input, InputNumber } from "antd";
import { FormType } from "../../types/form";
import FormButton from "../button/form";

interface FormSellingItemType extends FormType { }

export default function FormSellingItem({ form, onSave, onCancel, loading, asEdit }: FormSellingItemType) {
  return (
    <Form
      key={'SellingForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Form.Item
        label='Kode Produk'
        name={'code'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Kode Produk'
          }
        ]}
      >
        <Input
           disabled={loading}
          placeholder='Masukan Kode Produk'
        />
      </Form.Item>
      <Form.Item
        label='Jumlah Item'
        name={'amount'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Jumlah Item'
          }
        ]}
      >
        <InputNumber
          disabled={loading}
          className='w-full'
          placeholder='Masukan Jumlah Item'
        />
      </Form.Item>
      <FormButton onSave={onSave} onCancel={onCancel} loading={loading} asEdit={asEdit} />
    </Form>
  )
}
