# UED 设计系统组件库

**仓库**: https://github.com/zhuh-michael/UED  
**设计风格**: 蓝紫渐变 + 玻璃态 + 流畅动效  
**最后更新**: 2026-03-05

---

## 📁 文件说明（已去重合并）

| 文件 | 大小 | 组件数 | 说明 |
|------|------|--------|------|
| **components-full.html** | ~150KB | 47 个 | **完整组件库（推荐使用）** |
| demo.html | 89KB | 18 个 | 核心基础组件（保留向后兼容） |
| demo-components-p0.html | 25KB | 8 个 | P0 补充组件（保留向后兼容） |
| demo-components-p1.html | 58KB | 21 个 | P1/P2 组件（保留向后兼容） |

### 已归档文件（重复组件，已合并到 components-full.html）
- ~~visual-demo.html~~ - 视觉规范（已合并）
- ~~visual-demo-form.html~~ - 表单专项（组件已重复）
- ~~visual-demo-list.html~~ - 列表专项（组件已重复）
- ~~visual-demo-data.html~~ - 数据展示专项（组件已重复）

---

## ✅ 完整组件清单（47 个）

### 核心基础组件（18 个）
1. Color System 色彩系统
2. Button 按钮
3. Card 卡片
4. Input 输入框
5. Textarea 多行文本框
6. Rich Text Editor 富文本编辑器
7. File Upload 文件上传
8. Basic List 基础列表
9. Status List 状态列表
10. Card List 卡片列表
11. Timeline 时间线列表
12. Table 表格
13. Striped Table 斑马纹表格
14. Pagination 分页器
15. Card Grid 卡片网格
16. Loading 加载状态
17. Breadcrumb 面包屑导航
18. Notification 通知与消息提示

### P0 补充组件（8 个）
19. Select 下拉选择
20. Checkbox 复选框
21. Radio 单选框
22. Switch 开关
23. Modal 弹窗
24. Progress 进度条
25. Skeleton 骨架屏
26. Tabs 标签页

### P1/P2 组件（21 个）
27. DatePicker 日期选择
28. Cascader 级联选择
29. Slider 滑块
30. Rate 评分
31. Drawer 抽屉
32. Tooltip 文字提示
33. Popover 气泡卡片
34. Steps 步骤条
35. Dropdown 下拉菜单
36. Avatar 头像
37. Badge 徽章
38. Tag 标签
39. Divider 分割线
40. Empty 空状态
41. Tree 树形控件
42. Collapse 折叠面板
43. Carousel 走马灯
44. Calendar 日历
45. Descriptions 描述列表
46. Message 全局提示
47. Result 结果页

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

## 📅 更新记录

| 日期 | 更新内容 | 组件数 |
|------|----------|--------|
| 2026-03-05 | **去重合并** - 输出 components-full.html | 47 |
| 2026-03-04 | P1/P2 组件补充 | +21 |
| 2026-03-04 | P0 组件补充 | +8 |
| 2026-03-04 | 初始 18 个基础组件 | 18 |

---

## 🔗 使用建议

1. **查看完整组件库**: 打开 `components-full.html`
2. **开发参考**: 使用 `components-full.html` 作为设计稿
3. **向后兼容**: 旧文件保留但不再维护

---

_本文档由青鸾维护，祖龙监督。_
