import { Form, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { FormSignIn } from '../../components/auth/signin/form'
import { base_url } from '../../constants/env'
import { useNavigate } from 'react-router'
import axiosInstance from '../../utils/axios'
import { signinType } from '../../components/auth/signin/types'
import { ProtectedRoute } from '../protected-route'

export default function Signin() {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<signinType | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data))
      message.success("Sign In berhasil")
      navigate('/admin/product', { replace: true })
    }
  }, [data, navigate])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const response = await axiosInstance.post(`${base_url}/api/v1/signin`, values)

      if (!response.data?.data) {
        message.error(response.data?.message)
      }

      setData(response.data?.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 bg-[url('assets/image/bg-sign in.jpeg')] bg-cover bg-center">
        <div className="flex flex-col bg-white shadow-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-md w-full max-w-xs shadow-blue-400">
          <div className="font-bold text-center text-xl sm:text-2xl uppercase text-gray-800">
            SELAMAT DATANG
            <p className='text-xs text-gray-300'>silahkan masuk ke akun anda</p>
          </div>
          <div className="mt-10">
            <Spin spinning={isLoading}>
              <FormSignIn form={form} onSubmit={onSubmit} />
            </Spin>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
