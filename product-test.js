const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const results = {
    loginPage: {},
    departmentManagement: {},
    employeeManagement: {},
    positionManagement: {},
    rolePermission: {},
    screenshots: []
  };
  
  try {
    // 1. Login Page
    console.log('=== Testing Login Page ===');
    await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/01-login.png' });
    
    results.loginPage = {
      url: page.url(),
      title: await page.title(),
      hasUsernameField: await page.locator('input[type="text"], input[type="email"], input[name="username"], input[name="account"]').count() > 0,
      hasPasswordField: await page.locator('input[type="password"]').count() > 0,
      hasLoginButton: await page.locator('button:has-text("登录"), button:has-text("login"), input[type="submit"]').count() > 0,
      html: await page.content()
    };
    console.log('Login page loaded:', results.loginPage.title);
    
    // 2. Login
    console.log('=== Logging in ===');
    const usernameInput = page.locator('input[type="text"], input[name="username"], input[name="account"], input[id="username"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const loginButton = page.locator('button:has-text("登录"), button:has-text("Login"), input[type="submit"]').first();
    
    await usernameInput.fill('admin');
    await passwordInput.fill('admin123');
    await loginButton.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/02-after-login.png' });
    
    console.log('Current URL after login:', page.url());
    
    // 3. Department Management
    console.log('=== Testing Department Management ===');
    const deptLink = page.locator('a:has-text("部门"), a:has-text("部门管理"), li:has-text("部门"), .menu-item:has-text("部门")').first();
    if (await deptLink.count() > 0) {
      await deptLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/03-department.png' });
      results.departmentManagement = {
        hasTree: await page.locator('.ant-tree, .tree, [role="tree"]').count() > 0,
        hasAddButton: await page.locator('button:has-text("新增"), button:has-text("添加"), .ant-btn:has-text("新")').count() > 0,
        hasEditButton: await page.locator('button:has-text("编辑"), .ant-btn-icon:has-text("edit")').count() > 0,
        hasDeleteButton: await page.locator('button:has-text("删除"), .ant-btn-icon:has-text("delete")').count() > 0,
        html: await page.content()
      };
    }
    
    // 4. Employee Management
    console.log('=== Testing Employee Management ===');
    const empLink = page.locator('a:has-text("员工"), a:has-text("员工管理"), li:has-text("员工"), .menu-item:has-text("员工")').first();
    if (await empLink.count() > 0) {
      await empLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/04-employee.png' });
      results.employeeManagement = {
        hasTable: await page.locator('table, .ant-table, .table').count() > 0,
        hasFilter: await page.locator('input[placeholder*="搜索"], .ant-input-search, .filter').count() > 0,
        hasAddButton: await page.locator('button:has-text("新增"), button:has-text("添加")').count() > 0,
        html: await page.content()
      };
    }
    
    // 5. Position Management
    console.log('=== Testing Position Management ===');
    const posLink = page.locator('a:has-text("岗位"), a:has-text("岗位管理"), li:has-text("岗位"), .menu-item:has-text("岗位")').first();
    if (await posLink.count() > 0) {
      await posLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/05-position.png' });
      results.positionManagement = {
        hasList: await page.locator('table, .ant-table, .list, ul').count() > 0,
        hasAddButton: await page.locator('button:has-text("新增"), button:has-text("添加")').count() > 0,
        html: await page.content()
      };
    }
    
    // 6. Role Permission
    console.log('=== Testing Role Permission ===');
    const roleLink = page.locator('a:has-text("角色"), a:has-text("权限"), a:has-text("角色权限"), li:has-text("角色"), .menu-item:has-text("角色"), .menu-item:has-text("权限")').first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/06-role.png' });
      results.rolePermission = {
        hasRoleList: await page.locator('table, .ant-table, .list').count() > 0,
        hasPermissionConfig: await page.locator('input[type="checkbox"], .ant-checkbox, .permission').count() > 0,
        html: await page.content()
      };
    }
    
    console.log('\n=== Test Results ===');
    console.log(JSON.stringify(results, null, 2));
    
  } catch (error) {
    console.error('Error during test:', error.message);
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/error.png' });
  } finally {
    await browser.close();
  }
})();
