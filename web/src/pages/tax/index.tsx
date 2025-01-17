import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import TableTax from "../../components/tax/table"
import { taxType } from '../../components/tax/types'
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import { catchError } from "../../utils/catch-error"


const Tax = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data, setData] = useState<taxType[] | []>([])
  const [isLoading, setLoading] = useState(true)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/taxs`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as taxType[])
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  const delData = useCallback(async (id?: string) => {
    setLoading(true)
    try {
      const response = await axiosInstance.delete(`${base_url}/api/v1/tax/${id}`)
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

  const onAdd = () => {
    navigate('add')
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
        title='DATA PAJAK'
        extra={
          <div className="flex flex-row gap-2 my-4">
            <TooltipButton
              title="Tambah Data"
              text="Tambah"
              icon={<PlusCircleOutlined />}
              type="primary"
              shape="circle"
              size="middle"
              onCLick={onAdd}
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
        <TableTax key="table-tax" data={data} onDelete={delData} loading={isLoading} onView={onView} />
      </Card>
    </div>
  )
}

export default Tax