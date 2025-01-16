import { RollbackOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Card, Divider, Form, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import ListSellingItem from "../../components/selling-item/list"
import FormSelling from "../../components/selling/form"
import TabsMod from "../../components/tabs"
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import AddSellingItem from "../selling-item/add"

export default function EditSelling() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();
  const [tab, setTab] = useState<string>('selling')


  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/selling/${id}`)

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
      const response = await axiosInstance.put(`${base_url}/api/v1/selling/${id}`, values)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/selling/edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      if (error.status === 422 && Array.isArray(error.response.data.message)) {
        error.response.data.message.map((v: any) => message.error(v.msg))
      } else {
        message.error(error.response.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.resetFields()
    navigate('/admin/selling')
  }

  const onBack = () => {
    navigate('/admin/selling')
  }

  const onRefresh = () => {
    getData()
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='UBAH PENJUALAN'
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
        <TabsMod
          key={'tabsSellingItem'}
          defaultActiveKey={tab}
          size='large'
          items={[
            {
              key: 'selling',
              label: 'HEAD',
              children: <div
                onClick={() => setTab('selling')}
              >
                <FormSelling form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} asEdit={id ? true : false} />
                <Divider plain>DAFTAR ITEM</Divider>
                <ListSellingItem id={id} />
              </div>
            },
            {
              key: 'selling-item',
              label: 'ITEM',
              children: <div
                onClick={() => setTab('selling-item')}
              >
                <AddSellingItem id={id} setTab={setTab} onRefresh={onRefresh} />
              </div>
            }
          ]}
        />
      </Card>
    </div>
  )
}
