import React from 'react'
import { Input as AntInput } from 'antd'
import './Input.css'

const { TextArea, Password } = AntInput

/**
 * 标准化输入框组件 - 基于 Demo 设计规范
 * 
 * @param {string} type - 输入框类型：text | password | textarea
 * @param {string} placeholder - 占位符
 * @param {ReactNode} prefix - 前缀图标/内容
 * @param {ReactNode} suffix - 后缀图标/内容
 * @param {boolean} disabled - 禁用状态
 * @param {string} size - 尺寸：small | middle | large
 * @param {Function} onChange - 变化事件
 * @param {string} value - 值
 * @param {string} className - 自定义类名
 */
const Input = ({
  type = 'text',
  placeholder,
  prefix,
  suffix,
  disabled = false,
  size = 'middle',
  onChange,
  value,
  className = '',
  ...props
}) => {
  // 应用 Demo 输入框样式
  const classNames = [
    'input',
    className
  ].filter(Boolean).join(' ')

  if (type === 'textarea') {
    return (
      <TextArea
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        onChange={onChange}
        value={value}
        className={classNames}
        {...props}
      />
    )
  }

  if (type === 'password') {
    return (
      <Password
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        size={size}
        onChange={onChange}
        value={value}
        className={classNames}
        {...props}
      />
    )
  }

  return (
    <AntInput
      type={type}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      disabled={disabled}
      size={size}
      onChange={onChange}
      value={value}
      className={classNames}
      {...props}
    />
  )
}

export default Input
