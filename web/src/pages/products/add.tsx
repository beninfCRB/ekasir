import { RollbackOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Form, GetProp, message, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import FormProduct from "../../components/product/form";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { catchError } from "../../utils/catch-error";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function AddProduct() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file as FileType)
        formData.append('name', values.name)
        formData.append('price', values.price)
        formData.append('categoryId', values.categoryId)
      });
      const response = await axiosInstance.post(`${base_url}/api/v1/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/product/edit/${response.data?.data?.id}`)
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
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='TAMBAH PRODUK'
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
        <FormProduct form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} fileList={fileList} setFileList={setFileList} />
      </Card>
    </div>
  )
}
