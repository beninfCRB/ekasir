import { Button, DatePicker, Form, Input, InputNumber, Space } from "antd";
import { FormType } from "../../types/form";
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
          placeholder='Masukan Kode Produk'
        />
      </Form.Item>
      <Form.Item
        label='Nama Produk'
        name={'productId'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Nama Produk'
          }
        ]}
      >
        <SelectProduct
          placeholder='Masukan Nama Produk'
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
          className="w-full"
          format={'DD/MM/YYYY'}
          placeholder='Masukan Tanggal Kadaluarsa'
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
