import React from 'react'
import { List as AntList } from 'antd'
import './List.css'

/**
 * 标准化列表组件 - 基于 Demo 设计规范
 * 
 * @param {Array} dataSource - 数据源
 * @param {Function} renderItem - 渲染每项的函数
 * @param {boolean} loading - 加载状态
 * @param {string} header - 列表头部
 * @param {string} footer - 列表底部
 * @param {boolean} bordered - 是否显示边框
 * @param {string} className - 自定义类名
 */
const List = ({
  dataSource,
  renderItem,
  loading = false,
  header,
  footer,
  bordered = false,
  className = '',
  ...props
}) => {
  // 应用 Demo 卡片样式包裹列表
  const classNames = [
    'card-glass',
    'list-container',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <AntList
        dataSource={dataSource}
        renderItem={renderItem}
        loading={loading}
        header={header}
        footer={footer}
        bordered={bordered}
        {...props}
      />
    </div>
  )
}

// 导出 Ant Design 的 List 子组件，确保 List.Item 和 List.Item.Meta 可用
List.Item = AntList.Item
List.Item.Meta = AntList.Item.Meta

export default List
