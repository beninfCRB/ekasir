import { message } from "antd"
import { SelectType } from "../../types/select"
import { useCallback, useEffect, useState } from "react"
import { productType } from "./types"
import axiosInstance from "../../utils/axios"
import { base_url } from "../../constants/env"
import { Select, SelectItem } from "../select"

interface SelecProduct extends SelectType { }

export default function SelectProduct({ loading, placeholder, ...props }: SelecProduct) {
  const [data, setData] = useState<productType[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/products`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as productType[])
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
            {value.name}
          </SelectItem.Option>
        ))
      }
    </Select>
  )
}
