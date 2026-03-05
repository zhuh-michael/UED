import React from 'react'
import './Layout.css'

/**
 * Layout 布局组件
 * 
 * 提供标准的页面布局结构：顶部导航 + 侧边栏 + 内容区
 * 
 * @param {ReactNode} header - 顶部导航内容
 * @param {ReactNode} sidebar - 侧边栏内容
 * @param {ReactNode} children - 内容区内容
 * @param {boolean} fixedHeader - 是否固定顶部
 * @param {boolean} fixedSidebar - 是否固定侧边栏
 * @param {string} sidebarWidth - 侧边栏宽度
 */
const Layout = ({
  header,
  sidebar,
  children,
  fixedHeader = true,
  fixedSidebar = true,
  sidebarWidth = '240px'
}) => {
  return (
    <div className="layout">
      {fixedHeader && header && (
        <header className="layout-header">
          {header}
        </header>
      )}
      <div className="layout-body">
        {fixedSidebar && sidebar && (
          <aside className="layout-sidebar" style={{ width: sidebarWidth }}>
            {sidebar}
          </aside>
        )}
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
