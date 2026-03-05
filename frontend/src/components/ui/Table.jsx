import React from 'react'
import { Table as AntTable } from 'antd'
import './Table.css'

/**
 * 标准化表格组件 - 基于 Demo 设计规范
 * 
 * @param {Array} columns - 列配置
 * @param {Array} dataSource - 数据源
 * @param {boolean} loading - 加载状态
 * @param {boolean} pagination - 分页配置
 * @param {Object} scroll - 滚动配置
 * @param {Array} expandedRowKeys - 展开的行 keys
 * @param {Function} onExpand - 展开/收起事件
 * @param {string} className - 自定义类名
 */
const Table = ({
  columns,
  dataSource,
  loading = false,
  pagination = true,
  scroll,
  expandedRowKeys,
  onExpand,
  className = '',
  ...props
}) => {
  // 应用 Demo 卡片样式包裹表格
  const classNames = [
    'card-glass',
    'table-container',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <AntTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        scroll={scroll}
        expandedRowKeys={expandedRowKeys}
        onExpand={onExpand}
        bordered={false}
        {...props}
      />
    </div>
  )
}

export default Table
