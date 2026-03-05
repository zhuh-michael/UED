# UED 设计系统组件库

**仓库**: https://github.com/zhuh-michael/UED  
**设计风格**: 蓝紫渐变 + 玻璃态 + 流畅动效  
**最后更新**: 2026-03-05  
**组件总数**: 55 个

---

## 📁 文件说明

| 文件 | 大小 | 组件数 | 说明 |
|------|------|--------|------|
| **components-full.html** | 173KB | 47 个 | 完整基础组件库（推荐使用） |
| **components-layout.html** | 21KB | 8 个 | 布局组件库（新增） |
| demo.html | 89KB | 18 个 | 核心基础组件（向后兼容） |
| demo-components-p0.html | 25KB | 8 个 | P0 补充组件（向后兼容） |
| demo-components-p1.html | 58KB | 21 个 | P1/P2 组件（向后兼容） |

---

## 📐 布局组件（8 个）

### 1. Layout 布局容器
**使用场景**: 后台管理系统主框架  
**尺寸规范**: Header 60px, Sidebar 200px, Footer 40px  
**状态**: ✅ 默认

### 2. Header 顶部栏
**使用场景**: 页面顶部导航、品牌展示、全局操作  
**尺寸规范**: 高度 60px，左右内边距 24px  
**状态**: ✅ 默认

### 3. Sidebar 侧边栏
**使用场景**: 左侧导航菜单、功能分类  
**尺寸规范**: 宽度 240px，菜单项高度 44px  
**状态**: ✅ 默认、✅ Hover、✅ Active

### 4. Content 内容区
**使用场景**: 页面主内容区域、数据展示  
**尺寸规范**: 自适应宽度，内边距 24px  
**状态**: ✅ 默认

### 5. Grid 栅格系统
**使用场景**: 响应式布局、卡片排列、表单布局  
**尺寸规范**: 24 栅格，gutter 8px  
**状态**: ✅ 6/8/12/24 列

### 6. Space 间距组件
**使用场景**: 统一元素间距、按钮组、卡片列表  
**尺寸规范**: 支持 8/12/16/24/32px 间距  
**状态**: ✅ 水平、✅ 垂直

### 7. Divider 分割线
**使用场景**: 内容分隔、操作项分隔  
**尺寸规范**: 线宽 1px，颜色 #E5E6EB  
**状态**: ✅ 水平、✅ 垂直、✅ 带文字

### 8. Container 容器
**使用场景**: 页面内容居中、限制最大宽度  
**尺寸规范**: 固定宽度 1200px（可配置）  
**状态**: ✅ 固定、✅ 流体

---

## 🎨 基础组件（47 个）

### 基础组件（4 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Button 按钮 | ✅ 默认/Hover/Active/Disabled/Loading | 操作触发 |
| Card 卡片 | ✅ 默认/Hover | 内容容器 |
| Input 输入框 | ✅ 默认/Focus/Disabled/Error | 文本输入 |
| Textarea 多行文本 | ✅ 默认/Focus/Disabled | 多行输入 |

### 表单组件（10 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Select 下拉选择 | ✅ 默认/Hover/Active/Disabled | 单选/多选 |
| Checkbox 复选框 | ✅ 未选/选中/禁用/半选 | 多选 |
| Radio 单选框 | ✅ 未选/选中/禁用 | 单选 |
| Switch 开关 | ✅ 开/关/禁用 | 布尔切换 |
| DatePicker 日期选择 | ✅ 默认/Hover/Active/Disabled | 日期选择 |
| Cascader 级联选择 | ✅ 默认/Hover/Active/Disabled | 多级选择 |
| Slider 滑块 | ✅ 默认/Hover/Active/Disabled | 范围选择 |
| Rate 评分 | ✅ 默认/Hover/选中 | 评分 |
| Rich Text Editor 富文本 | ✅ 编辑/预览 | 富文本编辑 |
| File Upload 文件上传 | ✅ 默认/Hover/上传中/完成 | 文件上传 |

### 列表组件（6 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Basic List 基础列表 | ✅ 默认/Hover | 简单列表 |
| Status List 状态列表 | ✅ 默认/Hover | 带状态列表 |
| Card List 卡片列表 | ✅ 默认/Hover | 卡片式列表 |
| Timeline 时间线 | ✅ 默认 | 时间轴 |
| Card Grid 卡片网格 | ✅ 默认/Hover | 网格布局 |
| Loading 加载状态 | ✅ Spinner/Skeleton | 加载反馈 |

### 表格组件（3 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Table 表格 | ✅ 默认/Hover/排序/分页 | 数据展示 |
| Striped Table 斑马纹 | ✅ 默认/Hover | 数据展示 |
| Pagination 分页器 | ✅ 默认/Hover/Active/Disabled | 分页 |

