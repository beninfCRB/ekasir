import { PrinterOutlined, RollbackOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Divider, Form, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import { ModalReport } from "../../components/report/modal"
import ListSellingItem from "../../components/selling-item/list"
import FormSelling from "../../components/selling/form"
import TabsMod from "../../components/tabs"
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import AddSellingItem from "../selling-item/add"
import { catchError } from "../../utils/catch-error"

export default function EditSelling() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();
  const [tab, setTab] = useState<string>('selling')
  const [modal, setModal] = useState<boolean>(false)


  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/selling/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      form.setFieldsValue({ ...response.data?.data })
    } catch (error: any) {
      catchError(error, message)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id,tab])

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
      catchError(error, message)
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

  const onPrint = () => {
    setModal((value: boolean) => !value)
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col gap-2">
        <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
        <Card
          className={`w-2/3 shadow-md shadow-blue-400 self-center`}
          title='UBAH PENJUALAN'
          extra={
            <div className="flex flex-row gap-2 my-4">
              <TooltipButton
                title="Cetak Laporan"
                text="Cetak Laporan"
                icon={<PrinterOutlined />}
                type="default"
                shape="circle"
                size="middle"
                onCLick={onPrint}
              />
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
            active={tab as string}
            onChange={(activeKey) => setTab(activeKey)}
            size='large'
            items={[
              {
                key: 'selling',
                label: 'HEAD',
                children: <div>
                  <FormSelling form={form} onSave={onSubmit} onCancel={onCancel} loading={isLoading} asEdit={id ? true : false} />
                  <Divider plain style={{ fontWeight: 'bold' }}>DAFTAR ITEM</Divider>
                  <ListSellingItem id={id} tab={tab} />
                </div>
              },
              {
                key: 'selling-item',
                label: 'ITEM',
                children: <div>
                  <AddSellingItem id={id} setTab={setTab} onRefresh={onRefresh} />
                </div>
              }
            ]}
          />
        </Card>
      </div>
      {modal &&
        <ModalReport id={id as string} isModalOpen={modal} setModalOpen={setModal} />
      }
    </div>
  )
}
