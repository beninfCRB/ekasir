import { FormInstance } from "antd";
export type FormType = {
  id?: string
  asEdit?: boolean
  form: FormInstance
  loading?: boolean
  disabled?: boolean
  onSave?: (values?: any) => void
  onCancel?: (values?: any) => void
  className?: string
}