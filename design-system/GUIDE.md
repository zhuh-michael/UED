# UED 组件库开发指南

**版本**: v1.0  
**最后更新**: 2026-03-05  
**适用对象**: 前端开发者、UI 设计师

---

## 📐 一、设计令牌（Design Tokens）

### 1.1 色彩系统

```css
:root {
  /* 主色 */
  --primary: #3370FF;
  --primary-gradient: linear-gradient(135deg, #3370FF 0%, #722ED1 100%);
  
  /* 辅色 */
  --purple: #722ED1;
  --cyan: #33C3B0;
  --orange: #FF7A45;
  
  /* 状态色 */
  --success: #00B365;
  --warning: #FFB300;
  --error: #FF4D4F;
  --info: #3370FF;
  
  /* 中性色 */
  --text-primary: rgba(0, 0, 0, 0.85);
  --text-secondary: rgba(0, 0, 0, 0.45);
  --text-disabled: rgba(0, 0, 0, 0.25);
  --border: #E5E6EB;
  --bg-disabled: #F5F5F5;
}
```

### 1.2 圆角规范

| 变量 | 值 | 使用场景 |
|------|-----|----------|
| `--radius-sm` | 6px | 标签、徽章 |
| `--radius-md` | 8px | 按钮、输入框、下拉菜单 |
| `--radius-lg` | 12px | 卡片、弹窗、容器 |
| `--radius-full` | 50% | 头像、圆形按钮 |

### 1.3 阴影规范

```css
--shadow-sm: 0 2px 8px rgba(51, 112, 255, 0.1);      /* 小组件 */
--shadow-md: 0 4px 16px rgba(51, 112, 255, 0.15);    /* 卡片 */
--shadow-lg: 0 8px 32px rgba(51, 112, 255, 0.2);     /* 弹窗、下拉 */
--shadow-focus: 0 0 0 3px rgba(51, 112, 255, 0.12);  /* 聚焦光晕 */
```

### 1.4 间距规范

```
4px   - 最小间距（图标与文字）
8px   - 小组件间距
12px  - 中等间距
16px  - 标准间距（卡片内边距）
24px  - 大间距（页面边距）
32px  - 超大间距（section 间距）
```

### 1.5 动效规范

```css
/* 过渡时间 */
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;

/* 悬停效果 */
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(51, 112, 255, 0.15);

/* 骨架屏加载 */
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 🧩 二、组件详细规格

### 2.1 Button 按钮

**使用场景**: 操作触发、表单提交、功能入口

**尺寸规范**:
```css
/* 大按钮 */
.btn-large {
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
}

/* 中按钮（默认） */
.btn-medium {
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
}

/* 小按钮 */
.btn-small {
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
}
```

**状态说明**:
| 状态 | 背景色 | 文字色 | 边框 | 说明 |
|------|--------|--------|------|------|
| 默认 | `--primary-gradient` | white | none | 主色渐变 |
| Hover | `--primary-gradient` + translateY(-2px) | white | none | 上浮 2px |
| Active | 加深 10% | white | none | 按下状态 |
| Disabled | `--bg-disabled` | `--text-disabled` | none | 不可用 |
| Loading | `--primary-gradient` + spinner | white | none | 加载中 |

**代码实现**:
```jsx
import { Button } from '@/components/ui'

// 主按钮
<Button type="primary">提交</Button>

// 次按钮
<Button type="secondary">取消</Button>

// 加载状态
<Button loading>加载中...</Button>

// 禁用状态
<Button disabled>不可用</Button>
```

---

### 2.2 Input 输入框

**使用场景**: 文本输入、表单填写、搜索框

**尺寸规范**:
```css
.input {
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}
```

**状态说明**:
| 状态 | 边框色 | 背景 | 说明 |
|------|--------|------|------|
| 默认 | `--border` | white | 正常状态 |
| Focus | `--primary` | white | 聚焦光晕 3px |
| Hover | `--primary` (50%) | white | 悬停预览 |
| Disabled | `--border` | `--bg-disabled` | 不可用 |
| Error | `--error` | white | 错误状态 |

**交互说明**:
- Focus 时显示光晕：`box-shadow: 0 0 0 3px rgba(51, 112, 255, 0.12)`
- 错误时显示错误消息，红色文字 12px
- 支持前缀图标和后缀图标

---

### 2.3 Card 卡片

**使用场景**: 内容容器、数据展示、列表项

**尺寸规范**:
```css
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**结构说明**:
```
┌─────────────────────────┐
│  Card Header (可选)      │  高度 48px，边框底部分隔
├─────────────────────────┤
│  Card Body              │  内边距 24px
│  - 标题 16px/600        │
│  - 内容 14px/400        │
│  - 操作区（可选）        │
└─────────────────────────┘
```

---

### 2.4 Table 表格

**使用场景**: 数据列表、信息展示、批量操作

**尺寸规范**:
```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  height: 50px;
  background: var(--bg-disabled);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: left;
  padding: 0 16px;
  border-bottom: 2px solid var(--border);
}

.table td {
  height: 50px;
  font-size: 14px;
  color: var(--text-primary);
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
}

.table tbody tr:hover td {
  background: rgba(51, 112, 255, 0.05);
}
```

**交互说明**:
- 表头支持排序：点击切换 升序↓ / 降序↑ / 取消
- 行支持单选/多选（Checkbox）
- 行点击弹出详情或跳转
- 支持固定表头（sticky）
- 支持虚拟滚动（>100 行时启用）

---

### 2.5 Modal 弹窗

**使用场景**: 确认对话框、表单弹窗、详情展示

