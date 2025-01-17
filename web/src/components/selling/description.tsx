import { Descriptions, DescriptionsProps } from "antd";
import { currency } from "../../utils/rupiah";
import { sellingType } from "./types";

interface DescriptionSellingType {
  data?: sellingType
}

export default function DescriptionSelling({ data }: DescriptionSellingType) {
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
    <Descriptions items={items} />
  )
}
