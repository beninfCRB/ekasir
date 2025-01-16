import { Button, Form, Input, InputNumber, Space } from "antd";
import { FormType } from "../../types/form";

interface FormSellingType extends FormType { }

export default function FormSelling({ form, onSave, onCancel, loading, asEdit }: FormSellingType) {
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
          disabled={asEdit}
          placeholder='Masukan Kode Produk'
        />
      </Form.Item>
      <Form.Item
        label='Bayar Tunai'
        name={'cashPrice'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Bayar Tunai'
          }
        ]}
      >
        <InputNumber
          className='w-full'
          addonBefore='Rp.'
          placeholder='Masukan Bayar Tunai'
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value!.replace(/Rp\s?|(,*)/g, '')}
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
        >Bayar</Button>
      </Space>
    </Form>
  )
}
