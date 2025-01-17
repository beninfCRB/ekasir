import { CloseCircleOutlined, PrinterOutlined } from "@ant-design/icons"
import { message, Modal, Skeleton } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import TemplateReport from "../../components/report/template"
import { sellingType } from '../../components/selling/types'
import { base_url } from "../../constants/env"
import axiosInstance from "../../utils/axios"
import TooltipButton from "../button/toolltip"
import jsPDF from "jspdf"

interface ModalReportType {
  id: string
  isModalOpen: boolean
  setModalOpen: (v: boolean) => void
}

export const ModalReport = ({ id, isModalOpen, setModalOpen }: ModalReportType) => {
  const [data, setData] = useState<sellingType>()
  const [isLoading, setLoading] = useState(false)
  const reportTemplateRef = useRef(null)

  const handleGeneratePdf = async () => {
    if (!reportTemplateRef.current) return
    const doc = new jsPDF({
      format: 'A4',
      unit: 'mm',
      orientation: 'portrait'
    })

    doc.html(reportTemplateRef.current, {
      html2canvas: {
        scale: 0.2,
      },
      callback: async () => {
        await doc.save(`${data?.code}.pdf`)
      },
      x: 10,
      y: 10,
    })
  }

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/report/${id}`)
      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data as sellingType)
    } catch (error: any) {
      if (error.status === 422 && Array.isArray(error.response.data.message)) {
        error.response.data.message.map((v: any) => message.error(v.msg))
      } else {
        message.error(error.response.data.message)
      }
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

  const onGenerate = () => {
    handleGeneratePdf()
  }

  return (
    <Modal width={'1000px'} title="CETAK" open={isModalOpen} onCancel={onCancel} footer={[
      <div className="flex flex-row gap-2 my-4 justify-end mt-8">
        <TooltipButton
          title="Generate PDF"
          text="Generate PDF"
          icon={<PrinterOutlined />}
          type="default"
          shape="circle"
          size="middle"
          onCLick={onGenerate}
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
          <TemplateReport data={data as sellingType} template={reportTemplateRef} />
      }
    </Modal>
  )
}