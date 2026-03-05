import React from 'react'
import { Layout, Card, Button, Input, Table, List } from '@/components/ui'
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  UserOutlined, 
  SettingOutlined,
  MenuOutlined
} from '@ant-design/icons'

/**
 * Demo 布局页面
 * 展示组件库布局组件的使用方式
 */
const DemoLayout = () => {
  // 顶部导航内容
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <MenuOutlined style={{ fontSize: '20px', color: '#3370FF' }} />
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#1D2129', margin: 0 }}>
          组件库 Demo
        </h1>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button type="secondary">文档</Button>
        <Button type="primary">GitHub</Button>
      </div>
    </div>
  )

  // 侧边栏内容
  const sidebar = (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#86909C', marginBottom: '12px' }}>
          基础组件
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={menuItemStyle}>🔘 Button</div>
          <div style={menuItemStyle}>📦 Card</div>
          <div style={menuItemStyle}>✏️ Input</div>
          <div style={menuItemStyle}>📝 Textarea</div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#86909C', marginBottom: '12px' }}>
          数据展示
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={menuItemStyle}>📊 Table</div>
          <div style={menuItemStyle}>📋 List</div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#86909C', marginBottom: '12px' }}>
          布局组件
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...menuItemStyle, background: 'rgba(51, 112, 255, 0.1)', color: '#3370FF' }}>
            📐 Layout
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Layout
      header={header}
      sidebar={sidebar}
      fixedHeader={true}
      fixedSidebar={true}
      sidebarWidth="240px"
    >
      {/* 页面内容 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D2129', marginBottom: '32px' }}>
          📐 Layout 布局组件演示
        </h2>

        {/* 统计卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <Card title="📦 组件总数" variant="glass">
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#3370FF', marginBottom: '8px' }}>
              7
            </div>
            <div style={{ color: '#86909C', fontSize: '14px' }}>
              已实现 7 个基础组件
            </div>
          </Card>

          <Card title="🎨 视觉规范" variant="glass">
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#722ED1', marginBottom: '8px' }}>
              2.0
            </div>
            <div style={{ color: '#86909C', fontSize: '14px' }}>
              蓝紫渐变设计体系
            </div>
          </Card>

          <Card title="📄 页面改造" variant="glass">
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#33C3B0', marginBottom: '8px' }}>
              100%
            </div>
            <div style={{ color: '#86909C', fontSize: '14px' }}>
              全部使用组件引用
            </div>
          </Card>

          <Card title="⚡ 构建速度" variant="glass">
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#FF7A45', marginBottom: '8px' }}>
              10s
            </div>
            <div style={{ color: '#86909C', fontSize: '14px' }}>
              Vite 快速构建
            </div>
          </Card>
        </div>

        {/* 组件示例 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* 按钮示例 */}
          <Card title="🔘 Button 按钮" variant="glass">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button type="primary">主按钮</Button>
              <Button type="secondary">次按钮</Button>
              <Button type="text">文字按钮</Button>
            </div>
          </Card>

          {/* 输入框示例 */}
          <Card title="✏️ Input 输入框" variant="glass">
            <Input placeholder="请输入内容..." style={{ width: '100%' }} />
          </Card>

          {/* 表格示例 */}
          <Card title="📊 Table 表格" variant="glass" style={{ gridColumn: '1 / -1' }}>
            <Table
              columns={[
                { title: '组件', dataIndex: 'name' },
                { title: '状态', dataIndex: 'status' },
                { title: '进度', dataIndex: 'progress' }
              ]}
              dataSource={[
                { name: 'Button', status: '✅ 完成', progress: '100%' },
                { name: 'Card', status: '✅ 完成', progress: '100%' },
                { name: 'Input', status: '✅ 完成', progress: '100%' },
                { name: 'Layout', status: '🆕 新增', progress: '100%' }
              ]}
              rowKey="name"
              pagination={false}
            />
          </Card>
        </div>

        {/* 使用说明 */}
        <Card title="📖 使用方式" variant="glass">
          <pre style={{ 
            background: 'rgba(0, 0, 0, 0.04)', 
            padding: '16px', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px',
            color: '#1D2129'
          }}>
{`// 1. 导入组件
import { Layout, Card, Button } from '@/components/ui'

// 2. 使用布局
<Layout
  header={<header>顶部内容</header>}
  sidebar={<aside>侧边栏</aside>}
>
  <main>内容区</main>
</Layout>

// 3. 使用卡片
<Card title="卡片标题" variant="glass">
  卡片内容
</Card>`}
          </pre>
        </Card>
      </div>
    </Layout>
  )
}

const menuItemStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#595959',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

export default DemoLayout
