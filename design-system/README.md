# UED 设计系统组件库

**仓库**: https://github.com/zhuh-michael/UED  
**设计风格**: 蓝紫渐变 + 玻璃态 + 流畅动效

---

## 📁 文件说明

| 文件 | 大小 | 组件数 | 说明 |
|------|------|--------|------|
| demo.html | 89KB | 18 个 | 基础组件库（完整 18 模块） |
| demo-components-p0.html | 25KB | 8 个 | P0 必备组件（Select/Checkbox/Radio/Switch/Modal/Progress/Skeleton/Tabs） |
| visual-demo.html | 21KB | 7 个 | 视觉规范 Demo |
| visual-demo-form.html | 20KB | 3 个 | 表单组件专项 |
| visual-demo-list.html | 32KB | 4 个 | 列表组件专项 |
| visual-demo-data.html | 39KB | 8 个 | 数据展示专项 |

---

## ✅ 已有组件（26 个）

### 基础组件（18 个）
- Button 按钮
- Card 卡片
- Input 输入框
- Textarea 多行文本框
- Rich Text Editor 富文本编辑器
- File Upload 文件上传
- Basic List 基础列表
- Status List 状态列表
- Card List 卡片列表
- Timeline 时间线列表
- Table 表格
- Striped Table 斑马纹表格
- Pagination 分页器
- Card Grid 卡片网格
- Loading 加载状态
- Breadcrumb 面包屑导航
- Notification 通知与消息提示
- Color System 色彩系统

### P0 补充组件（8 个）
- Select 下拉选择
- Checkbox 复选框
- Radio 单选框
- Switch 开关
- Modal 弹窗
- Progress 进度条
- Skeleton 骨架屏
- Tabs 标签页

---

## 🎯 待补充组件（P1/P2）

### P1 重要组件（约 15 个）
- DatePicker 日期选择
- Cascader 级联选择
- Slider 滑块
- Rate 评分
- Drawer 抽屉
- Tooltip 文字提示
- Popover 气泡卡片
- Steps 步骤条
- Dropdown 下拉菜单
- Avatar 头像
- Badge 徽章
- Tag 标签
- Empty 空状态
- Tree 树形控件
- Collapse 折叠面板

### P2 可选组件（约 5 个）
- Divider 分割线
- Carousel 走马灯
- Calendar 日历
- Descriptions 描述列表
- Message 全局提示
- Result 结果页

---

## 🎨 设计规范

### 色彩系统
- **主色**: #3370FF
- **渐变**: #3370FF → #722ED1
- **辅色**: #33C3B0, #FF7A45, #00B365
- **状态色**: #00B365 (成功), #FFB300 (警告), #FF4D4F (错误)

### 圆角规范
- **按钮/输入框**: 8px
- **卡片**: 12px
- **标签**: 6px

### 动效规范
- **悬停**: translateY(-2px) ~ translateY(-4px)
- **过渡**: 0.3s ease
- **阴影**: 多层蓝色阴影

### 视觉效果
- **玻璃态**: backdrop-filter: blur(20px)
- **渐变背景**: linear-gradient(135deg, #3370FF, #722ED1)

---

## 🔄 更新流程

1. 青鸾更新设计稿
2. 复制到 `design-system/` 目录
3. 提交 Git 并推送
4. 通知麒麟实现

---

## 📅 更新记录

| 日期 | 更新内容 | 组件数 |
|------|----------|--------|
| 2026-03-04 | 初始 18 个模块 | 18 |
| 2026-03-04 | P0 组件 8 个 | +8 |
| 2026-03-04 | 待补充 P1/P2 | ~20 |

---

_本文档由祖龙创建，青鸾负责维护更新。_
