import { CloseCircleOutlined, PrinterOutlined } from "@ant-design/icons"
import { message, Modal, Skeleton } from "antd"
import { useCallback, useEffect, useState } from "react"
import TemplateReport from "../../components/report/template"
import { sellingType } from '../../components/selling/types'
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import TooltipButton from "../button/toolltip"
import { catchError } from "../../utils/catch-error"

interface ModalReportType {
  id: string
  isModalOpen: boolean
  setModalOpen: (v: boolean) => void
}

export const ModalReport = ({ id, isModalOpen, setModalOpen }: ModalReportType) => {
  const [data, setData] = useState<sellingType>()
  const [isLoading, setLoading] = useState(false)
  const [isGenerating, setGenerating] = useState(false)

  const handleGeneratePdf = async () => {
    try {
      setGenerating(true)
      const response = await axiosInstance.get(`${base_url}/api/v1/report/generate/pdf/${id}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        },
        timeout: 30000 
      })
      
      if (response.headers['content-type'] !== 'application/pdf') {
        throw new Error('Server did not return a PDF')
      }

      const blob = new Blob([response.data], { type: 'application/pdf' })
      
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `laporan-${data?.code}.pdf`)
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 100)

      message.success('PDF berhasil di generate')
    } catch (error: any) {
      console.error('PDF Generation Error:', error)
      message.error(error.response?.data?.message || 'Gagal generate PDF')
    } finally {
      setGenerating(false)
    }
  }

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/report/selling/${id}`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as sellingType)
    } catch (error: any) {
      catchError(error, message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [id])

  const onCancel = () => {
    setModalOpen(false)
  }

  return (
    <Modal width={'1000px'} title="CETAK" open={isModalOpen} onCancel={onCancel} footer={[
      <div key="footer" className="flex flex-row gap-2 my-4 justify-end mt-8">
        <TooltipButton
          title="Generate PDF"
          text="Generate PDF"
          icon={<PrinterOutlined />}
          type="default"
          shape="circle"
          size="middle"
          loading={isGenerating}
          onCLick={handleGeneratePdf}
        />
        <TooltipButton
          title="Tutup"
          text="Tutup"
          icon={<CloseCircleOutlined />}
          type="primary"
          shape="circle"
          size="middle"
          onCLick={onCancel}
        />
      </div>
    ]}>
      {
        isLoading ?
          <Skeleton /> :
          <TemplateReport data={data as sellingType}/>
      }
    </Modal>
  )
}