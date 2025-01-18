import { Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { FormType } from "../../types/form";

interface FormSellingType extends FormType { }

export default function FormSelling({ form, onSave, onCancel, loading, asEdit }: FormSellingType) {
  const span = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
  }

  return (
    <Form
      key={'SellingForm'}
      layout='vertical'
      form={form}
      initialValues={{ layout: 'vertical' }}
    >
      <Row
        gutter={[10, 10]}
      >
        <Col
          {...span}
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
            label='Grand Total'
            name={'grandTotal'}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Masukan Grand Total'
              }
            ]}
          >
            <InputNumber
              disabled
              className='w-full'
              addonBefore='Rp.'
              placeholder='Masukan Grand Total'
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/Rp\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col
          {...span}
        >
          <Form.Item
            noStyle
            shouldUpdate={(prev, next) => prev.cashPrice !== next.cashPrice}
          >
            {({ getFieldValue }) =>
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
                  disabled={getFieldValue('cashPrice') > 0 ? true : false}
                  className='w-full'
                  addonBefore='Rp.'
                  placeholder='Masukan Bayar Tunai'
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/Rp\s?|(,*)/g, '')}
                />
              </Form.Item>
            }
          </Form.Item>
          <Form.Item
            label='Uang Kembali'
            name={'returnPrice'}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Masukan Uang Kembali'
              }
            ]}
          >
            <InputNumber
              className='w-full'
              addonBefore='Rp.'
              placeholder='Masukan Uang Kembali'
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/Rp\s?|(,*)/g, '')}
              disabled={asEdit}
            />
          </Form.Item>
        </Col>
      </Row>
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
