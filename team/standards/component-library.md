# 🎨 UI 组件库文档

**创建时间**: 2026-03-03  
**维护人**: 麒麟 🐅  
**基于**: 青鸾 🐦‍🔥 的 Demo 设计规范

---

## 📦 组件库位置

```
frontend/src/components/ui/
├── Button.jsx          # 按钮组件
├── Button.css
├── Card.jsx            # 卡片组件
├── Card.css
├── Input.jsx           # 输入框组件
├── Input.css
├── Textarea.jsx        # 多行文本框组件
├── Textarea.css
├── Table.jsx           # 表格组件
├── Table.css
├── List.jsx            # 列表组件
├── List.css
└── index.js            # 统一导出
```

---

## 🚀 使用方式

### 引入组件

```jsx
import { Button, Card, Input, Textarea, Table, List } from '@/components/ui'
```

### 示例代码

```jsx
function MyPage() {
  return (
    <Card title="示例卡片">
      <Input placeholder="请输入..." />
      <Textarea placeholder="请输入多行文本..." />
      <Button type="primary">提交</Button>
    </Card>
  )
}
```

---

## 📋 组件 API

### 1. Button 按钮

**基础用法**:
```jsx
<Button type="primary">主按钮</Button>
<Button type="secondary">次按钮</Button>
<Button type="text">文字按钮</Button>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | 'primary' | 按钮类型：primary \| secondary \| text |
| disabled | boolean | false | 禁用状态 |
| onClick | function | - | 点击事件 |
| className | string | '' | 自定义类名 |
| children | ReactNode | - | 按钮内容 |

**样式特点**:
- 主按钮：蓝紫渐变背景，悬停上浮 + 阴影
- 次按钮：白色背景 + 主色边框，悬停填充主色
- 文字按钮：透明背景，悬停显示浅色背景

---

### 2. Card 卡片

**基础用法**:
```jsx
<Card title="卡片标题" variant="glass">
  卡片内容
</Card>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 卡片标题 |
| extra | ReactNode | - | 右上角额外内容 |
| hoverable | boolean | true | 是否支持悬停效果 |
| variant | string | 'glass' | 卡片变体：glass \| gradient |
| className | string | '' | 自定义类名 |

**样式特点**:
- 玻璃态：半透明背景 + 背景模糊，悬停上浮
- 渐变态：蓝紫渐变背景，强视觉冲击

---

### 3. Input 输入框

**基础用法**:
```jsx
<Input 
  placeholder="请输入..." 
  label="用户名"
  helperText="辅助说明文本"
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | 'text' | 输入框类型：text \| password \| email \| number |
| placeholder | string | - | 占位符 |
| value | string | - | 值 |
| disabled | boolean | false | 禁用状态 |
| onChange | function | - | 变化事件 |
| label | string | - | 标签文本 |
| helperText | string | - | 辅助文本 |
| className | string | '' | 自定义类名 |

**样式特点**:
- 默认边框：#E5E6EB
- 悬停状态：主色边框 + 光晕
- 聚焦状态：主色边框 + 加强光晕
- 禁用状态：灰色背景

---

### 4. Textarea 多行文本框

**基础用法**:
```jsx
<Textarea 
  placeholder="请输入多行文本..."
  rows={4}
  label="描述"
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| placeholder | string | - | 占位符 |
| value | string | - | 值 |
| rows | number | 4 | 行数 |
| disabled | boolean | false | 禁用状态 |
| resizable | boolean | true | 是否可调整大小 |
| onChange | function | - | 变化事件 |
| label | string | - | 标签文本 |
| helperText | string | - | 辅助文本 |
| className | string | '' | 自定义类名 |

**样式特点**:
- 支持垂直拉伸（默认）
- 悬停/聚焦状态与 Input 一致
- 禁用状态：灰色背景

---

### 5. Table 表格

