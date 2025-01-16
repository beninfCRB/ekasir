import { RollbackOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Form, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import FormCategory from "../../components/category/form"
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"

export default function EditCategory() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/category/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      form.setFieldsValue({ ...response.data?.data })
    } catch (error: any) {
      message.error(error.response.data.message)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.put(`${base_url}/api/v1/category/${id}`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/category/edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      if (error.status === 422 && Array.isArray(error.response.data.message)) {
        error.response.data.message.map((v: any) => message.error(v.msg))
      } else {
        message.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.resetFields()
    navigate('/admin/category')
  }

  const onBack = () => {
    navigate('/admin/category')
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='UBAH KATEGORI'
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
        <FormCategory form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} asEdit={id ? true : false} />
      </Card>
    </div>
  )
}
