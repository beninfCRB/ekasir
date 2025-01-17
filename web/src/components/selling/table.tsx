import { TableType } from "../../types/table"
import { currency } from "../../utils/rupiah"
import TableMod from "../table"
import { sellingType } from "./types"

interface TableSellingType extends TableType { }

export default function TableSelling({ data, onDelete, onView, loading }: TableSellingType) {

  const columns = [
    {
      title: 'Kode Penjualan',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
      sorter: {
        compare: (a: any, b: any) => a.code - b.code,
      },
    },
    {
      title: 'Biaya Kena Pajak',
      dataIndex: 'taxPrice',
      key: 'taxPrice',
      width: '15%',
      render: (taxPrice: number | null) => currency(Number(taxPrice)),
      sorter: {
        compare: (a: any, b: any) => a.taxPrice - b.taxPrice,
      },
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      width: '20%',
      render: (grandTotal: number | null) => currency(Number(grandTotal)),
      sorter: {
        compare: (a: any, b: any) => a.grandTotal - b.grandTotal,
      },
    },
    {
      title: 'Tunai',
      dataIndex: 'cashPrice',
      key: 'cashPrice',
      width: '20%',
      render: (cashPrice: number | null) => currency(Number(cashPrice)),
      sorter: {
        compare: (a: any, b: any) => a.cashPrice - b.cashPrice,
      },
    },
    {
      title: 'Kembali',
      dataIndex: 'returnPrice',
      key: 'returnPrice',
      width: '15%',
      render: (returnPrice: number | null) => currency(Number(returnPrice)),
      sorter: {
        compare: (a: any, b: any) => a.returnPrice - b.returnPrice,
      },
    }
  ]

  return (
    <TableMod<sellingType> columnlists={columns as sellingType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}
