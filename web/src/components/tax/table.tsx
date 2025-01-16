import { TableType } from '../../types/table'
import TableMod from '../table'
import { taxType } from './types'

interface TableTaxType extends TableType { }


const TableTax = ({ data, onDelete, onView, loading }: TableTaxType) => {

  const columns = [
    {
      title: 'Kode Pajak',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
    },
    {
      title: 'Nama Pajak',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Besaran Pajak',
      dataIndex: 'percent',
      key: 'percent',
      width: '10%',
      render: (percent: number) => `${percent} %`
    },
    {
      title: 'Keterangan Pajak',
      dataIndex: 'desc',
      key: 'desc',
      width: '25%',
      render: (desc: string) => desc ? desc : '-'
    }
  ]

  return (
    <TableMod<taxType> columnlists={columns as taxType[]} data={data} onDelete={onDelete} loading={loading} onView={onView} />
  )
}

export default TableTax