import { message } from "antd"
import { SelectType } from "../../types/select"
import { useCallback, useEffect, useState } from "react"
import { categoryType } from "./types"
import axiosInstance from "../../utils/axios"
import { base_url } from "../../constants/env"
import { Select, SelectItem } from "../select"
import { catchError } from "../../utils/catch-error"

interface SelecCategory extends SelectType { }

export default function SelectCategory({ loading, placeholder, ...props }: SelecCategory) {
  const [data, setData] = useState<categoryType[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/categories`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as categoryType[])
    } catch (error: any) {
      catchError(error, message)
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
