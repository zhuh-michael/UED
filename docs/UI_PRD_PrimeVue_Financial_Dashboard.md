# UI 改造 PRD - PrimeVue 金融仪表盘风格

**文档版本**: 1.0  
**创建日期**: 2026-03-02  
**创建者**: 青鸾 🐦‍🔥  
**派发对象**: 麒麟 🐅  

---

## 一、项目概述

### 1.1 改造目标
将当前组织架构管理系统的 UI 从通用 Ant Design 风格改造为 **PrimeVue 金融仪表盘风格**，提升企业级专业感和视觉体验。

### 1.2 适用范围
- 前端所有页面（Dashboard、部门管理、岗位管理、员工管理、角色权限）
- 全局样式系统
- 组件库视觉规范

---

## 二、当前系统评估

### 2.1 技术栈现状
| 项目 | 当前方案 | 兼容性评估 |
|------|----------|------------|
| 框架 | React 18.2.0 | ✅ 保持 |
| UI 库 | Ant Design 5.12.0 | ⚠️ 需通过主题定制实现 PrimeVue 风格 |
| 路由 | React Router 6.20.0 | ✅ 保持 |
| 状态管理 | Zustand 4.4.7 | ✅ 保持 |
| 构建工具 | Vite 5.0.8 | ✅ 保持 |

### 2.2 适配性分析
**优势**:
- Ant Design 5.x 支持强大的主题定制能力（ConfigProvider + CSS Variables）
- 现有组件结构清晰，便于样式覆盖
- 卡片式布局已在使用中（Card 组件）

**挑战**:
- 需通过 CSS 变量覆盖实现 PrimeVue 视觉风格
- 部分组件（如进度条、特定图表）需增强或替换
- 需统一全局设计令牌（Design Tokens）

**建议方案**: 
保持 Ant Design 组件库，通过**主题定制 + 样式覆盖**实现 PrimeVue 风格，避免大规模重构。

---

## 三、设计规范

### 3.1 色彩系统

#### 主色调
| 用途 | 色值 | 说明 |
|------|------|------|
| 背景主色 | `#F8FAFC` | 中性灰白背景 |
| 背景次色 | `#FFFFFF` | 卡片/内容区背景 |
| 导航栏/按钮 | `#1E3A5F` | 深蓝色强调色 |
| 按钮悬停 | `#2C5282` | 深蓝色变体 |
| 按钮激活 | `#1A365D` | 更深蓝色 |

#### 文字颜色
| 用途 | 色值 | 说明 |
|------|------|------|
| 主文字 | `#334155` | 深灰，用于标题/正文 |
| 次文字 | `#64748B` | 中灰，用于辅助信息 |
| 弱化文字 | `#94A3B8` | 浅灰，用于占位符/禁用态 |
| 链接色 | `#2563EB` | 蓝色，用于可点击元素 |

#### 功能色
| 用途 | 色值 | 说明 |
|------|------|------|
| 成功 | `#10B981` | 绿色 |
| 警告 | `#F59E0B` | 橙色 |
| 错误 | `#EF4444` | 红色 |
| 信息 | `#3B82F6` | 蓝色 |

### 3.2 字体系统

#### 字体家族
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

#### 字号规范
| 级别 | 字号 | 行高 | 字重 | 用途 |
|------|------|------|------|------|
| H1 | 24px | 32px | 600 | 页面标题 |
| H2 | 20px | 28px | 600 | 模块标题 |
| H3 | 18px | 24px | 600 | 卡片标题 |
| Body | 14px | 20px | 400 | 正文内容 |
| Small | 12px | 16px | 400 | 辅助文字 |
| Caption | 11px | 14px | 400 | 图例/注释 |

### 3.3 间距系统

基于 4px 基准：
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

### 3.4 圆角规范
| 组件 | 圆角值 | 说明 |
|------|--------|------|
| 卡片 | 12px | 主要容器 |
| 按钮 | 8px | 操作按钮 |
| 输入框 | 8px | 表单控件 |
| 标签 | 6px | Tag/状态标签 |
| 头像 | 50% | 圆形 |

