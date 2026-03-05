import React from 'react'
import { Card as AntCard } from 'antd'
import './Card.css'

/**
 * 标准化卡片组件 - 基于 Demo 设计规范（玻璃态）
 * 
 * @param {string} title - 卡片标题
 * @param {ReactNode} extra - 右上角额外内容
 * @param {boolean} hoverable - 是否支持悬停效果
 * @param {boolean} bordered - 是否显示边框
 * @param {string} className - 自定义类名
 * @param {ReactNode} children - 卡片内容
 */
const Card = ({
  title,
  extra,
  hoverable = true,
  bordered = false,
  className = '',
  children,
  ...props
}) => {
  // 应用 Demo 玻璃态样式
  const classNames = [
    'card-glass',
    className
  ].filter(Boolean).join(' ')

  return (
    <AntCard
      title={title}
      extra={extra}
      hoverable={hoverable}
      bordered={bordered}
      className={classNames}
      {...props}
    >
      {children}
    </AntCard>
  )
}

export default Card
