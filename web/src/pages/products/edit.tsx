import { RollbackOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Form, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import FormProduct from "../../components/product/form"
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"

export default function EditProduct() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/product/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      form.setFieldsValue({ ...response.data?.data })
    } catch (error: any) {
      message.error(error.message)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.put(`${base_url}/api/v1/product/${id}`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.resetFields()
    navigate('/admin/product')
  }

  const onBack = () => {
    navigate('/admin/product')
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        title='UBAH PRODUK'
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
        <FormProduct form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} />
      </Card>
    </div>
  )
}
