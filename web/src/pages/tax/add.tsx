import { RollbackOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Form, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import FormTax from "../../components/tax/form";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { catchError } from "../../utils/catch-error";

export default function AddTax() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.post(`${base_url}/api/v1/tax`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/tax/edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      catchError(error, message)
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
    <div className="w-full flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`w-2/3 shadow-md shadow-blue-400 self-center`}
        title='TAMBAH PAJAK'
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
        <FormTax form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} />
      </Card>
    </div>
  )
}
