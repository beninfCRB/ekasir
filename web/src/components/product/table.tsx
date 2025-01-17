import { TableType } from '../../types/table'
import { currency } from '../../utils/rupiah'
import TableMod from '../table'
import { productType } from './types'

interface TableProductType extends TableType { }


const TableProduct = ({ data, onDelete, onView, loading }: TableProductType) => {

  const columns = [
    {
      title: 'Kode Produk',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      sorter: {
        compare: (a: any, b: any) => a.code - b.code,
      },
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
      },
    },
    {
      title: 'Kategori Produk',
      dataIndex: ['category', 'name'],
      key: 'category.name',
      width: '25%',
      sorter: {
        compare: (a: any, b: any) => a.category.name - b.category.name,
      },
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
      render: (price: string) => currency(Number(price)),
      sorter: {
        compare: (a: any, b: any) => a.price - b.price,
      },
    },
  ]

  return (
    <TableMod<productType> columnlists={columns as productType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableProduct