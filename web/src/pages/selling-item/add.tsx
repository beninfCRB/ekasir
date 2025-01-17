import { Breadcrumb, Card, Form, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import FormSellingItem from "../../components/selling-item/form";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { catchError } from "../../utils/catch-error";

interface AddSellingItemType {
  id?: string,
  setTab: (v: string) => void
  onRefresh: () => void
}

export default function AddSellingItem({ id, setTab, onRefresh }: AddSellingItemType) {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.post(`${base_url}/api/v1/selling-item`, { ...values, sellingId: id })

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/selling/edit/${id}`)
      setTab('selling')
      onRefresh()
      message.success(response.data?.message)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setTab('selling')
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.resetFields()
    navigate(-1)
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='TAMBAH KATEGORI'
      >
        <FormSellingItem form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} />
      </Card>
    </div>
  )
}
