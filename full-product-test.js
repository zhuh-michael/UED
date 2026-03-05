const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  const report = {
    loginPage: { visual: '', interaction: '', issues: [] },
    departmentManagement: { visual: '', interaction: '', issues: [] },
    employeeManagement: { visual: '', interaction: '', issues: [] },
    positionManagement: { visual: '', interaction: '', issues: [] },
    rolePermission: { visual: '', interaction: '', issues: [] },
    overallScore: 0
  };
  
  const screenshots = [];
  
  try {
    // ========== 1. LOGIN PAGE ==========
    console.log('=== 1. Testing Login Page ===');
    await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/01-login.png' });
    screenshots.push('01-login.png');
    
    // Analyze login page
    const loginContent = await page.content();
    const hasLogo = await page.locator('img[src*="logo"], .logo, [class*="logo"]').count() > 0;
    const hasTitle = await page.locator('h1, h2, .title, [class*="title"]').count() > 0;
    const usernamePlaceholder = await page.locator('#username').getAttribute('placeholder');
    const passwordPlaceholder = await page.locator('#password').getAttribute('placeholder');
    const loginBtnText = await page.locator('.login-btn').textContent();
    
    console.log(`Logo: ${hasLogo}, Title: ${hasTitle}`);
    console.log(`Username placeholder: ${usernamePlaceholder}`);
    console.log(`Password placeholder: ${passwordPlaceholder}`);
    console.log(`Login button: ${loginBtnText}`);
    
    report.loginPage.visual = hasLogo ? '有品牌 Logo' : '缺少 Logo';
    report.loginPage.interaction = '表单清晰，有明确登录按钮';
    if (!hasLogo) report.loginPage.issues.push('缺少品牌 Logo 标识');
    if (loginBtnText.includes(' ')) report.loginPage.issues.push('登录按钮文字有多余空格');
    
    // Login
    console.log('=== Logging in ===');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');
    await page.locator('.login-btn').click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/02-dashboard.png' });
    screenshots.push('02-dashboard.png');
    
    console.log('Current URL:', page.url());
    
    // Get menu items
    const menuItems = await page.locator('.ant-menu-item, .menu-item, [role="menuitem"], a[class*="menu"]').all();
    console.log('Menu items found:', menuItems.length);
    for (let i = 0; i < Math.min(menuItems.length, 10); i++) {
      const text = await menuItems[i].textContent();
      console.log(`  Menu ${i}: ${text.trim()}`);
    }
    
    // ========== 2. DEPARTMENT MANAGEMENT ==========
    console.log('\n=== 2. Testing Department Management ===');
    const deptLink = page.locator('text=部门').first();
    if (await deptLink.count() > 0) {
      await deptLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/03-department.png' });
      screenshots.push('03-department.png');
      
      const hasTree = await page.locator('.ant-tree, [role="tree"], .tree').count() > 0;
      const hasAddBtn = await page.locator('button:has-text("新增"), button:has-text("添加"), .ant-btn:has-text("新")').count() > 0;
      const hasTable = await page.locator('table, .ant-table').count() > 0;
      
      console.log(`Has tree: ${hasTree}, Has add button: ${hasAddBtn}, Has table: ${hasTable}`);
      
      report.departmentManagement.visual = hasTree ? '树形结构清晰' : '未使用树形展示';
      report.departmentManagement.interaction = hasAddBtn ? '有新增按钮' : '缺少新增入口';
      if (!hasTree) report.departmentManagement.issues.push('部门应使用树形结构展示层级关系');
      if (!hasAddBtn) report.departmentManagement.issues.push('缺少新增部门按钮');
    } else {
      report.departmentManagement.issues.push('未找到部门管理入口');
    }
    
    // ========== 3. EMPLOYEE MANAGEMENT ==========
    console.log('\n=== 3. Testing Employee Management ===');
    const empLink = page.locator('text=员工').first();
    if (await empLink.count() > 0) {
      await empLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/04-employee.png' });
      screenshots.push('04-employee.png');
      
      const hasTable = await page.locator('table, .ant-table').count() > 0;
      const hasSearch = await page.locator('input[placeholder*="搜索"], input[placeholder*="姓名"], .ant-input-search').count() > 0;
      const hasAddBtn = await page.locator('button:has-text("新增"), button:has-text("添加")').count() > 0;
      const hasFilter = await page.locator('.ant-select, select, .filter').count() > 0;
      
      console.log(`Has table: ${hasTable}, Has search: ${hasSearch}, Has add: ${hasAddBtn}, Has filter: ${hasFilter}`);
      
      report.employeeManagement.visual = hasTable ? '列表展示规范' : '列表展示不规范';
      report.employeeManagement.interaction = hasSearch && hasFilter ? '支持搜索和筛选' : '筛选功能不完善';
      if (!hasTable) report.employeeManagement.issues.push('员工列表应使用表格展示');
      if (!hasSearch) report.employeeManagement.issues.push('缺少员工搜索功能');
      if (!hasAddBtn) report.employeeManagement.issues.push('缺少新增员工按钮');
    } else {
      report.employeeManagement.issues.push('未找到员工管理入口');
    }
    
    // ========== 4. POSITION MANAGEMENT ==========
    console.log('\n=== 4. Testing Position Management ===');
    const posLink = page.locator('text=岗位').first();
    if (await posLink.count() > 0) {
      await posLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/05-position.png' });
      screenshots.push('05-position.png');
      
      const hasList = await page.locator('table, .ant-table, ul, .list').count() > 0;
      const hasAddBtn = await page.locator('button:has-text("新增"), button:has-text("添加")').count() > 0;
      
      console.log(`Has list: ${hasList}, Has add: ${hasAddBtn}`);
      
      report.positionManagement.visual = hasList ? '列表展示清晰' : '展示方式需优化';
      report.positionManagement.interaction = hasAddBtn ? '功能完整' : '功能不完整';
      if (!hasList) report.positionManagement.issues.push('岗位列表展示不规范');
      if (!hasAddBtn) report.positionManagement.issues.push('缺少新增岗位按钮');
    } else {
      report.positionManagement.issues.push('未找到岗位管理入口');
    }
    
    // ========== 5. ROLE PERMISSION ==========
    console.log('\n=== 5. Testing Role Permission ===');
    const roleLink = page.locator('text=角色').first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/06-role.png' });
      screenshots.push('06-role.png');
      
      const hasRoleList = await page.locator('table, .ant-table').count() > 0;
      const hasPermissionConfig = await page.locator('input[type="checkbox"], .ant-checkbox, .permission').count() > 0;
      const hasAssignBtn = await page.locator('button:has-text("分配"), button:has-text("配置"), button:has-text("权限")').count() > 0;
      
      console.log(`Has role list: ${hasRoleList}, Has permission config: ${hasPermissionConfig}, Has assign: ${hasAssignBtn}`);
      
      report.rolePermission.visual = hasRoleList ? '角色列表规范' : '展示需优化';
      report.rolePermission.interaction = hasPermissionConfig ? '支持权限配置' : '权限配置功能缺失';
      if (!hasRoleList) report.rolePermission.issues.push('角色列表展示不规范');
      if (!hasPermissionConfig) report.rolePermission.issues.push('缺少权限配置界面');
      if (!hasAssignBtn) report.rolePermission.issues.push('缺少权限分配入口');
    } else {
      report.rolePermission.issues.push('未找到角色权限入口');
    }
    
    // Calculate overall score
    const allModules = [
      report.loginPage,
      report.departmentManagement,
      report.employeeManagement,
      report.positionManagement,
      report.rolePermission
    ];
    
    let totalIssues = 0;
    allModules.forEach(m => totalIssues += m.issues.length);
    
    // Score: 10 - (issues * 0.5), min 0
    report.overallScore = Math.max(0, Math.round((10 - totalIssues * 0.5) * 10) / 10);
    
    console.log('\n=== FINAL REPORT ===');
    console.log(JSON.stringify(report, null, 2));
    console.log('\nScreenshots:', screenshots);
    
    // Save report
    fs.writeFileSync('/root/.openclaw/workspace-manager/product-test-result.json', JSON.stringify(report, null, 2));
    fs.writeFileSync('/root/.openclaw/workspace-manager/screenshots-list.txt', screenshots.join('\n'));
    
  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/error.png' });
    fs.writeFileSync('/root/.openclaw/workspace-manager/product-test-error.txt', error.message);
  } finally {
    await browser.close();
  }
})();
