import { Button, Form, Input, InputNumber, Space } from "antd";
import { FormType } from "../../types/form";
import FormButton from "../button/form";

interface FormTaxType extends FormType { }

export default function FormTax({ form, onSave, onCancel, asEdit, loading }: FormTaxType) {
  return (
    <Form
      key={'TaxForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Form.Item
        label='Nama Pajak'
        name={'name'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Nama Pajak'
          }
        ]}
      >
        <Input
          placeholder='Masukan Nama Pajak'
        />
      </Form.Item>
      <Form.Item
        label='Besaran Pajak'
        name={'percent'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Masukan Besaran Pajak'
          }
        ]}
      >
        <InputNumber
          className="w-full"
          addonAfter='%'
          placeholder='Masukan Besaran Pajak'
        />
      </Form.Item>
      <Form.Item
        label='Keterangan Pajak'
        name={'desc'}
        hasFeedback
        rules={[
          {
            required: false,
            message: 'Masukan Keterangan Pajak'
          }
        ]}
      >
        <Input.TextArea
          rows={2}
          placeholder='Masukan Keterangan Pajak'
        />
      </Form.Item>
      <FormButton onSave={onSave} onCancel={onCancel} loading={loading} asEdit={asEdit} />
    </Form>
  )
}
