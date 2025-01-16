import { Button, Space } from 'antd'
import { FormType } from '../../types/form'

interface FormButtonType extends Partial<FormType> { }

export default function FormButton({ onCancel, loading, onSave, asEdit }: FormButtonType) {
  return (
    <Space
      className="justify-end w-full"
    >
      <Button
        className='rounded-2xl'
        onClick={onCancel}
        loading={loading}
      >Batal</Button>
      <Button
        className='rounded-2xl'
        type="primary"
        onClick={onSave}
        loading={loading}
      >{asEdit ? 'Ubah' : 'Tambah'}</Button>
    </Space>
  )
}
