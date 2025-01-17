import { TableType } from '../../types/table'
import TableMod from '../table'
import { categoryType } from './types'

interface TableCategoryType extends TableType { }


const TableCategory = ({ data, onDelete, onView, loading }: TableCategoryType) => {

  const columns = [
    {
      title: 'Kode Kategori',
      dataIndex: 'code',
      key: 'code',
      width: '30%',
      sorter: {
        compare: (a: any, b: any) => a.code - b.code,
      },
    },
    {
      title: 'Nama Kategori',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
      },
    },
    {
      title: 'Keterangan',
      dataIndex: 'desc',
      key: 'desc',
      width: '30%',
      render: (desc: string | null) => desc ? desc : '-',
      sorter: {
        compare: (a: any, b: any) => a.desc - b.desc,
      },
    },
  ]

  return (
    <TableMod<categoryType> columnlists={columns as categoryType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableCategory