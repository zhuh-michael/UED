/**
 * Mock 测试数据
 * 用于组件搭建 Demo 页面的真实数据展示
 */

// 用户列表数据
export const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: 'active', department: '研发部', joinDate: '2023-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', status: 'active', department: '产品部', joinDate: '2023-03-20' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: 'inactive', department: '研发部', joinDate: '2023-05-10' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '管理员', status: 'active', department: '运维部', joinDate: '2023-02-28' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: '用户', status: 'active', department: '测试部', joinDate: '2023-06-15' },
  { id: 6, name: '孙八', email: 'sunba@example.com', role: '用户', status: 'inactive', department: '产品部', joinDate: '2023-04-01' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com', role: '管理员', status: 'active', department: '研发部', joinDate: '2023-07-20' },
  { id: 8, name: '吴十', email: 'wushi@example.com', role: '用户', status: 'active', department: '测试部', joinDate: '2023-08-05' },
]

// 部门数据
export const departments = [
  { id: 1, name: '研发部', count: 50, description: '负责产品研发和技术创新', manager: '张三' },
  { id: 2, name: '产品部', count: 20, description: '负责产品规划和设计', manager: '李四' },
  { id: 3, name: '测试部', count: 15, description: '负责质量保障和测试', manager: '钱七' },
  { id: 4, name: '运维部', count: 12, description: '负责系统运维和安全', manager: '赵六' },
  { id: 5, name: '市场部', count: 25, description: '负责市场推广和销售', manager: '郑十一' },
  { id: 6, name: '人力资源部', count: 8, description: '负责人才招聘和管理', manager: '王十二' },
]

// 统计数据
export const stats = {
  totalUsers: 156,
  totalDepartments: 12,
  totalPositions: 48,
  activeUsers: 142,
  inactiveUsers: 14,
  totalRoles: 25,
  newUsersThisMonth: 18,
  systemUptime: '99.9%',
}

// 职位数据
export const positions = [
  { id: 1, name: '前端工程师', level: 'P5', department: '研发部', headcount: 10 },
  { id: 2, name: '后端工程师', level: 'P5', department: '研发部', headcount: 15 },
  { id: 3, name: '产品经理', level: 'P6', department: '产品部', headcount: 5 },
  { id: 4, name: '测试工程师', level: 'P5', department: '测试部', headcount: 8 },
  { id: 5, name: '运维工程师', level: 'P5', department: '运维部', headcount: 6 },
  { id: 6, name: 'UI 设计师', level: 'P5', department: '产品部', headcount: 4 },
]

// 角色数据
export const roles = [
  { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', description: '拥有系统所有权限', userCount: 2 },
  { id: 2, name: '管理员', code: 'ADMIN', description: '拥有模块管理权限', userCount: 15 },
  { id: 3, name: '普通用户', code: 'USER', description: '拥有基础使用权限', userCount: 125 },
  { id: 4, name: '访客', code: 'GUEST', description: '拥有只读权限', userCount: 14 },
]

// 通知消息数据
export const notifications = [
  { id: 1, type: 'success', message: '系统更新完成，新版本已上线', time: '10 分钟前' },
  { id: 2, type: 'info', message: ' scheduled maintenance 将于今晚 22:00 进行', time: '1 小时前' },
  { id: 3, type: 'warning', message: '服务器 CPU 使用率超过 80%', time: '2 小时前' },
  { id: 4, type: 'error', message: '数据库连接异常，已自动恢复', time: '3 小时前' },
]

// 表单默认值
export const formDefaults = {
  username: '',
  email: '',
  department: '',
  role: '',
  description: '',
}
