import { RollbackOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Descriptions, DescriptionsProps, message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import { sellingType } from "../../components/selling/types";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { currency } from "../../utils/rupiah";

export default function ViewSelling() {
  const [data, setData] = useState<sellingType | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams();

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/selling/${id}`)

      if (!response.data?.data) {
        const errorData = response.data?.message
        message.error(errorData?.message)
      }

      setData(response.data?.data)
    } catch (error: any) {
      message.error(error.message)
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
      label: 'Kode Penjualan',
      children: data.code,
    },
    {
      key: '2',
      label: 'Besaran Pajak',
      children: data.tax?.percent ? `${data.tax?.percent} %` : '-',
    },
    {
      key: '3',
      label: 'Grand Total',
      children: data.grandTotal ? currency(Number(data.grandTotal)) : 0,
    },
    {
      key: '4',
      label: 'Biaya Kena Pajak',
      children: data.taxPrice ? currency(Number(data.taxPrice)) : 0,
    },
    {
      key: '5',
      label: 'Tunai',
      children: data.cashPrice ? currency(Number(data.cashPrice)) : 0,
    },
    {
      key: '6',
      label: 'Kembali',
      children: data.returnPrice ? currency(Number(data.returnPrice)) : 0,
    },
  ] : [];

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`shadow-md shadow-blue-400`}
        title="INFO PENJUALAN"
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
