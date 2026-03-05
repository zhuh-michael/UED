import React from 'react'
import './Button.css'

/**
 * Button 按钮组件
 * 
 * @param {string} variant - 按钮类型：primary | secondary | text
 * @param {boolean} loading - 加载状态
 * @param {boolean} disabled - 禁用状态
 * @param {string} size - 尺寸：small | medium | large
 * @param {ReactNode} icon - 图标
 * @param {boolean} block - 是否块级按钮
 * @param {Function} onClick - 点击事件
 * @param {ReactNode} children - 按钮内容
 * @param {string} className - 自定义类名
 */
const Button = ({
  variant = 'primary',
  loading = false,
  disabled = false,
  size = 'medium',
  icon,
  block = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg'
  }

  const classNames = [
    'btn',
    `btn-${variant}`,
    sizeClasses[size],
    block ? 'btn-block' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
