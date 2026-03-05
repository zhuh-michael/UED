import React from 'react'
import './Textarea.css'

/**
 * 标准化多行文本框组件 - 基于青鸾 Demo 设计规范
 * 
 * @param {string} placeholder - 占位符
 * @param {string} value - 值
 * @param {number} rows - 行数
 * @param {boolean} disabled - 禁用状态
 * @param {boolean} resizable - 是否可调整大小
 * @param {Function} onChange - 变化事件
 * @param {Function} onFocus - 聚焦事件
 * @param {Function} onBlur - 失焦事件
 * @param {string} label - 标签文本
 * @param {string} helperText - 辅助文本
 * @param {string} className - 自定义类名
 */
export const Textarea = ({ 
  placeholder,
  value,
  rows = 4,
  disabled = false,
  resizable = true,
  onChange,
  onFocus,
  onBlur,
  label,
  helperText,
  className = '',
  ...props 
}) => {
  const classNames = ['textarea-wrapper', className].filter(Boolean).join(' ')
  const textareaClassNames = ['textarea', disabled ? 'textarea-disabled' : '', !resizable ? 'textarea-no-resize' : ''].filter(Boolean).join(' ')
  
  return (
    <div className={classNames}>
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className={textareaClassNames}
        placeholder={placeholder}
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {helperText && <div className="textarea-helper">{helperText}</div>}
    </div>
  )
}

export default Textarea
