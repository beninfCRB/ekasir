import { Form, Input, InputNumber } from "antd";
import { FormType } from "../../types/form";
import FormButton from "../button/form";
import SelectCategory from "../category/select";

interface FormProductType extends FormType { }

export default function FormProduct({ form, onSave, onCancel, asEdit, loading }: FormProductType) {
  return (
    <Form
      key={'ProductForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Form.Item
        label='Nama Produk'
        name={'name'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Nama Produk'
          }
        ]}
      >
        <Input
          placeholder='Masukan Nama Produk'
        />
      </Form.Item>
      <Form.Item
        label='Kategori Produk'
        name={'categoryId'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Kategori Produk'
          }
        ]}
      >
        <SelectCategory
          placeholder="Masukan Kategori Produk"
          loading={loading}
        />
      </Form.Item>
      <Form.Item
        label='Harga Produk'
        name={'price'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Harga Produk'
          }
        ]}
      >
        <InputNumber
          className='w-full'
          addonBefore='Rp.'
          placeholder='Masukan Harga Produk'
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value!.replace(/Rp\s?|(,*)/g, '')}
        />
      </Form.Item>
      <FormButton onSave={onSave} onCancel={onCancel} loading={loading} asEdit={asEdit} />
    </Form>
  )
}
