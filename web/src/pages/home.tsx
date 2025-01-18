import { DashboardOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Image, Layout, Menu, Select, Spin, Input, Badge, Empty, Typography, Row, Col, Statistic, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import TooltipButton from '../components/button/toolltip'
import { productType } from '../components/product/types'
import { base_url } from '../constants/env'
import axiosInstance from '../utils/axios'

const { Header, Content } = Layout
const { Search } = Input
const { Title, Text } = Typography

interface CategoryType {
  id: string
  name: string
}

export default function Home() {
  const [data, setData] = useState<productType[]>([])
  const [filteredData, setFilteredData] = useState<productType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const locale = JSON.parse(String(localStorage.getItem('user')))

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/categories`)
      setCategories(response.data?.data || [])
    } catch (error) {
      message.error('Gagal memuat kategori')
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${base_url}/api/v1/public/products`)
      setData(response.data?.data)
      setFilteredData(response.data?.data)
    } catch (error) {
      message.error('Gagal memuat data produk')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [selectedCategory, searchText, data])

  const filterProducts = () => {
    let filtered = [...data]
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category?.id === selectedCategory)
    }

    if (searchText) {
      filtered = filtered.filter(product => 
        (product?.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (product?.category?.name || '').toLowerCase().includes(searchText.toLowerCase())
      )
    }
    
    setFilteredData(filtered)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price)
  }

  return (
    <Layout className="min-h-screen">
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', position: 'sticky', top: 0, zIndex: 1, boxShadow: '0 2px 8px #f0f1f2' }}>
        <div className="flex justify-between items-center w-full">
          <Link to="/">
            <Title level={3} style={{ margin: 0 }}>E-KASIR</Title>
          </Link>
          <div className="flex items-center gap-4">
            <Menu mode="horizontal">
              <Menu.Item key="signin">
                <Link to="/signin">
                  <TooltipButton
                    title={locale ? 'Dashboard' : 'Sign In'}
                    text={locale ? 'Dashboard' : 'Sign In'}
                    textSize="xs"
                    icon={locale ? <DashboardOutlined /> : <LogoutOutlined />}
                    type="primary"
                    shape="circle"
                    size="middle"
                  />
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Header>
      <Content className="p-8 bg-gray-200">
        <Spin spinning={loading}>
          <div className='flex flex-col gap-8 max-w-7xl mx-auto'>
            <div className="text-center">
              <Title level={2}>KATALOG PRODUK</Title>
              <Text type="secondary">Temukan produk berkualitas dengan harga terbaik</Text>
            </div>

            <Row gutter={[16, 16]} className="mb-8">
              <Col xs={24} sm={12}>
                <Search
                  placeholder="Cari produk..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Pilih Kategori"
                >
                  <Select.Option value="all">Semua Kategori</Select.Option>
                  {categories.map(category => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]} className="mb-8">
              <Col span={8}>
                <Card
                className='rounded-2xl'
                >
                  <Statistic
                    title="Total Produk"
                    value={filteredData.length}
                    prefix={<ShoppingCartOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                              <Card
                className='rounded-2xl'
                >
                  <Statistic
                    title="Kategori"
                    value={categories.length}
                    prefix={<DashboardOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                              <Card
                className='rounded-2xl'
                >
                  <Statistic
                    title="Stok Tersedia"
                    value={filteredData.reduce((sum, product) => 
                      sum + (product.stock?.reduce((a, b) => a + (b.amount || 0), 0) || 0), 0
                    )}
                  />
                </Card>
              </Col>
            </Row>

            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((product) => (
                  <Card
                    key={product.id}
                    hoverable
                    className="transform transition-all duration-300 hover:scale-105"
                    cover={
                      <div className='flex justify-center items-center p-4 bg-white'>
                        <Image
                          className="object-cover rounded-lg"
                          width={200}
                          height={200}
                          src={product.imageUrl}
                          fallback="data:image/png;base64,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"
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={<Text strong>{product.name}</Text>}
                      description={
                        <div className="space-y-2">
                          <p><Text type="secondary">Kategori:</Text> <Text strong>{product.category?.name || '-'}</Text></p>
                          <p><Text type="secondary">Stok:</Text> <Text strong className={(product?.stock?.reduce((a, b) => a + (b?.amount || 0), 0) || 0) > 0 ? 'text-green-500' : 'text-red-500'}>
                            {product?.stock?.reduce((a, b) => a + (b?.amount || 0), 0) || 0}
                          </Text></p>
                          <p><Text type="secondary">Harga:</Text> <Text strong className="text-blue-500">{formatPrice(Number(product.price))}</Text></p>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            ) : (
              <Empty
                description="Tidak ada produk yang ditemukan"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </Spin>
      </Content>
    </Layout>
  )
}
