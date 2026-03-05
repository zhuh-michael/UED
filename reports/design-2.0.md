# 现代化视觉设计规范 2.0

> **版本**: 2.0  
> **创建时间**: 2026-03-03  
> **核心理念**: 年轻化 · 科技感 · 色彩丰富 · 现代化  
> **参考**: 飞书、Ant Design 5.0、字节系产品  
> **Demo 页面**: http://47.100.5.220:8082/demo.html

---

## 🎨 色彩体系

### 主色

| 用途 | HEX/渐变 | 说明 |
|------|----------|------|
| 主色 | `#3370FF` | 飞书蓝，所有主按钮、关键交互 |
| 主色渐变 | `linear-gradient(135deg, #3370FF, #722ED1)` | 按钮背景、卡片装饰 |
| 主色悬停 | `#2860E1` | 按钮悬停态 |
| 主色点击 | `#1D4FB8` | 按钮点击态 |

### 辅色

| 色系 | 色值 | 用途 |
|------|------|------|
| 科技紫 | `#722ED1` → `#9254DE` | 渐变过渡、强调区域 |
| 清新青 | `#13C2C2` → `#36CFC9` | 成功状态、数据可视化 |
| 深邃蓝 | `#096DD9` → `#1890FF` | 次级主色、链接色 |
| 活力紫 | `#B37FEB` → `#D3ADF7` | 背景装饰、卡片点缀 |

### 强调色

| 用途 | 色值 | 场景 |
|------|------|------|
| 活力橙 | `#FA8C16` | 警告、重要提示、CTA 按钮 |
| 热情粉 | `#F759AB` | 活动运营、年轻态装饰 |
| 荧光青 | `#00D9C0` | 高亮标签、新功能标识 |
| 成功绿 | `#52C41A` | 成功状态、正向反馈 |
| 警示红 | `#FF4D4F` | 错误、删除、危险操作 |

### 背景色

| 层级 | 色值/渐变 | 说明 |
|------|-----------|------|
| 主背景 | `linear-gradient(180deg, #F5F7FF 0%, #EBF1FF 100%)` | **所有页面背景** |
| 次级背景 | `#F0F2F5` → `#E8ECF1` | 内容区分隔 |
| 卡片背景 | `rgba(255, 255, 255, 0.95)` + 玻璃态 | **所有卡片** |
| 深色背景 | `linear-gradient(135deg, #1D2129 0%, #2E3340 100%)` | 夜间模式 |

### 中性色

| 用途 | 色值 |
|------|------|
| 主文字 | `#1D2129` |
| 次级文字 | `#4E5969` |
| 辅助文字 | `#86909C` |
| 占位文字 | `#C9CDD4` |
| 边框 | `#E5E6EB` |
| 分割线 | `#F2F3F5` |

---

## 🎯 组件样式

### 卡片组件（所有卡片！）

```css
.card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(51, 112, 255, 0.12);
  border: 1px solid rgba(51, 112, 255, 0.08);
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(51, 112, 255, 0.18);
  border-color: rgba(51, 112, 255, 0.15);
}
```

**关键点**：
- ✅ 圆角：**12px**（统一）
- ✅ 玻璃态：`backdrop-filter: blur(10px)`
- ✅ 阴影：蓝色阴影，非灰色
- ✅ 悬停：上浮 2px + 阴影加深

---

### 按钮组件（所有按钮！）

#### 主按钮

