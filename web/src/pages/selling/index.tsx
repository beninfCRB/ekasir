import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Form, message, Popconfirm, Typography } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import TableSelling from "../../components/selling/table"
import { sellingType } from '../../components/selling/types'
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import { catchError } from "../../utils/catch-error"


const Selling = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data, setData] = useState<sellingType[] | []>([])
  const [isLoading, setLoading] = useState(true)
  const [create, setCreate] = useState<boolean>(false)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/sellings`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as sellingType[])
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  const delData = useCallback(async (id?: string) => {
    setLoading(true)
    try {
      const response = await axiosInstance.delete(`${base_url}/api/v1/selling/${id}`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
      getData()
    }
  }, [])

  const onAdd = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/data/selling/create`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      navigate(`/admin/selling/edit/${response.data?.data?.id}`)
      message.success(response.data?.message)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setCreate(false)
      setLoading(false)
    }
  }

  const onView = (id?: string) => {
    navigate(`view/${id}`)
  }

  const onRefresh = () => {
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title='DATA PENJUALAN'
        extra={
          create ? <span className="flex flex-row justify-center gap-2">
            <Typography.Link onClick={onAdd} style={{ marginInlineEnd: 8 }}>
              Lanjutkan
            </Typography.Link>
            <Popconfirm title="Batalkan tindakan penjualan data ?" onConfirm={() => setCreate(false)}>
              <a>Batal</a>
            </Popconfirm>
          </span> :
            <div className="flex flex-row gap-2 my-4">
              <TooltipButton
                title="Tambah Data"
                text="Tambah"
                icon={<PlusCircleOutlined />}
                type="primary"
                shape="circle"
                size="middle"
                onCLick={() => setCreate(true)}
              />
              <TooltipButton
                title="Segarkan Data"
                text="Segarkan"
                icon={<RedoOutlined />}
                type="default"
                shape="circle"
                size="middle"
                onCLick={onRefresh}
              />
            </div>
        }
      >
        <TableSelling key="table-selling" data={data} onDelete={delData} loading={isLoading} onView={onView} />
      </Card>
    </div>
  )
}

export default Selling