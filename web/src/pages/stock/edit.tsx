import { RollbackOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Form, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import FormStock from "../../components/stock/form"
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import moment from "moment"
import { catchError } from "../../utils/catch-error"

export default function EditStock() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/stock/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      form.setFieldsValue({
        ...response.data?.data,
        expiredAt: response.data?.data.expiredAt ? moment(response.data?.data.expiredAt) : null
      })
    } catch (error: any) {
      catchError(error, message)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.put(`${base_url}/api/v1/stock/${id}`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/stock/edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.resetFields()
    navigate('/admin/stock')
  }

  const onBack = () => {
    navigate('/admin/stock')
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='UBAH STOK'
        extra={
          <div className="flex flex-row gap-2 my-4">
            <TooltipButton
              title="Kembali halaman sebelumnya"
              text="Kembali"
              icon={<RollbackOutlined />}
              type="primary"
              shape="circle"
              size="middle"
              onCLick={onBack}
            />
          </div>
        }
      >
        <FormStock form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} asEdit={id ? true : false} />
      </Card>
    </div>
  )
}
