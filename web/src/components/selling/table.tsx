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
    },
    {
      title: 'Biaya Kena Pajak',
      dataIndex: 'taxPrice',
      key: 'taxPrice',
      width: '15%',
      render: (taxPrice: number | null) => currency(Number(taxPrice))
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      width: '20%',
      render: (grandTotal: number | null) => currency(Number(grandTotal))
    },
    {
      title: 'Tunai',
      dataIndex: 'cashPrice',
      key: 'cashPrice',
      width: '20%',
      render: (cashPrice: number | null) => currency(Number(cashPrice))
    },
    {
      title: 'Kembali',
      dataIndex: 'returnPrice',
      key: 'returnPrice',
      width: '15%',
      render: (returnPrice: number | null) => currency(Number(returnPrice))
    }
  ]

  return (
    <TableMod<sellingType> columnlists={columns as sellingType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}
