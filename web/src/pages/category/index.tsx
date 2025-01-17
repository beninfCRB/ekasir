import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { generateBreadcrumbItems } from "../../components/breadcrumb"
import TooltipButton from "../../components/button/toolltip"
import TableCategory from "../../components/category/table"
import { categoryType } from '../../components/category/types'
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import { catchError } from "../../utils/catch-error"


const Category = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data, setData] = useState<categoryType[] | []>([])
  const [isLoading, setLoading] = useState(true)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/categorys`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as categoryType[])
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  const delData = useCallback(async (id?: string) => {
    setLoading(true)
    try {
      const response = await axiosInstance.delete(`${base_url}/api/v1/category/${id}`)
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
        title='DATA KATEGORI'
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
        <TableCategory key="table-category" data={data} onDelete={delData} loading={isLoading} onView={onView} />
      </Card>
    </div>
  )
}

export default Category