```css
.btn-primary {
  background: linear-gradient(135deg, #3370FF, #5C7CFA);
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(51, 112, 255, 0.35);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### 次按钮

```css
.btn-secondary {
  background: #FFFFFF;
  border: 2px solid #3370FF;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  color: #3370FF;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.btn-secondary:hover {
  background: #3370FF;
  color: #FFFFFF;
  transform: translateY(-2px);
}
```

#### 文字按钮

```css
.btn-text {
  background: transparent;
  border: none;
  color: #3370FF;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-text:hover {
  background: #F0F5FF;
}
```

**关键点**：
- ✅ 主按钮：**渐变背景**（不是纯色）
- ✅ 圆角：**8px**（统一）
- ✅ 悬停：**上浮 2px** + 阴影
- ✅ 字重：**600**（加粗）

---

### 输入框（所有输入框！）

```css
.input {
  border-radius: 8px;
  border: 2px solid #E5E6EB;
  background: #FFFFFF;
  padding: 10px 14px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.input:hover {
  border-color: #86909C;
}

.input:focus {
  border-color: #3370FF;
  box-shadow: 0 0 0 3px rgba(51, 112, 255, 0.12);
  outline: none;
}
```

**关键点**：
- ✅ 圆角：**8px**（统一）
- ✅ 边框：**2px**（不是 1px）
- ✅ 聚焦：**蓝色光晕**（box-shadow）
- ✅ 过渡：0.2s ease

---

### 标签 (Tag)

| 类型 | 背景 | 文字 | 边框 |
|------|------|------|------|
| 默认 | `#F2F3F5` | `#4E5969` | `transparent` |
| 主色 | `#E8F3FF` | `#3370FF` | `#BAE0FF` |
| 成功 | `#F6FFED` | `#52C41A` | `#B7EB8F` |
| 警告 | `#FFF7E8` | `#FA8C16` | `#FFD591` |
| 错误 | `#FFF2F0` | `#FF4D4F` | `#FFA39E` |

---

## 📐 布局规范

### 间距系统

| 类型 | 数值 | 使用场景 |
|------|------|----------|
| 微型间距 | 4px / 8px | 图标与文字、标签内边距 |
| 小型间距 | 12px / 16px | 表单元素、按钮内边距 |
| 标准间距 | 20px / 24px | **卡片内边距**、模块间距 |
| 大型间距 | 32px / 40px | 页面分区、大模块间隔 |
| 超大型间距 | 48px / 64px | 页面级留白、Hero 区域 |

### 卡片布局

```
┌─────────────────────────────────────┐
│  [图标]  标题                       │ ← 顶部留白 20px
│         副标题/描述                  │
├─────────────────────────────────────┤ ← 分割线 1px
│                                     │
│           内容区域                   │ ← 上下留白 24px
│                                     │
├─────────────────────────────────────┤
│                    [操作按钮]        │ ← 底部留白 20px
└─────────────────────────────────────┘
```

**统一规范**：
- **卡片间距**: 24px (卡片之间)
- **卡片内边距**: 20px - 24px
- **圆角**: 8px (小组件) / 12px (大卡片)
- **最大宽度**: 1200px (内容区域)

---

## ✨ 动效规范

### 过渡时间

| 场景 | 时长 | 缓动函数 |
|------|------|----------|
| 微小交互 (悬停) | 150ms - 200ms | `ease-out` |
| 标准过渡 (按钮/输入框) | 200ms - 250ms | `ease-in-out` |
| 大型动效 (卡片/模态框) | 300ms - 350ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| 页面切换 | 400ms - 500ms | `cubic-bezier(0.65, 0, 0.35, 1)` |

### 悬停效果（统一）

```css
/* 所有卡片、按钮、可点击元素的悬停 */
:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

### 入场动效

```css
/* 页面/模块加载时的入场动画 */
.fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🎭 玻璃态效果

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(51, 112, 255, 0.1);
}
```

**应用场景**：
- ✅ 侧边栏
- ✅ 顶部导航栏
- ✅ 弹窗/模态框
- ✅ 下拉菜单

---

## 🌈 渐变库

### 常用渐变

| 名称 | CSS | 效果 |
|------|-----|------|
| 科技蓝紫 | `linear-gradient(135deg, #3370FF, #722ED1)` | **主按钮、卡片装饰** |
| 清新青蓝 | `linear-gradient(135deg, #13C2C2, #3370FF)` | 成功状态、数据可视化 |
| 活力橙粉 | `linear-gradient(135deg, #FA8C16, #F759AB)` | 活动运营、CTA |
| 深邃紫蓝 | `linear-gradient(135deg, #722ED1, #096DD9)` | 强调区域 |
| 极光绿青 | `linear-gradient(135deg, #52C41A, #13C2C2)` | 成功、完成状态 |
| 日落橙红 | `linear-gradient(135deg, #FF7A45, #FF4D4F)` | 警告、错误 |

### 背景渐变

```css
/* 主背景渐变 - 所有页面 */
.bg-main {
  background: linear-gradient(180deg, #F5F7FF 0%, #EBF1FF 100%);
}

/* 卡片微渐变 */
.bg-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 100%);
}
```

---

## 📐 字体规范

| 层级 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| H1 | 32px / 2rem | 700 | 1.3 | 页面主标题 |
| H2 | 24px / 1.5rem | 600 | 1.4 | 模块标题 |
| H3 | 20px / 1.25rem | 600 | 1.4 | 子模块标题 |
| H4 | 16px / 1rem | 600 | 1.5 | 卡片标题 |
| Body | 14px / 0.875rem | 400 | 1.6 | 正文内容 |
| Small | 12px / 0.75rem | 400 | 1.5 | 辅助文字 |

---

## ✅ 实施检查清单

### 色彩检查
- [ ] 主色是否为 `#3370FF`（不是 `#1890FF`）？
- [ ] 主按钮是否使用渐变背景？
- [ ] 页面背景是否为渐变（不是纯白）？

### 组件检查
- [ ] 所有卡片圆角是否为 12px？
- [ ] 所有按钮圆角是否为 8px？
- [ ] 所有输入框圆角是否为 8px？
- [ ] 卡片是否有玻璃态效果？
- [ ] 卡片是否有蓝色阴影（不是灰色）？

### 动效检查
- [ ] 所有悬停是否有上浮 2px 效果？
- [ ] 所有悬停是否有阴影变化？
- [ ] 过渡时间是否为 200-300ms？
- [ ] 页面加载是否有淡入上浮动画？

### 布局检查
- [ ] 卡片间距是否为 24px？
- [ ] 卡片内边距是否为 20-24px？
- [ ] 所有间距是否统一？

---

## 📁 实施文件

### 必须修改的文件

1. **设计令牌**：`src/styles/design-tokens.css`
   - 定义所有 CSS 变量（颜色、圆角、阴影、间距）

2. **全局样式**：`src/styles/global.css`
   - 全局组件样式（卡片、按钮、输入框）
   - 动效定义
   - 工具类

3. **页面组件**：所有 `src/pages/*.jsx`
   - 应用新的样式类
   - 确保风格统一

---

## 🎯 验收标准

**完成标准**：
1. ✅ 所有页面风格统一
2. ✅ 所有组件符合规范
3. ✅ 所有动效一致
4. ✅ 对比 Demo 页面效果一致

**验收流程**：
1. 打开 Demo 页面：http://47.100.5.220:8082/demo.html
2. 逐个对比每个组件
3. 测试所有悬停效果
4. 确认色彩、圆角、阴影、动效一致

---

**规范文档结束**

**维护人**: 祖龙 🐉  
**执行人**: 麒麟 🐅  
**验收人**: 老板
