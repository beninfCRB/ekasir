import { RollbackOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Descriptions, DescriptionsProps, message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import { taxType } from "../../components/tax/types";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { catchError } from "../../utils/catch-error";

export default function ViewTax() {
  const [data, setData] = useState<taxType | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/tax/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      setData(response.data?.data)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id])

  const onBack = () => {
    navigate(-1)
  }

  const items: DescriptionsProps['items'] = data ? [
    {
      key: '1',
      label: 'Kode Pajak',
      children: data.code,
    },
    {
      key: '2',
      label: 'Nama Pajak',
      children: data.name,
    },
    {
      key: '3',
      label: 'Besaran Pajak',
      children: data.percent,
    },
    {
      key: '4',
      label: 'Keterangan Pajak',
      children: data.desc,
    }
  ] : [];

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title="INFO PAJAK"
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
        <Spin spinning={isLoading}>
          <Descriptions items={items} />
        </Spin>
      </Card>
    </div>
  )
}
