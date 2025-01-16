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
    },
    {
      title: 'Nama Produk',
      dataIndex: ['product', 'name'],
      key: 'product.name',
      width: '25%',
    },
    {
      title: 'Jumlah Stok',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%'
    },
    {
      title: 'Kadaluarsa Stok',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      width: '25%',
      render: (expiredAt: Date | null) => expiredAt ? moment(expiredAt).format('DD/MM/YYYY') : '-'
    },
  ]

  return (
    <TableMod<stockType> columnlists={columns as stockType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableStock