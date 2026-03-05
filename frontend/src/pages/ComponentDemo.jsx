import React, { useState } from 'react'
import { Card, Button, Input, Textarea, Table, List } from '@/components/ui'
import { 
  users, 
  departments, 
  stats, 
  positions, 
  roles, 
  notifications,
  formDefaults 
} from '@/data/mockData'
import { 
  UserOutlined, 
  TeamOutlined, 
  AppstoreOutlined, 
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { message, Tag, Space, Spin, Alert, Badge } from 'antd'

/**
 * 组件搭建 Demo 页面
 * 展示所有公共组件的使用方式和典型业务场景
 */
const ComponentDemo = () => {
  // 表单状态
  const [formData, setFormData] = useState(formDefaults)
  const [loading, setLoading] = useState(false)
  
  // 表格分页状态
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 5,
  })

  // 处理表单提交
  const handleSubmit = () => {
    setLoading(true)
    // 模拟提交
    setTimeout(() => {
      setLoading(false)
      message.success('提交成功！')
      setFormData(formDefaults)
    }, 1000)
  }

  // 处理表单变化
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 用户表格列配置
  const userColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: '管理员', value: '管理员' },
        { text: '用户', value: '用户' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag icon={status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '在职' : '离职'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="text" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ]

  // 部门表格列配置
  const departmentColumns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '人数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: '负责人',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ]

  // 渲染状态标签
  const renderStatusTag = (status) => {
    const config = {
      active: { color: 'success', text: '在职' },
      inactive: { color: 'default', text: '离职' },
    }
    const { color, text } = config[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1d1d1d', marginBottom: '8px' }}>
          组件搭建 Demo
        </h1>
        <p style={{ color: '#666' }}>展示公共组件库的使用方式和典型业务场景</p>
      </div>

      {/* 1. 卡片场景 - 统计卡片 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          📊 统计卡片场景
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Card 
            title={<span><UserOutlined /> 用户统计</span>}
            extra={<Badge count={stats.newUsersThisMonth} style={{ backgroundColor: '#52c41a' }} />}
          >
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1890ff' }}>{stats.totalUsers}</div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>总用户数</div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
              <span style={{ color: '#52c41a' }}>+{stats.newUsersThisMonth}</span>
              <span style={{ color: '#999', marginLeft: '8px' }}>本月新增</span>
            </div>
          </Card>

          <Card title={<span><TeamOutlined /> 部门统计</span>}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#722ed1' }}>{stats.totalDepartments}</div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>部门总数</div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
              <span style={{ color: '#1890ff' }}>{stats.activeUsers}</span>
              <span style={{ color: '#999', marginLeft: '8px' }}>在职员工</span>
            </div>
          </Card>

          <Card title={<span><AppstoreOutlined /> 职位统计</span>}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fa8c16' }}>{stats.totalPositions}</div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>职位总数</div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
              <span style={{ color: '#722ed1' }}>{stats.totalRoles}</span>
              <span style={{ color: '#999', marginLeft: '8px' }}>角色数量</span>
            </div>
          </Card>

          <Card title={<span><SafetyCertificateOutlined /> 系统状态</span>}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#52c41a' }}>{stats.systemUptime}</div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>系统可用率</div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
              <Tag color="success">运行正常</Tag>
            </div>
          </Card>
        </div>
      </div>

      {/* 2. 表格场景 - 用户管理表格 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          📋 表格场景 - 用户管理
        </h2>
        <Table
          columns={userColumns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
            total: users.length,
            onChange: (page, pageSize) => setTablePagination({ current: page, pageSize }),
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 800 }}
        />
      </div>

      {/* 3. 列表场景 - 部门列表 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          📝 列表场景 - 部门展示
        </h2>
        <List
          dataSource={departments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="text" size="small" key="view">查看</Button>,
                <Button type="text" size="small" key="edit">编辑</Button>,
              ]}
            >
              <List.Item.Meta
                title={<span style={{ fontWeight: '600' }}>{item.name}</span>}
                description={
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ color: '#666', fontSize: '14px' }}>{item.description}</div>
                    <div style={{ marginTop: '4px' }}>
                      <Tag color="blue">{item.count}人</Tag>
                      <span style={{ marginLeft: '12px', color: '#999', fontSize: '13px' }}>负责人：{item.manager}</span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* 4. 表单场景 - 新建用户 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          ✏️ 表单场景 - 新建用户
        </h2>
        <Card title="用户信息录入">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>用户名 <span style={{ color: '#ff4d4f' }}>*</span></div>
              <Input
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) => handleFormChange('username', e.target.value)}
                prefix={<UserOutlined />}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>邮箱 <span style={{ color: '#ff4d4f' }}>*</span></div>
              <Input
                placeholder="请输入邮箱地址"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>所属部门</div>
              <Input
                placeholder="请选择或输入部门"
                value={formData.department}
                onChange={(e) => handleFormChange('department', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>角色</div>
              <Input
                placeholder="请选择角色"
                value={formData.role}
                onChange={(e) => handleFormChange('role', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>备注说明</div>
              <Textarea
                placeholder="请输入备注信息（选填）"
                value={formData.description}
                onChange={(value) => handleFormChange('description', value)}
                rows={3}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleSubmit}
              loading={loading}
            >
              提交
            </Button>
            <Button 
              onClick={() => setFormData(formDefaults)}
            >
              重置
            </Button>
          </div>
        </Card>
      </div>

      {/* 5. 反馈场景 - 通知和消息 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          🔔 反馈场景 - 通知消息
        </h2>
        
        {/* 消息提示按钮 */}
        <Card title="消息提示演示" style={{ marginBottom: '16px' }}>
          <Space wrap>
            <Button 
              onClick={() => message.success('操作成功！')}
            >
              成功提示
            </Button>
            <Button 
              onClick={() => message.info('这是一条提示信息')}
            >
              信息提示
            </Button>
            <Button 
              onClick={() => message.warning('请注意，此操作不可逆')}
            >
              警告提示
            </Button>
            <Button 
              onClick={() => message.error('操作失败，请重试')}
            >
              错误提示
            </Button>
            <Button 
              loading={loading}
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 2000)
              }}
            >
              加载状态
            </Button>
          </Space>
        </Card>

        {/* 通知列表 */}
        <Card title="系统通知">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notif) => (
              <Alert
                key={notif.id}
                type={notif.type}
                message={notif.message}
                showIcon
                style={{ marginBottom: 0 }}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* 6. 额外场景 - 职位和角色表格 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          🏢 职位管理场景
        </h2>
        <Table
          columns={[
            { title: '职位名称', dataIndex: 'name', key: 'name' },
            { title: '职级', dataIndex: 'level', key: 'level', render: (level) => <Tag color="purple">{level}</Tag> },
            { title: '所属部门', dataIndex: 'department', key: 'department' },
            { title: '编制人数', dataIndex: 'headcount', key: 'headcount', sorter: (a, b) => a.headcount - b.headcount },
          ]}
          dataSource={positions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1d', marginBottom: '16px' }}>
          🛡️ 角色权限场景
        </h2>
        <Table
          columns={[
            { title: '角色名称', dataIndex: 'name', key: 'name' },
            { title: '角色代码', dataIndex: 'code', key: 'code', render: (code) => <Tag color="blue">{code}</Tag> },
            { title: '描述', dataIndex: 'description', key: 'description' },
            { title: '用户数', dataIndex: 'userCount', key: 'userCount', sorter: (a, b) => a.userCount - b.userCount },
          ]}
          dataSource={roles}
          rowKey="id"
          pagination={false}
        />
      </div>

      {/* 页面底部 */}
      <div style={{ textAlign: 'center', color: '#999', padding: '24px', borderTop: '1px solid #e8e8e8' }}>
        <p>组件搭建 Demo 页面 - 基于公共组件库 @{new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default ComponentDemo
