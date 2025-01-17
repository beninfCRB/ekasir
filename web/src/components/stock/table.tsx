import { TableType } from '../../types/table'
import TableMod from '../table'
import { stockType } from './types'
import moment from 'moment';

interface TableStockType extends TableType { }


const TableStock = ({ data, onDelete, onView, loading }: TableStockType) => {

  const columns = [
    {
      title: 'Kode Stok',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      sorter: {
        compare: (a: any, b: any) => a.code - b.code,
      },
    },
    {
      title: 'Nama Produk',
      dataIndex: ['product', 'name'],
      key: 'product.name',
      width: '25%',
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
      },
    },
    {
      title: 'Jumlah Stok',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
      sorter: {
        compare: (a: any, b: any) => a.amount - b.amount,
      },
    },
    {
      title: 'Kadaluarsa Stok',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      width: '25%',
      render: (expiredAt: Date | null) => expiredAt ? moment(expiredAt).format('DD/MM/YYYY') : '-',
      sorter: {
        compare: (a: any, b: any) => a.expiredAt - b.expiredAt,
      },
    },
  ]

  return (
    <TableMod<stockType> columnlists={columns as stockType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableStock