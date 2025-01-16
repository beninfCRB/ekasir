import { ContainerOutlined, DollarOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined, StockOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, message, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { base_url } from "../constants/env";
import { ProtectedRoute } from "../pages/protected-route";
import axiosInstance, { setupAxiosInterceptors } from "../utils/axios";
import TooltipButton from "./button/toolltip";

const { Header, Content, Sider } = Layout;

export default function MainLayout() {
  const navigate = useNavigate()
  const locale = JSON.parse(String(localStorage.getItem('user')))
  setupAxiosInterceptors(navigate)

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  const onSignOut = async () => {
    try {
      await axiosInstance.post(`${base_url}/api/v1/signout`)
      localStorage.removeItem('user')
      message.success('Berhasil Sign Out')
      navigate('/signin', { replace: true })
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <ProtectedRoute>
      <Layout className='flex flex-col'>
        <Sider className="rounded-xl p-0" trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['product']}
            onClick={onClick}
            items={[
              {
                key: 'category',
                icon: <ContainerOutlined />,
                label: 'Kategori'
              },
              {
                key: 'product',
                icon: <ProductOutlined />,
                label: 'Produk'
              },
              {
                key: 'stock',
                icon: <StockOutlined />,
                label: 'Stok'
              },
              {
                key: 'tax',
                icon: <DollarOutlined />,
                label: 'Pajak'
              },
            ]}
          />
        </Sider>
        <Layout className='flex flex-col'>
          <Header style={{ paddingLeft: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="flex border items-stretch gap-2">
              <div className="font-bold italic text-slate-400 text-lg">
                {locale && locale.username}
              </div>
              <TooltipButton
                title="Sign Out"
                text="Sign Out"
                textSize="xs"
                icon={<LogoutOutlined />}
                type="default"
                shape="circle"
                size="small"
                onCLick={onSignOut}
              />
            </div>
          </Header>
          <Content
            className="shadow-2xl"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  )
}
