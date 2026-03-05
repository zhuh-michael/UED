import React, { useState } from 'react'
import './Input.css'

/**
 * Input 输入框组件
 * 
 * @param {string} value - 输入值
 * @param {string} placeholder - 占位符
 * @param {string} size - 尺寸：small | medium | large
 * @param {boolean} disabled - 禁用状态
 * @param {string} status - 状态：default | error | warning | success
 * @param {string} prefix - 前缀内容
 * @param {string} suffix - 后缀内容
 * @param {Function} onChange - 变化事件
 * @param {Function} onFocus - 聚焦事件
 * @param {Function} onBlur - 失焦事件
 * @param {string} className - 自定义类名
 */
const Input = ({
  value,
  placeholder = '请输入内容...',
  size = 'medium',
  disabled = false,
  status = 'default',
  prefix,
  suffix,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const sizeClasses = {
    small: 'input-sm',
    medium: '',
    large: 'input-lg'
  }

  const classNames = [
    'input',
    sizeClasses[size],
    status ? `input-${status}` : '',
    isFocused ? 'input-focused' : '',
    disabled ? 'input-disabled' : '',
    prefix ? 'input-with-prefix' : '',
    suffix ? 'input-with-suffix' : '',
    className
  ].filter(Boolean).join(' ')

  const handleChange = (e) => {
    onChange?.(e.target.value, e)
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="input-wrapper">
      {prefix && <span className="input-prefix">{prefix}</span>}
      <input
        type="text"
        className={classNames}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  )
}

export default Input
