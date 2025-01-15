import { TableType } from '../../types/table'
import { currency } from '../../utils/rupiah'
import TableMod from '../table'
import { productType } from './types'

interface TableProductType extends TableType { }


const TableProduct = ({ data, onDelete, onView, loading }: TableProductType) => {

  const columns = [
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      width: '40%',
      render: (price: string) => currency(Number(price)),
    },
  ]

  return (
    <TableMod<productType> columnlists={columns as productType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableProduct