import { message } from "antd"
import { SelectType } from "../../types/select"
import { useCallback, useEffect, useState } from "react"
import { stockType } from "./types"
import axiosInstance from "../../utils/axios"
import { base_url } from "../../constants/env"
import { Select, SelectItem } from "../select"

interface SelecStock extends SelectType { }

export default function SelectStock({ loading, placeholder, ...props }: SelecStock) {
  const [data, setData] = useState<stockType[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/stocks`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as stockType[])
    } catch (err: any) {
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return (
    <Select
      loading={isLoading}
      disabled={isLoading}
      placeholder={placeholder}
      allowClear
      {...props}
    >
      {
        data.map((value, i) => (
          <SelectItem.Option key={i} value={value.id}>
            {value.produk?.name} ( {value.amount} )
          </SelectItem.Option>
        ))
      }
    </Select>
  )
}
