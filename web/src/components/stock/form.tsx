import { DatePicker, Form, Input, InputNumber } from "antd";
import { FormType } from "../../types/form";
import FormButton from "../button/form";
import SelectProduct from "../product/select";

interface FormStockType extends FormType { }

export default function FormStock({ form, onSave, onCancel, asEdit, loading }: FormStockType) {
  return (
    <Form
      key={'StockForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Form.Item
        label='Kode Stok'
        name={'code'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Kode Stok'
          }
        ]}
      >
        <Input
          disabled={loading}
          placeholder='Masukan Kode Stok'
        />
      </Form.Item>
      <Form.Item
        label='Nama Stok'
        name={'productId'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Nama Stok'
          }
        ]}
      >
        <SelectProduct
          placeholder='Masukan Nama Stok'
          loading={loading}
        />
      </Form.Item>
      <Form.Item
        label='Jumlah Stok'
        name={'amount'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Jumlah Stok'
          }
        ]}
      >
        <InputNumber
          disabled={loading}
          className="w-full"
          placeholder='Masukan Jumlah Stok'
        />
      </Form.Item>
      <Form.Item
        label='Tanggal Kadaluarsa'
        name={'expiredAt'}
        hasFeedback
        rules={[
          {
            required: false,
            message: 'Masukan Tanggal Kadaluarsa'
          }
        ]}
      >
        <DatePicker
          disabled={loading}
          className="w-full"
          format={'DD/MM/YYYY'}
          placeholder='Masukan Tanggal Kadaluarsa'
        />
      </Form.Item>
      <FormButton onSave={onSave} onCancel={onCancel} loading={loading} asEdit={asEdit} />
    </Form>
  )
}