### 3.5 阴影规范
```css
/* 轻微阴影 - 卡片默认 */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);

/* 中等阴影 - 悬浮态 */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);

/* 强调阴影 - 弹窗/下拉 */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
```

---

## 四、布局结构

### 4.1 整体布局
```
┌─────────────────────────────────────────┐
│  Top Bar (可选，系统通知/用户信息)       │
├──────────┬──────────────────────────────┤
│          │                              │
│  左侧    │      右侧主内容区             │
│  导航栏   │      (卡片式设计)             │
│  (固定)  │                              │
│  240px   │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### 4.2 左侧导航栏规范
- **宽度**: 240px (展开) / 80px (收起)
- **背景色**: `#1E3A5F` (深蓝色)
- **文字色**: `#FFFFFF` (主) / `#94A3B8` (次)
- **图标**: 单色线性图标，16px
- **分隔线**: `rgba(255,255,255,0.1)`
- **选中态**: 背景 `rgba(255,255,255,0.15)` + 左侧 3px 蓝色边框

### 4.3 主内容区规范
- **背景色**: `#F8FAFC`
- **内边距**: 24px
- **卡片间距**: 16px
- **最大宽度**: 1440px (居中)

### 4.4 卡片组件规范
```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #F1F5F9;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #334155;
}
```

---

## 五、组件规范

### 5.1 按钮组件

#### 主要按钮 (Primary)
```css
.btn-primary {
  background: #1E3A5F;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2C5282;
}

.btn-primary:active {
  background: #1A365D;
}
```

#### 次要按钮 (Secondary)
```css
.btn-secondary {
  background: #FFFFFF;
  color: #334155;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #F8FAFC;
  border-color: #94A3B8;
}
```

### 5.2 表格组件

#### 表格样式
```css
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header {
  background: #F8FAFC;
  border-bottom: 2px solid #E2E8F0;
}

.table-header-cell {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #334155;
  font-size: 13px;
}

.table-row {
  border-bottom: 1px solid #F1F5F9;
  transition: background 0.15s;
}

.table-row:hover {
  background: #F8FAFC;
}

.table-cell {
  padding: 14px 16px;
  color: #334155;
  font-size: 14px;
}
```

#### 状态标签
| 状态 | 背景色 | 文字色 | 边框色 |
|------|--------|--------|--------|
| 在职 | `#D1FAE5` | `#065F46` | `#A7F3D0` |
| 离职 | `#FEE2E2` | `#991B1B` | `#FECACA` |
| 实习 | `#DBEAFE` | `#1E40AF` | `#BFDBFE` |
| 启用 | `#D1FAE5` | `#065F46` | `#A7F3D0` |
| 禁用 | `#F3F4F6` | `#4B5563` | `#D1D5DB` |

### 5.3 表单组件

#### 输入框
```css
.input {
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s;
}

.input:focus {
  border-color: #1E3A5F;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
  outline: none;
}

.input::placeholder {
  color: #94A3B8;
}
```

#### 标签 (Label)
```css
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.label-required::before {
  content: '*';
  color: #EF4444;
  margin-right: 4px;
}
```

### 5.4 进度条组件 (资产概览)

```css
.progress-container {
  width: 100%;
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #1E3A5F 0%, #2C5282 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
  color: #64748B;
}

.progress-percentage {
  font-weight: 600;
  color: #1E3A5F;
}
```

### 5.5 图表规范

#### 堆叠柱状图
- **配色**: 使用主色系渐变（深蓝 → 中蓝 → 浅蓝）
- **圆角**: 柱体顶部圆角 4px
- **图例**: 置于图表顶部，水平排列
- **网格线**: `#F1F5F9` (浅灰)
- **坐标轴**: `#94A3B8` (弱化)
- **数据标签**: 显示在柱体内部或顶部

#### 图例样式
```css
.legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748B;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
```

### 5.6 分页控件

```css
.pagination {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.pagination-item {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-size: 14px;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-item:hover {
  border-color: #1E3A5F;
  color: #1E3A5F;
}

.pagination-item.active {
  background: #1E3A5F;
  border-color: #1E3A5F;
  color: #FFFFFF;
}
```

