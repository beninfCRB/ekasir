import { Breadcrumb, Card, Descriptions, DescriptionsProps, Spin } from "antd";
import { generateBreadcrumbItems } from "../breadcrumb";
import TooltipButton from "../button/toolltip";
import { RollbackOutlined } from "@ant-design/icons";
import { sellingType } from "./types";
import { currency } from "../../utils/rupiah";

interface DescriptionSellingType {
  data?: sellingType
  isLoading?: boolean
  onBack: () => void
}

export default function DescriptionSelling({ data, onBack, isLoading }: DescriptionSellingType) {
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
