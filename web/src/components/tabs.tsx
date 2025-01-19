import { Tabs } from 'antd';

type item = {
  label: string
  key: string
  children: React.ReactNode
}

export interface TabsModType {
  defaultActiveKey?: string
  active?: string
  size?: 'small' | 'middle' | 'large'
  items: item[]
  onChange?: (key: string) => void
}
export default function TabsMod({ defaultActiveKey, active, items, size,onChange }: TabsModType) {
  return (
    <Tabs
      className='rounded-t-2xl'
      defaultActiveKey={defaultActiveKey}
      activeKey={active}
      type="card"
      size={size}
      style={{ marginBottom: 32 }}
      items={items}
      onChange={onChange}
    >
      {items.map((item) => (
        <Tabs.TabPane key={item.key} tab={item.label}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}
