import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3d84f0',
          borderRadius: 2,
          colorBgContainer: 'white',
        },
        components: {
          Table: {
            headerBg: '#3d84f0',
            rowHoverBg: '#f3f3f3',
            headerColor: 'white',
            headerSortActiveBg: '#3d84f0',
            headerSortHoverBg: '#3d84f0',
            bodySortBg: 'white',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
