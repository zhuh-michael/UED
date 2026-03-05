# 前端组件化、后端框架化规范

**创建时间**: 2026-03-03  
**维护人**: 祖龙 🐉  
**重要性**: ⭐⭐⭐ 老板强调

---

## 🎯 核心原则

### 前端组件化

**组件和方法的最大化引用**，禁止每个页面单独写一套组件！

### 后端框架化

**统一框架、复用方法**，禁止重复造轮子！

---

## 📁 前端组件库结构

```
frontend/src/components/ui/          # 公共 UI 组件库
├── Button.jsx                      # 按钮组件（所有页面统一引用）
├── Card.jsx                        # 卡片组件
├── Input.jsx                       # 输入框组件
├── Textarea.jsx                    # 多行文本框组件
├── Table.jsx                       # 表格组件
├── List.jsx                        # 列表组件
├── Select.jsx                      # 下拉选择组件
├── Checkbox.jsx                    # 复选框组件
├── Radio.jsx                       # 单选框组件
├── Modal.jsx                       # 弹窗组件
├── Notification.jsx                # 通知组件
├── Loading.jsx                     # 加载组件
├── Skeleton.jsx                    # 骨架屏组件
├── Breadcrumb.jsx                  # 面包屑组件
├── Pagination.jsx                  # 分页器组件
└── index.js                        # 统一导出
```

---

## ✅ 正确使用方式

### 页面中引用组件

```jsx
// ✅ 正确：引用公共组件
import { Button, Card, Input, Table } from '@/components/ui'

function MyPage() {
  return (
    <Card>
      <Input placeholder="请输入..." />
      <Button type="primary">提交</Button>
      <Table data={data} />
    </Card>
  )
}

// ❌ 错误：页面内联样式
function MyPage() {
  return (
    <div className="card" style={{...}}>
      <input className="input" style={{...}} />
      <button className="btn" style={{...}}>提交</button>
    </div>
  )
}
```

---

## 🎨 组件样式来源

### 产品定义（青鸾 🐦‍🔥）

**职责**：
1. ✅ 创建 Demo 页面（`visual-demo-*.html`）
2. ✅ 全量定义所有组件样式
3. ✅ 包含所有状态（正常/悬停/聚焦/禁用）
4. ✅ 提供完整代码示例

**输出文件**：
- `visual-demo.html` - 基础组件
- `visual-demo-form.html` - 表单组件
- `visual-demo-list.html` - 列表组件
- `visual-demo-data.html` - 数据展示组件

### 研发实现（麒麟 🐅）

**职责**：
1. ✅ 按产品 Demo 实现公共组件
2. ✅ 提取样式到组件文件
3. ✅ 确保所有页面统一引用
4. ✅ **遇到规范中没有的组件 → 提醒产品先定义**

**禁止行为**：
- ❌ 自己创造样式
- ❌ 每个页面写一套样式
- ❌ 不引用公共组件

---

## 🔄 协作流程

```
1. 青鸾定义组件规范（Demo 页面）
   ↓
2. 麒麟按 Demo 实现公共组件
   ↓
3. 页面开发时引用公共组件
   ↓
4. 遇到新组件 → 青鸾补充定义 → 麒麟实现
```

---

## 📋 组件开发清单

### 已定义组件（青鸾 Demo 中）

| 组件 | Demo 文件 | 状态 | 实现状态 |
|------|----------|------|---------|
| 按钮 | visual-demo.html | ✅ 已定义 | ⏳ 待实现 |
| 卡片 | visual-demo.html | ✅ 已定义 | ⏳ 待实现 |
| 输入框 | visual-demo-form.html | ✅ 已定义 | ⏳ 待实现 |
| 多行文本框 | visual-demo-form.html | ✅ 已定义 | ⏳ 待实现 |
| 列表 | visual-demo-list.html | ✅ 已定义 | ⏳ 待实现 |
| 表格 | visual-demo-data.html | ✅ 已定义 | ⏳ 待实现 |
| 分页器 | visual-demo-data.html | ✅ 已定义 | ⏳ 待实现 |
| 通知 | visual-demo-feedback.html | ✅ 已定义 | ⏳ 待实现 |
| 加载 | visual-demo-feedback.html | ✅ 已定义 | ⏳ 待实现 |

---

## 🚀 实施步骤

### 第一步：创建组件库

```bash
# 创建组件目录
mkdir -p frontend/src/components/ui

# 创建组件文件
touch frontend/src/components/ui/Button.jsx
touch frontend/src/components/ui/Card.jsx
# ... 其他组件
```

### 第二步：实现组件

**示例：Button.jsx**
```jsx
import React from 'react'
import './Button.css'

export const Button = ({ 
  type = 'default', 
  children, 
  onClick,
  disabled = false,
  ...props 
}) => {
  const className = `btn btn-${type}`
  
  return (
    <button 
      className={className} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

**示例：Button.css**
```css
/* 直接复制青鸾 Demo 中的样式 */
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3370FF 0%, #722ED1 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(51, 112, 255, 0.4);
}

/* ... 其他状态 */
```

### 第三步：统一导出

**index.js**
```jsx
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
export { Textarea } from './Textarea'
export { Table } from './Table'
export { List } from './List'
// ... 所有组件
```

### 第四步：页面引用

```jsx
import { Button, Card, Input, Table } from '@/components/ui'

// 页面中直接使用
<Card>
  <Input placeholder="请输入..." />
  <Button type="primary">提交</Button>
</Card>
```

---

## ⚠️ 违规处理

**以下行为绝对禁止**：

| 行为 | 正确做法 | 违规处理 |
|------|---------|---------|
| 页面内联样式 | 使用公共组件 | ❌ 打回重写 |
| 自己创造样式 | 提醒产品先定义 | ❌ 打回重写 |
| 不引用组件库 | 统一引用 `@/components/ui` | ❌ 打回重写 |
| 重复代码 | 提取为公共方法 | ❌ 打回重构 |

---

## 📚 相关文件

- `visual-demo.html` - 青鸾的基础组件 Demo
- `visual-demo-form.html` - 表单组件 Demo
- `visual-demo-list.html` - 列表组件 Demo
- `visual-demo-data.html` - 数据展示 Demo
- `design-2.0.md` - 视觉设计规范 2.0

---

_本规范由祖龙维护，麒麟开发前必须重读。_
_违反本规范 = 严重技术失职。_
