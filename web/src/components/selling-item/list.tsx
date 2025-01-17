import { Card, Empty, List, message, Popconfirm, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useCallback, useEffect, useState } from 'react';
import { base_url } from '../../constants/env';
import axiosInstance from '../../utils/axios';
import { currency } from '../../utils/rupiah';
import { sellingItemType } from './types';
import { DeleteOutlined } from '@ant-design/icons';
import TooltipButton from '../button/toolltip';
import { catchError } from '../../utils/catch-error';

const ContainerHeight = 250

export default function ListSellingItem({ id }: { id?: string }) {
  const [data, setData] = useState<sellingItemType[] | []>([])
  const [isLoading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState<string | undefined>(undefined)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/selling-items?sellingId=${id}`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as sellingItemType[])
      setLoading(false)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  const delData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.delete(`${base_url}/api/v1/selling-item/${deleted}`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setDeleted(undefined)
      setLoading(false)
      getData()
    }
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      getData();
    }
  };

  return (
    <Card
      className={`shadow-md shadow-blue-400`}
    >
      <List>
        {data?.length > 0 ?
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item: sellingItemType) => (
              <List.Item
                className='rounded-2xl hover:bg-[#f3f3f3]'
                key={item.id}
              >
                <List.Item.Meta
                  className='px-4'
                  title={<span>{item.stock?.product?.name}</span>}
                  description={
                    <span>[ Harga Satuan: {currency(Number(item.stock?.product?.price))} x  Jumlah: {item.amount} ] = Total: {currency(Number(item.total))}</span>
                  }
                />
                <div className='mr-4'>
                  {deleted === item?.id ?
                    <span className="flex flex-row justify-center gap-2">
                      <Typography.Link onClick={delData} style={{ marginInlineEnd: 8 }}>
                        Hapus
                      </Typography.Link>
                      <Popconfirm title="Batalkan tindakan hapus data ?" onConfirm={() => setDeleted(undefined)}>
                        <a>Batal</a>
                      </Popconfirm>
                    </span>
                    :
                    <TooltipButton
                      title="Delete Data"
                      text="Delete"
                      textSize='xs'
                      icon={<DeleteOutlined />}
                      type="dashed"
                      shape="circle"
                      size="middle"
                      onCLick={() => setDeleted(item?.id)}
                    />
                  }
                </div>
              </List.Item>
            )}
          </VirtualList> : <Empty />
        }
      </List>
    </Card>
  )
}
