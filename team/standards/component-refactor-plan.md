# 🔥 全项目组件化改造计划

**派发时间**: 2026-03-04 09:17  
**派发人**: 祖龙 🐉  
**执行人**: 麒麟 🐅  
**验收人**: 白泽 🦄  
**优先级**: P0

---

## 📋 改造目标

> 老板要求：**所有现有项目必须最大化使用组件引用方式重新开发，布局保持不变，把原来自定义标签换成组件的引用**

---

## 🎯 改造范围

### 需要改造的页面（7 个）

| 页面 | 文件 | 改造重点 |
|------|------|----------|
| Dashboard | Dashboard.jsx | 统计卡片改用 Card 组件 |
| DepartmentList | DepartmentList.jsx | 表格改用 Table 组件，标签改用 Tag 组件 |
| EmployeeList | EmployeeList.jsx | 表格改用 Table 组件，表单改用 Input 组件 |
| PositionList | PositionList.jsx | 表格改用 Table 组件 |
| RoleList | RoleList.jsx | 表格改用 Table 组件，操作按钮改用 Button 组件 |
| Login | Login.jsx | 表单改用 Input + Button 组件 |
| ComponentDemo | ComponentDemo.jsx | ✅ 已改造完成（参考模板） |

---

## ✅ 可用组件清单

### 公共组件库位置
`frontend/src/components/ui/`

| 组件 | 导入方式 | 替代内容 |
|------|----------|----------|
| Button | `import { Button } from '@/components/ui'` | `<button>`, `<Button>` (antd) |
| Card | `import { Card } from '@/components/ui'` | `<div className="card">`, `<Card>` (antd) |
| Input | `import { Input } from '@/components/ui'` | `<input>`, `<Input>` (antd) |
| Textarea | `import { Textarea } from '@/components/ui'` | `<textarea>` |
| Table | `import { Table } from '@/components/ui'` | `<table>`, `<Table>` (antd) |
| List | `import { List } from '@/components/ui'` | `<ul>`, `<ol>`, `<List>` (antd) |

---

## 🔧 改造规范

### ❌ 改造前（自定义标签/内联样式）

```jsx
// ❌ 错误方式
<div className="card" style={{ background: 'white', padding: '24px' }}>
  <h3>用户统计</h3>
  <input 
    className="input" 
    style={{ border: '1px solid #d9d9d9', padding: '8px' }}
    placeholder="请输入..."
  />
  <button 
    className="btn" 
    style={{ background: '#1890ff', color: 'white' }}
    onClick={handleSubmit}
  >
    提交
  </button>
</div>
```

### ✅ 改造后（组件引用）

```jsx
// ✅ 正确方式
import { Card, Input, Button } from '@/components/ui'

<Card title="用户统计">
  <Input placeholder="请输入..." />
  <Button type="primary" onClick={handleSubmit}>提交</Button>
</Card>
```

---

## 📝 改造步骤

### Step 1: 导入组件
```jsx
import { Button, Card, Input, Textarea, Table, List } from '@/components/ui'
```

### Step 2: 替换自定义标签
- `<div className="card">` → `<Card>`
- `<input className="input">` → `<Input>`
- `<button className="btn">` → `<Button>`
- `<table>` → `<Table>`
- `<textarea>` → `<Textarea>`
- `<ul>/<ol>` → `<List>`

### Step 3: 移除内联样式
- 删除 `style={{...}}` 中已由组件处理的样式
- 保留布局相关的样式（如 `display`, `grid`, `gap` 等）

### Step 4: 验证功能
- 确保所有交互功能正常
- 确保样式还原度 100%

---

## ⚠️ 注意事项

1. **布局保持不变** - 只替换组件，不改动页面结构和布局
2. **样式优先使用组件** - 组件已包含青鸾 Demo 的样式规范
3. **保留必要样式** - 布局相关的 `style` 可以保留（如 `display: grid`, `gap: 16px`）
4. **参考 ComponentDemo.jsx** - 已改造完成的页面可作为模板参考

---

## ✅ 验收标准

- [ ] 所有页面导入 `@/components/ui` 组件库
- [ ] 无自定义 `<div className="card/input/btn">` 标签
- [ ] 无内联样式（布局相关除外）
- [ ] 页面功能正常
- [ ] UI 样式与 Demo 一致
- [ ] 构建无错误 `npm run build`

---

## 📅 时间安排

- **改造开始**: 2026-03-04 09:17（立即执行）
- **改造完成**: 预计 2026-03-04 12:00
- **验收时间**: 2026-03-04 12:30
- **部署上线**: 2026-03-04 13:00

---

_此文档由祖龙创建，麒麟执行，白泽验收。_
