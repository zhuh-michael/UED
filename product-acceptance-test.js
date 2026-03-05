const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = {
    login: { status: '❌', notes: [] },
    department: { status: '❌', notes: [] },
    employee: { status: '❌', notes: [] },
    position: { status: '❌', notes: [] },
    role: { status: '❌', notes: [] }
  };
  
  const baseUrl = 'http://47.100.5.220:8082';
  
  try {
    // ========== 1. 登录模块测试 ==========
    console.log('=== 测试登录模块 ===');
    await page.goto(baseUrl, { timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // 检查是否有登录表单
    const loginPageUrl = page.url();
    console.log('当前 URL:', loginPageUrl);
    
    // 尝试使用默认账户登录
    try {
      // 查找用户名输入框
      const usernameInput = page.locator('input[type="text"], input[name="username"], input[placeholder*="用户名"], input[placeholder*="账号"]').first();
      await usernameInput.waitFor({ state: 'visible', timeout: 5000 });
      await usernameInput.fill('admin');
      
      // 查找密码输入框
      const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
      await passwordInput.fill('admin123');
      
      // 查找登录按钮
      const loginButton = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("login")').first();
      await loginButton.click();
      
      // 等待登录成功（页面跳转或出现主界面）
      await page.waitForTimeout(5000);
      
      // 检查是否登录成功（URL 变化或出现主界面元素）
      const currentUrl = page.url();
      console.log('登录后 URL:', currentUrl);
      
      // 检查是否有主界面元素（如导航菜单、部门管理等）
      const hasMainMenu = await page.locator('text=部门管理, text=员工管理, text=岗位管理, text=角色管理').count() > 0;
      
      if (hasMainMenu || currentUrl !== loginPageUrl) {
        results.login.status = '✅';
        results.login.notes.push('登录功能正常，admin/admin123 可成功登录');
      } else {
        results.login.notes.push('登录成功但无法确认主界面加载');
      }
    } catch (loginError) {
      results.login.notes.push(`登录失败：${loginError.message}`);
    }
    
    // ========== 2. 部门管理测试 ==========
    console.log('=== 测试部门管理 ===');
    try {
      // 查找部门管理菜单
      const deptMenu = page.locator('text=部门管理, [title*="部门"], .menu-item:has-text("部门")').first();
      await deptMenu.click({ timeout: 5000 });
      await page.waitForTimeout(3000);
      
      // 检查部门树形展示
      const hasTree = await page.locator('.ant-tree, .el-tree, [class*="tree"], text=展开, text=折叠').count() > 0;
      if (hasTree) {
        results.department.notes.push('部门树形展示存在');
      }
      
      // 检查创建部门按钮
      const hasCreateBtn = await page.locator('text=新增部门, text=添加部门, text=新建部门, button:has-text("新增"), button:has-text("添加")').count() > 0;
      if (hasCreateBtn) {
        results.department.notes.push('创建部门功能存在');
      }
      
      // 检查部门列表
      const hasDeptList = await page.locator('table, [class*="list"], text=部门名称, text=部门编码').count() > 0;
      if (hasDeptList) {
        results.department.notes.push('部门列表显示正常');
      }
      
      if (hasTree || hasCreateBtn || hasDeptList) {
        results.department.status = '✅';
      }
    } catch (deptError) {
      results.department.notes.push(`部门管理测试异常：${deptError.message}`);
    }
    
    // ========== 3. 员工管理测试 ==========
    console.log('=== 测试员工管理 ===');
    try {
      // 查找员工管理菜单
      const empMenu = page.locator('text=员工管理, [title*="员工"], .menu-item:has-text("员工")').first();
      await empMenu.click({ timeout: 5000 });
      await page.waitForTimeout(3000);
      
      // 检查员工列表
      const hasEmpList = await page.locator('table, [class*="list"], text=姓名, text=员工编号, text=手机号').count() > 0;
      if (hasEmpList) {
        results.employee.notes.push('员工列表显示正常');
      }
      
      // 检查 CRUD 按钮
      const hasAddBtn = await page.locator('text=新增员工, text=添加员工, button:has-text("新增")').count() > 0;
      const hasEditBtn = await page.locator('text=编辑, [class*="edit"], .ant-btn:has-text("编辑")').count() > 0;
      const hasDeleteBtn = await page.locator('text=删除, [class*="delete"], .ant-btn:has-text("删除")').count() > 0;
      
      if (hasAddBtn) results.employee.notes.push('新增功能存在');
      if (hasEditBtn) results.employee.notes.push('编辑功能存在');
      if (hasDeleteBtn) results.employee.notes.push('删除功能存在');
      
      if (hasEmpList) {
        results.employee.status = '✅';
      }
    } catch (empError) {
      results.employee.notes.push(`员工管理测试异常：${empError.message}`);
    }
    
    // ========== 4. 岗位管理测试 ==========
    console.log('=== 测试岗位管理 ===');
    try {
      // 查找岗位管理菜单
      const posMenu = page.locator('text=岗位管理, [title*="岗位"], .menu-item:has-text("岗位")').first();
      await posMenu.click({ timeout: 5000 });
      await page.waitForTimeout(3000);
      
      // 检查岗位列表
      const hasPosList = await page.locator('table, [class*="list"], text=岗位名称, text=岗位编码').count() > 0;
      if (hasPosList) {
        results.position.notes.push('岗位列表显示正常');
      }
      
      // 检查 CRUD 按钮
      const hasAddBtn = await page.locator('text=新增岗位, text=添加岗位, button:has-text("新增")').count() > 0;
      const hasEditBtn = await page.locator('text=编辑, [class*="edit"]').count() > 0;
      const hasDeleteBtn = await page.locator('text=删除, [class*="delete"]').count() > 0;
      
      if (hasAddBtn) results.position.notes.push('新增功能存在');
      if (hasEditBtn) results.position.notes.push('编辑功能存在');
      if (hasDeleteBtn) results.position.notes.push('删除功能存在');
      
      if (hasPosList) {
        results.position.status = '✅';
      }
    } catch (posError) {
      results.position.notes.push(`岗位管理测试异常：${posError.message}`);
    }
    
    // ========== 5. 角色权限测试 ==========
    console.log('=== 测试角色权限 ===');
    try {
      // 查找角色管理菜单
      const roleMenu = page.locator('text=角色管理, text=权限管理, [title*="角色"], .menu-item:has-text("角色")').first();
      await roleMenu.click({ timeout: 5000 });
      await page.waitForTimeout(3000);
      
      // 检查角色列表
      const hasRoleList = await page.locator('table, [class*="list"], text=角色名称, text=角色编码').count() > 0;
      if (hasRoleList) {
        results.role.notes.push('角色列表显示正常');
      }
      
      // 检查权限配置
      const hasPermissionConfig = await page.locator('text=权限, text=菜单权限, text=数据权限, [class*="permission"], [class*="auth"]').count() > 0;
      if (hasPermissionConfig) {
        results.role.notes.push('权限配置功能存在');
      }
      
      if (hasRoleList) {
        results.role.status = '✅';
      }
    } catch (roleError) {
      results.role.notes.push(`角色权限测试异常：${roleError.message}`);
    }
    
  } catch (error) {
    console.error('测试过程出错:', error);
  } finally {
    await browser.close();
  }
  
  // 输出结果
  console.log('\n========== 验收结果 ==========');
  console.log(JSON.stringify(results, null, 2));
  
  // 生成报告
  const report = generateReport(results);
  console.log('\n' + report);
  
})();

function generateReport(results) {
  let report = '# 产品需求验收报告\n\n## 功能验收\n| 模块 | 状态 | 备注 |\n|------|------|------|\n';
  
  for (const [module, data] of Object.entries(results)) {
    const moduleName = {
      login: '登录',
      department: '部门管理',
      employee: '员工管理',
      position: '岗位管理',
      role: '角色权限'
    }[module];
    report += `| ${moduleName} | ${data.status} | ${data.notes.join('; ')} |\n`;
  }
  
  report += '\n## 不符合项\n';
  const failedModules = Object.entries(results).filter(([_, data]) => data.status === '❌');
  if (failedModules.length > 0) {
    failedModules.forEach(([module, data]) => {
      report += `- ${module}: ${data.notes.join('; ')}\n`;
    });
  } else {
    report += '无\n';
  }
  
  report += '\n## 建议优化\n';
  report += '待详细测试后补充\n';
  
  report += '\n## 结论\n';
  const allPassed = Object.values(results).every(data => data.status === '✅');
  report += allPassed ? '通过' : '不通过';
  
  return report;
}