---

## 六、页面改造清单

### 6.1 Dashboard (布局容器)
**改造点**:
- [ ] 左侧导航栏改为深蓝色主题 (`#1E3A5F`)
- [ ] 主内容区背景改为 `#F8FAFC`
- [ ] 所有页面卡片统一为 12px 圆角 + 浅灰边框
- [ ] 添加轻微阴影效果
- [ ] 字体统一为 Inter/系统字体

### 6.2 部门管理页
**改造点**:
- [ ] 卡片标题样式更新
- [ ] 表格表头背景改为 `#F8FAFC`
- [ ] 状态 Switch 组件颜色调整
- [ ] 级别标签 (L1/L2/L3) 颜色规范
- [ ] 按钮组样式统一

### 6.3 岗位管理页
**改造点**:
- [ ] 同上，保持风格一致

### 6.4 员工管理页
**改造点**:
- [ ] 表格状态标签颜色规范（在职/离职/实习）
- [ ] 表单弹窗样式更新
- [ ] 操作按钮组样式统一

### 6.5 角色权限页
**改造点**:
- [ ] 同上，保持风格一致

### 6.6 登录页
**改造点**:
- [ ] 背景改为渐变或纯色金融风格
- [ ] 登录框卡片样式更新
- [ ] 输入框/按钮样式统一

---

## 七、实施步骤

### Phase 1: 设计令牌建立 (0.5 人天)
1. 创建全局 CSS 变量文件 (`src/styles/variables.css`)
2. 定义色彩、字体、间距、圆角、阴影系统
3. 配置 Ant Design 主题（ConfigProvider）

### Phase 2: 全局样式覆盖 (0.5 人天)
1. 更新 `src/index.css` 引入设计令牌
2. 覆盖 Ant Design 默认样式
3. 创建通用组件样式（按钮、卡片、表格）

### Phase 3: 布局组件改造 (0.5 人天)
1. 改造 Dashboard 布局（导航栏、主内容区）
2. 统一所有页面的卡片容器样式
3. 调整间距和排版

### Phase 4: 页面组件逐个改造 (1 人天)
1. 部门管理页
2. 岗位管理页
3. 员工管理页
4. 角色权限页
5. 登录页

### Phase 5: 测试与优化 (0.5 人天)
1. 跨浏览器测试
2. 响应式适配检查
3. 性能优化（CSS 压缩、按需加载）

**总预估**: 3 人天

---

## 八、验收标准

### 视觉验收
- [ ] 所有颜色符合设计规范色值
- [ ] 卡片圆角统一为 12px
- [ ] 阴影效果一致且轻微
- [ ] 字体渲染清晰，字号符合规范
- [ ] 间距系统统一（4px 基准）

### 功能验收
- [ ] 所有交互功能正常（按钮、表单、表格）
- [ ] 响应式布局正常（1920px / 1366px / 1024px）
- [ ] 浏览器兼容性（Chrome / Edge / Safari 最新版）
- [ ] 无明显性能下降

### 体验验收
- [ ] 整体风格统一，无视觉跳跃
- [ ] 操作反馈清晰（悬停、点击、加载）
- [ ] 信息层级分明，可读性良好

---

## 九、交付物

1. **代码交付**
   - `src/styles/variables.css` - 设计令牌
   - `src/styles/global.css` - 全局样式覆盖
   - `src/components/` - 复用组件样式（如有）
   - 所有页面组件更新

2. **文档交付**
   - 样式变更说明
   - 自测报告

---

## 十、备注

1. **不更换组件库**: 保持 Ant Design，通过主题定制实现风格
2. **渐进式改造**: 先全局后局部，确保每步可回滚
3. **保持功能**: 样式改造不影响现有业务逻辑
4. **图表库**: 如当前无可满足的图表组件，建议引入 `recharts` 或 `echarts-for-react`

---

**PRD 评审完成，请麒麟 🐅 立即执行**。

完成后主动发起提测，由白泽 🦄 进行质量验收。
