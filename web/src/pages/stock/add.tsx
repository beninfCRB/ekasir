import { RollbackOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Form, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import FormStock from "../../components/stock/form";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";

export default function AddStock() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.post(`${base_url}/api/v1/stock`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/stock/edit/${response.data?.data?.id}`)
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
    navigate(-1)
  }

  const onBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='TAMBAH STOK'
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
        <FormStock form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} />
      </Card>
    </div>
  )
}