### 展示组件（8 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Breadcrumb 面包屑 | ✅ 默认/Hover | 导航路径 |
| Notification 通知 | ✅ 成功/警告/错误/信息 | 消息通知 |
| Avatar 头像 | ✅ 默认/Hover | 用户头像 |
| Badge 徽章 | ✅ 默认/点状 | 状态标记 |
| Tag 标签 | ✅ 默认/可关闭 | 标签分类 |
| Empty 空状态 | ✅ 默认 | 空数据展示 |
| Tree 树形控件 | ✅ 默认/Hover/展开/选中 | 树形数据 |
| Collapse 折叠面板 | ✅ 展开/收起 | 折叠内容 |

### 反馈组件（9 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Modal 弹窗 | ✅ 默认/确认/取消 | 对话框 |
| Progress 进度条 | ✅ 默认/条纹/环形 | 进度展示 |
| Skeleton 骨架屏 | ✅ 加载/完成 | 加载占位 |
| Tabs 标签页 | ✅ 默认/Hover/Active/Disabled | 标签切换 |
| Drawer 抽屉 | ✅ 左/右/上/下 | 侧边抽屉 |
| Tooltip 文字提示 | ✅ 上/下/左/右 | 文字提示 |
| Popover 气泡卡片 | ✅ 上/下/左/右 | 气泡卡片 |
| Message 全局提示 | ✅ 成功/警告/错误/信息 | 全局消息 |
| Result 结果页 | ✅ 成功/失败/警告 | 操作结果 |

### 导航组件（3 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Steps 步骤条 | ✅ 默认/完成/进行中 | 步骤引导 |
| Dropdown 下拉菜单 | ✅ 默认/Hover/Active | 下拉操作 |
| Menu 导航菜单 | ✅ 默认/Hover/Active/Disabled | 导航菜单 |

### 其他组件（4 个）
| 组件 | 状态 | 使用场景 |
|------|------|----------|
| Divider 分割线 | ✅ 水平/垂直/带文字 | 内容分隔 |
| Carousel 走马灯 | ✅ 默认/Hover/切换 | 轮播展示 |
| Calendar 日历 | ✅ 默认/Hover/选中 | 日历展示 |
| Descriptions 描述列表 | ✅ 默认 | 键值对展示 |

---

## 🎨 设计规范

### 色彩系统
| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 | `#3370FF` | 品牌主色 |
| 主色渐变 | `#3370FF → #722ED1` | 渐变背景 |
| 辅色 | `#33C3B0` | 青色辅助 |
| 辅色 | `#FF7A45` | 橙色辅助 |
| 成功 | `#00B365` | 成功状态 |
| 警告 | `#FFB300` | 警告状态 |
| 错误 | `#FF4D4F` | 错误状态 |

### 圆角规范
| 组件 | 圆角 | 说明 |
|------|------|------|
| 按钮/输入框 | 8px | 小型组件 |
| 卡片 | 12px | 大型容器 |
| 标签 | 6px | 微型组件 |

### 动效规范
| 效果 | 值 | 说明 |
|------|-----|------|
| 悬停上浮 | `translateY(-2px)` | 交互反馈 |
| 过渡时间 | `0.3s ease` | 平滑过渡 |
| 阴影 | `0 4px 16px rgba(51,112,255,0.2)` | 层次感 |

### 视觉效果
- **玻璃态**: `backdrop-filter: blur(20px)`
- **渐变背景**: `linear-gradient(135deg, #3370FF, #722ED1)`
- **间距系统**: 4/8/12/16/24/32px

---

## 📖 使用指南

### 1. 标准后台布局
```html
<!-- 引入布局组件 -->
<link rel="stylesheet" href="components-layout.html">

<!-- 使用 Layout -->
<div class="layout-wrapper">
  <div class="layout-header">...</div>
  <div class="layout-body">
    <div class="layout-sidebar">...</div>
    <div class="layout-content">...</div>
  </div>
  <div class="layout-footer">...</div>
</div>
```

### 2. 栅格布局
```html
<div class="grid-demo">
  <div class="grid-col grid-col-8">8 列</div>
  <div class="grid-col grid-col-8">8 列</div>
  <div class="grid-col grid-col-8">8 列</div>
</div>
```

### 3. 间距控制
```html
<!-- 水平间距 -->
<div class="space-horizontal">
  <div class="space-item">按钮 1</div>
  <div class="space-item">按钮 2</div>
</div>

<!-- 垂直间距 -->
<div class="space-vertical">
  <div class="space-item">卡片 1</div>
  <div class="space-item">卡片 2</div>
</div>
```

---

## 📅 更新记录

| 日期 | 更新内容 | 组件数 |
|------|----------|--------|
| 2026-03-05 | 新增布局组件库（8 个） | +8 |
| 2026-03-05 | 去重合并，输出统一组件库 | 47 |
| 2026-03-04 | P1/P2 组件补充 | +21 |
| 2026-03-04 | P0 组件补充 | +8 |
| 2026-03-04 | 初始 18 个基础组件 | 18 |

---

## 🔗 相关链接

- **GitHub**: https://github.com/zhuh-michael/UED
- **设计稿**: `components-full.html` (47 个基础组件)
- **布局稿**: `components-layout.html` (8 个布局组件)

---

_本文档由青鸾维护，祖龙监督。_