**基础用法**:
```jsx
<Table 
  columns={columns}
  dataSource={data}
  striped
  hoverable
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | array | [] | 列配置 `[{title, dataIndex, key, width, render}]` |
| dataSource | array | [] | 数据源 |
| striped | boolean | false | 是否斑马纹 |
| hoverable | boolean | true | 是否支持悬停 |
| className | string | '' | 自定义类名 |

**样式特点**:
- 表头：渐变背景
- 行悬停：浅色高亮
- 斑马纹：偶数行浅灰背景
- 状态徽章：成功/警告/错误/信息

**示例**:
```jsx
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { 
    title: '状态', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => (
      <span className={`status-badge status-${status}`}>
        {status === 'success' ? '正常' : '异常'}
      </span>
    )
  }
]
```

---

### 6. List 列表

**基础用法**:
```jsx
<List 
  dataSource={items}
  variant="basic"
  hoverable
  onItemClick={handleClick}
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | array | [] | 数据源 `[{icon, title, desc, time, meta}]` |
| hoverable | boolean | true | 是否支持悬停 |
| selectable | boolean | false | 是否可选 |
| variant | string | 'basic' | 列表变体：basic \| card \| timeline |
| onItemClick | function | - | 点击事件 |
| className | string | '' | 自定义类名 |

**变体说明**:

**Basic List** - 基础列表:
```jsx
const items = [
  { 
    icon: '📄', 
    iconType: 'blue',
    title: '产品需求文档', 
    desc: '包含完整的功能模块说明',
    time: '2 小时前'
  }
]
```

**Card List** - 卡片列表:
```jsx
const items = [
  { 
    icon: '🎨', 
    iconType: 'gradient',
    title: '设计系统 2.0',
    subtitle: 'UI 组件库升级',
    content: '全新的视觉规范...',
    tags: [{ text: '进行中', color: 'blue' }],
    stats: [{ icon: '👥', text: '3 人' }]
  }
]
```

**Timeline** - 时间线列表:
```jsx
const items = [
  { 
    title: '🚀 项目启动',
    desc: '完成项目立项...',
    time: '2024-01-15',
    user: '老板',
    status: 'success' // success | active | warning | error
  }
]
```

---

## 🎨 设计规范

### 色彩系统

| 颜色 | 值 | 用途 |
|------|-----|------|
| 主色 | #3370FF | 按钮、边框、高亮 |
| 科技紫 | #722ED1 | 渐变搭配 |
| 蓝紫渐变 | linear-gradient(135deg, #3370FF 0%, #722ED1 100%) | 主按钮、卡片 |
| 成功绿 | #00B365 | 成功状态 |
| 警告黄 | #FFB300 | 警告状态 |
| 错误红 | #FF4D4F | 错误状态 |
| 清新青 | #33C3B0 | 辅助色 |
| 活力橙 | #FF7A45 | 辅助色 |

### 圆角规范

- 按钮：8px
- 卡片：12px
- 输入框：8px
- 列表项：12px

### 动效规范

- 悬停上浮：`transform: translateY(-2px)` 或 `translateY(-4px)`
- 阴影加深：`box-shadow: 0 8px 24px rgba(51, 112, 255, 0.4)`
- 过渡时间：0.3s ease

---

## ✅ 组件库优势

1. **统一规范** - 所有组件样式来自青鸾 Demo，确保视觉一致性
2. **易于维护** - 组件和样式分离，修改一处全局生效
3. **类型安全** - 完整的 Props 定义和文档
4. **响应式** - 所有组件支持响应式布局
5. **可访问性** - 支持禁用状态、辅助文本等

---

## 🚫 禁止行为

根据老板强调的核心原则：

1. ❌ **禁止**在页面中内联样式
2. ❌ **禁止**每个页面写一套组件
3. ❌ **禁止**自己创造样式
4. ❌ **禁止**不引用公共组件库

**正确做法**:
```jsx
// ✅ 正确
import { Button, Card, Input } from '@/components/ui'
<Card><Input /><Button>提交</Button></Card>

// ❌ 错误
<div className="card"><input className="input" /><button>提交</button></div>
```

---

## 📚 相关文件

- `component-development.md` - 组件开发规范
- `visual-demo.html` - 基础组件 Demo（青鸾）
- `visual-demo-form.html` - 表单组件 Demo（青鸾）
- `visual-demo-list.html` - 列表组件 Demo（青鸾）
- `visual-demo-data.html` - 数据展示 Demo（青鸾）
- `design-2.0.md` - 视觉设计规范 2.0

---

_本组件库由麒麟基于青鸾的 Demo 设计规范实现，所有样式 100% 还原 Demo。_
