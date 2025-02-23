import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Popconfirm, Space, Table, TableColumnType, TableProps, Typography } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useNavigate } from 'react-router'
import TooltipButton from './button/toolltip'

interface TableModType<T> {
  data: T[] | []
  columnlists: T[]
  onDelete: (v: any) => void
  onView: (v: any) => void
  loading: boolean
}

export default function TableMod<T extends { id?: string }>({ data, columnlists, onDelete, onView, loading }: TableModType<T>) {
  type DataIndex = keyof T;

  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [deleted, setDeleted] = useState<string | undefined>(undefined)

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as any);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<T> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex as string}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex as any);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value: any, record: T) =>
      record[dataIndex]?.toString().toLowerCase().includes(value?.toString().toLowerCase()) ?? false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const onEdit = (id: string) => {
    navigate(`edit/${id}`)
  }

  const columns = [
    ...columnlists.map((column: any) => ({
      ...column,
      ...getColumnSearchProps(column.dataIndex as DataIndex),
      render: column.render
    })),
    {
      title: <div className="flex justify-center">Aksi</div>,
      dataIndex: 'operation',
      render: (_: any, record: T) => {
        return (
          deleted === record.id ? <span className="flex flex-row justify-center gap-2">
            <Typography.Link onClick={() => onDelete(record.id as string)} style={{ marginInlineEnd: 8 }}>
              Lanjutkan
            </Typography.Link>
            <Popconfirm title="Batalkan tindakan hapus data ?" onConfirm={() => setDeleted(undefined)}>
              <a>Batal</a>
            </Popconfirm>
          </span>
            :
            <div className="flex flex-row justify-center gap-2">
              <TooltipButton
                title="Lihat Data"
                text="Lihat"
                textSize='xs'
                icon={<EyeOutlined />}
                type="dashed"
                shape="circle"
                size="middle"
                onCLick={() => onView(record.id as string)}
              />
              <TooltipButton
                title="Edit Data"
                text="Edit"
                textSize='xs'
                icon={<EditOutlined />}
                type="dashed"
                shape="circle"
                size="middle"
                onCLick={() => onEdit(record.id as string)}
              />
              <TooltipButton
                title="Hapus Data"
                text="Hapus"
                textSize='xs'
                icon={<DeleteOutlined />}
                type="dashed"
                shape="circle"
                size="middle"
                onCLick={() => setDeleted(record.id as string)}
              />
            </div>
        )
      },
    },
  ]

  const tableProps: TableProps<T> = {
    dataSource: Array.isArray(data) ? data : [],
    columns: columns,
    loading: loading,
  }

  return (
    <Table<T>
      rowKey={'id'}
      scroll={{ x: 'max-content' }}
      bordered
      {...tableProps}
    />
  )
}
