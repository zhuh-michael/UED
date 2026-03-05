import React from 'react'
import { Button as AntButton } from 'antd'
import './Button.css'

/**
 * 标准化按钮组件 - 基于 Demo 设计规范
 * 
 * @param {string} type - 按钮类型：primary | default | text
 * @param {boolean} loading - 加载状态
 * @param {boolean} disabled - 禁用状态
 * @param {string} size - 尺寸：small | middle | large
 * @param {ReactNode} icon - 图标
 * @param {boolean} block - 是否块级按钮
 * @param {Function} onClick - 点击事件
 * @param {ReactNode} children - 按钮内容
 */
const Button = ({
  type = 'default',
  loading = false,
  disabled = false,
  size = 'middle',
  icon,
  block = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  // 主按钮应用 Demo 渐变样式
  const classNames = [
    type === 'primary' ? 'btn-primary' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <AntButton
      type={type}
      loading={loading}
      disabled={disabled}
      size={size}
      icon={icon}
      block={block}
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {children}
    </AntButton>
  )
}

export default Button