**尺寸规范**:
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: var(--radius-lg);
  min-width: 400px;
  max-width: 800px;
  box-shadow: var(--shadow-lg);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**结构说明**:
```
┌─────────────────────────┐
│  Modal Header           │  高度 56px，标题 16px/600，关闭按钮
├─────────────────────────┤
│  Modal Body             │  内边距 24px，内容区域
├─────────────────────────┤
│  Modal Footer           │  高度 56px，右对齐按钮组
└─────────────────────────┘
```

---

### 2.6 Layout 布局

**使用场景**: 后台管理系统主框架

**尺寸规范**:
```css
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-header {
  height: 60px;
  background: var(--primary-gradient);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.layout-sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid var(--border);
  overflow-y: auto;
}

.layout-content {
  flex: 1;
  background: #fafafa;
  padding: 24px;
  overflow-y: auto;
}

.layout-footer {
  height: 40px;
  background: white;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--text-secondary);
}
```

---

### 2.7 Grid 栅格系统

**使用场景**: 响应式布局、卡片排列

**规格说明**:
```
总列数：24 列
Gutter：8px
断点：
  - xs: < 576px   (1 列)
  - sm: ≥ 576px   (2 列)
  - md: ≥ 768px   (3 列)
  - lg: ≥ 992px   (4 列)
  - xl: ≥ 1200px  (6 列)
```

**代码实现**:
```jsx
<Row gutter={8}>
  <Col span={6}>25% 宽度</Col>
  <Col span={6}>25% 宽度</Col>
  <Col span={6}>25% 宽度</Col>
  <Col span={6}>25% 宽度</Col>
</Row>

<Row gutter={8}>
  <Col span={8}>33% 宽度</Col>
  <Col span={8}>33% 宽度</Col>
  <Col span={8}>33% 宽度</Col>
</Row>
```

---

### 2.8 Skeleton 骨架屏

**使用场景**: 页面初始加载、数据刷新

**尺寸规范**:
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-title {
  height: 20px;
  width: 60%;
  margin-bottom: 12px;
}

.skeleton-text {
  height: 14px;
  margin-bottom: 8px;
}

.skeleton-image {
  height: 200px;
  margin-bottom: 16px;
}
```

**加载完成状态**:
- 骨架屏消失，显示真实内容
- 淡入效果：`opacity: 0 → 1`，过渡 0.3s

---

### 2.9 DatePicker 日期选择

**使用场景**: 日期选择、日期范围筛选

**尺寸规范**:
```css
.date-picker-input {
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.date-picker-panel {
  width: 280px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 16px;
}

.date-picker-day {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-picker-day:hover {
  background: rgba(51, 112, 255, 0.1);
}

.date-picker-day.selected {
  background: var(--primary-gradient);
  color: white;
  font-weight: 600;
}

.date-picker-day.today {
  border: 1px solid var(--primary);
}
```

**交互说明**:
1. 点击输入框展开面板
2. 点击日期选中
3. 点击外部关闭面板
4. 支持范围选择（开始日期 - 结束日期）
5. 支持快捷选项（今天、本周、本月）

---

### 2.10 Carousel 走马灯

**使用场景**: 首页轮播、活动展示

**尺寸规范**:
```css
.carousel {
  position: relative;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: white;
  font-size: 24px;
}

.carousel-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.carousel-dot.active {
  width: 24px;
  background: white;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel:hover .carousel-arrow {
  opacity: 1;
}
```

**动效说明**:
| 动效 | 参数 | 说明 |
|------|------|------|
| 滑动切换 | `transform 0.5s ease` | 横向滑动 |
| 淡入淡出 | `opacity 0.3s ease` | 透明度渐变 |
| 自动播放 | 5000ms | 5 秒间隔 |
| 悬停暂停 | - | 鼠标悬停时暂停 |
| 指示器 | `width 0.3s ease` | 8px → 24px |

---

## 🎯 三、开发规范

### 3.1 组件命名

```
组件文件：PascalCase (Button.jsx, DatePicker.jsx)
样式文件：kebab-case (button.css, date-picker.css)
CSS 类名：kebab-case (.btn-primary, .date-picker-input)
```

### 3.2 Props 规范

```jsx
// 必须Props 用必填标记
interface ButtonProps {
  type: 'primary' | 'secondary' | 'danger';  // 按钮类型
  size: 'small' | 'medium' | 'large';        // 尺寸
  loading?: boolean;                          // 加载状态
  disabled?: boolean;                         // 禁用状态
  onClick?: () => void;                       // 点击事件
  children: React.ReactNode;                  // 内容
}
```

### 3.3 可访问性 (A11y)

- 所有交互元素必须有 `tabIndex`
- 图标按钮必须有 `aria-label`
- 表单元素必须有 `label` 或 `aria-label`
- 错误状态必须有 `aria-invalid`
- 加载状态必须有 `aria-busy`

---

## 📝 四、验收标准

### 4.1 视觉验收

- [ ] 所有颜色符合设计令牌
- [ ] 所有圆角符合规范
- [ ] 所有间距符合 4px 倍数
- [ ] 所有阴影符合规范
- [ ] 所有动效流畅（60fps）

### 4.2 交互验收

- [ ] Hover 效果正常
- [ ] Focus 状态正常
- [ ] Active 状态正常
- [ ] Disabled 状态正常
- [ ] Loading 状态正常

### 4.3 性能验收

- [ ] 首屏加载 < 2s
- [ ] 组件渲染 < 16ms
- [ ] 列表虚拟滚动正常
- [ ] 内存无泄漏

---

_本文档持续更新，每次组件变更后同步更新文档。_
