import React from 'react'
import './Card.css'

/**
 * Card 卡片组件
 * 
 * @param {string} variant - 卡片类型：glass | gradient | default
 * @param {ReactNode} title - 标题
 * @param {ReactNode} extra - 右上角额外内容
 * @param {boolean} hoverable - 是否可悬停
 * @param {Function} onClick - 点击事件
 * @param {ReactNode} children - 卡片内容
 * @param {string} className - 自定义类名
 */
const Card = ({
  variant = 'glass',
  title,
  extra,
  hoverable = true,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
    hoverable ? 'card-hoverable' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {(title || extra) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {extra && <div className="card-extra">{extra}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card
