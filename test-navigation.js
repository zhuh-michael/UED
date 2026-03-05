const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Starting navigation test...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  const networkRequests = [];
  const navigationResults = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text()
      });
      console.log('CONSOLE ERROR:', msg.text().substring(0, 200));
    }
  });
  
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: Date.now()
    });
  });
  
  page.on('pageerror', error => {
    consoleErrors.push({
      type: 'pageerror',
      text: error.message
    });
    console.log('PAGE ERROR:', error.message);
  });

  // Login
  console.log('1. 访问登录页面...');
  await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle0', timeout: 30000 });
  
  console.log('2. 登录 (admin/admin123)...');
  await page.type('#username', 'admin');
  await page.type('#password', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 15000 });
  
  console.log('3. 登录成功，当前 URL:', page.url());
  
  // Get initial page content
  const initialContent = await page.content();
  const initialTitle = await page.title();
  console.log('   初始页面标题:', initialTitle);
  console.log('   初始页面内容长度:', initialContent.length);
  
  // Clear requests before testing navigation
  networkRequests.length = 0;
  const requestsBeforeNav = 0;
  
  // Test each menu item
  const menuItems = [
    { name: '首页', expectedRoute: '/dashboard' },
    { name: '消息', expectedRoute: '/chat' },
    { name: '邮件', expectedRoute: '/email' },
    { name: '部门', expectedRoute: '/department' },
    { name: '员工', expectedRoute: '/employee' },
    { name: '视频', expectedRoute: '/video' },
    { name: '设置', expectedRoute: '/settings' }
  ];
  
  console.log('\n4. 开始测试导航点击...\n');
  
  for (const menuItem of menuItems) {
    console.log(`--- 测试：${menuItem.name} ---`);
    
    const requestsBeforeClick = networkRequests.length;
    const urlBefore = page.url();
    const contentBefore = await page.content();
    
    // Click the menu item
    try {
      // Find menu item by text
      const menuSelector = `.ant-menu-item:has-text("${menuItem.name}")`;
      let element = await page.$(menuSelector);
      
      if (!element) {
        // Try alternative selector
        const elements = await page.$$eval('.ant-menu-item', items => {
          return items.map((el, i) => ({
            index: i,
            text: el.textContent?.trim()
          }));
        });
        
        const foundIndex = elements.findIndex(item => item.text === menuItem.name);
        if (foundIndex >= 0) {
          element = await page.$$(`.ant-menu-item`).then(els => els[foundIndex]);
        }
      }
      
      if (element) {
        await element.click();
        console.log('   点击成功');
        
        // Wait for potential navigation
        let navigationOccurred = false;
        try {
          await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 3000 });
          navigationOccurred = true;
          console.log('   检测到页面导航');
        } catch (e) {
          console.log('   未检测到页面导航事件');
        }
        
        // Check URL change
        const urlAfter = page.url();
        const urlChanged = urlBefore !== urlAfter;
        console.log(`   URL: ${urlBefore} -> ${urlAfter}`);
        console.log(`   URL 变化：${urlChanged ? '是' : '否'}`);
        
        // Check content change
        const contentAfter = await page.content();
        const contentChanged = contentBefore !== contentAfter;
        console.log(`   内容变化：${contentChanged ? '是' : '否'} (${contentAfter.length} chars)`);
        
        // Check requests
        const requestsAfterClick = networkRequests.length - requestsBeforeClick;
        console.log(`   发出请求数：${requestsAfterClick}`);
        
        // Get page title
        const titleAfter = await page.title();
        console.log(`   页面标题：${titleAfter}`);
        
        navigationResults.push({
          menuItem: menuItem.name,
          urlBefore,
          urlAfter,
          urlChanged,
          contentChanged,
          requestsCount: requestsAfterClick,
          titleAfter,
          navigationDetected: navigationOccurred
        });
        
      } else {
        console.log('   未找到菜单项元素');
        navigationResults.push({
          menuItem: menuItem.name,
          error: '元素未找到'
        });
      }
    } catch (e) {
      console.log('   点击错误:', e.message);
      navigationResults.push({
        menuItem: menuItem.name,
        error: e.message
      });
    }
    
    console.log('');
  }
  
  // Take final screenshot
  await page.screenshot({ path: '/root/.openclaw/workspace-manager/final-navigation-test.png', fullPage: true });
  console.log('截图已保存');
  
  // Generate report
  console.log('\n========================================');
  console.log('          浏览器调试报告');
  console.log('========================================\n');
  
  console.log('## 浏览器控制台错误');
  if (consoleErrors.length === 0) {
    console.log('无 JavaScript 执行错误');
  } else {
    consoleErrors.forEach(err => {
      console.log(`- [${err.type}] ${err.text}`);
    });
  }
  console.log('');
  
  console.log('## Network 请求');
  if (networkRequests.length === 0) {
    console.log('点击导航时没有发出任何网络请求');
    console.log('(这是 SPA 前端路由的典型特征)');
  } else {
    const uniqueUrls = [...new Set(networkRequests.map(r => r.url))];
    console.log(`共发出 ${networkRequests.length} 个请求，${uniqueUrls.length} 个唯一 URL:`);
    uniqueUrls.slice(0, 10).forEach(url => {
      const reqs = networkRequests.filter(r => r.url === url);
      console.log(`  - ${reqs[0].method} ${reqs[0].resourceType}: ${url}`);
    });
  }
  console.log('');
  
  console.log('## 导航测试结果');
  navigationResults.forEach(result => {
    if (result.error) {
      console.log(`- ${result.menuItem}: ❌ ${result.error}`);
    } else {
      const status = result.urlChanged ? '✅' : '⚠️';
      console.log(`- ${result.menuItem}: ${status} URL 变化=${result.urlChanged}, 内容变化=${result.contentChanged}, 请求数=${result.requestsCount}`);
    }
  });
  console.log('');
  
  console.log('## 结论');
  console.log('');
  
  if (consoleErrors.length > 0) {
    console.log('【发现问题】控制台存在 JavaScript 错误，这可能是路由问题的原因。');
    console.log('建议：修复控制台中的 JS 错误。');
  } else if (networkRequests.length === 0) {
    console.log('【正常行为】这是 SPA（单页应用）的典型特征：');
    console.log('  - 使用前端路由（如 vue-router/react-router）');
    console.log('  - URL 变化但不发出网络请求');
    console.log('  - 页面内容通过 JavaScript 动态更新');
    console.log('');
    console.log('【需要检查】如果用户反馈"点击无反应"，可能的问题是：');
    console.log('  1. 前端路由配置错误，导致组件未正确渲染');
    console.log('  2. 路由守卫/权限检查阻止了页面切换');
    console.log('  3. 组件加载失败但无错误提示');
    console.log('  4. CSS 样式问题导致内容不可见');
    console.log('');
    console.log('【建议排查】');
    console.log('  1. 检查 Vue/React 路由配置');
    console.log('  2. 检查路由守卫 (beforeEach/CanActivate)');
    console.log('  3. 在浏览器 Console 中查看组件渲染日志');
    console.log('  4. 检查页面元素是否存在但被隐藏 (display:none)');
  } else {
    console.log('【正常】导航点击正常发出请求，路由工作正常。');
  }
  
  // Save results
  const finalReport = {
    timestamp: new Date().toISOString(),
    consoleErrors,
    networkRequests,
    navigationResults,
    summary: {
      totalMenuItems: menuItems.length,
      successfulNavigations: navigationResults.filter(r => !r.error && r.urlChanged).length,
      failedNavigations: navigationResults.filter(r => r.error || !r.urlChanged).length,
      hasConsoleErrors: consoleErrors.length > 0,
      hasNetworkRequests: networkRequests.length > 0
    }
  };
  
  fs.writeFileSync('/root/.openclaw/workspace-manager/navigation-test-report.json', JSON.stringify(finalReport, null, 2));
  console.log('\n详细报告已保存至：navigation-test-report.json');
  
  await browser.close();
  console.log('\nBrowser closed. 测试完成!');
})();
