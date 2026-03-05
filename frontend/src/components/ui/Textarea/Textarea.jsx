import React, { useState } from 'react'
import './Textarea.css'

/**
 * Textarea 多行文本框组件
 * 
 * @param {string} value - 输入值
 * @param {string} placeholder - 占位符
 * @param {number} rows - 行数
 * @param {boolean} disabled - 禁用状态
 * @param {boolean} resizable - 是否可调整大小
 * @param {number} maxLength - 最大长度
 * @param {Function} onChange - 变化事件
 * @param {Function} onFocus - 聚焦事件
 * @param {Function} onBlur - 失焦事件
 * @param {string} className - 自定义类名
 */
const Textarea = ({
  value,
  placeholder = '请输入多行文本内容...',
  rows = 4,
  disabled = false,
  resizable = true,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [charCount, setCharCount] = useState(value?.length || 0)

  const classNames = [
    'textarea',
    isFocused ? 'textarea-focused' : '',
    disabled ? 'textarea-disabled' : '',
    !resizable ? 'textarea-no-resize' : '',
    className
  ].filter(Boolean).join(' ')

  const handleChange = (e) => {
    const newValue = e.target.value
    onChange?.(newValue, e)
    if (maxLength) {
      setCharCount(newValue.length)
    }
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
    <div className="textarea-wrapper">
      <textarea
        className={classNames}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {maxLength && (
        <div className="textarea-count">
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  )
}

export default Textarea
