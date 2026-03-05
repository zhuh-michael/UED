const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Starting browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // Collect console messages
  const consoleErrors = [];
  const networkRequests = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text()
      });
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    consoleErrors.push({
      type: 'pageerror',
      text: error.message
    });
    console.log('PAGE ERROR:', error.message);
  });

  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  console.log('Navigating to http://47.100.5.220:8082...');
  await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle0', timeout: 30000 });
  
  console.log('Page loaded. Current URL:', page.url());
  const title = await page.title();
  console.log('Page title:', title);
  
  // Take a screenshot
  await page.screenshot({ path: '/root/.openclaw/workspace-manager/page-before-login.png', fullPage: true });
  console.log('Screenshot saved: page-before-login.png');
  
  // Get HTML to understand the login form
  const html = await page.content();
  console.log('Page HTML length:', html.length);
  
  // Look for login inputs
  console.log('Attempting to login...');
  
  // Try common login field selectors
  const usernameSelectors = ['input[name="username"]', 'input[name="account"]', 'input[name="user"]', '#username', '#account', 'input[type="text"]'];
  const passwordSelectors = ['input[name="password"]', '#password', 'input[type="password"]'];
  const loginButtonSelectors = ['button[type="submit"]', 'input[type="submit"]', '.login-btn', '#loginBtn', 'button:has-text("登录")', '.ant-btn'];
  
  let usernameFound = false;
  let passwordFound = false;
  
  for (const selector of usernameSelectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.type('admin');
        console.log('Username entered using selector:', selector);
        usernameFound = true;
        break;
      }
    } catch (e) {}
  }
  
  for (const selector of passwordSelectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.type('admin123');
        console.log('Password entered using selector:', selector);
        passwordFound = true;
        break;
      }
    } catch (e) {}
  }
  
  // Click login button
  for (const selector of loginButtonSelectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.click();
        console.log('Login button clicked using selector:', selector);
        break;
      }
    } catch (e) {}
  }
  
  // If no specific button found, try clicking any button
  if (!usernameFound || !passwordFound) {
    const buttons = await page.$$('button, input[type="submit"]');
    if (buttons.length > 0 && !usernameFound) {
      console.log('Fallback: clicking first button');
      await buttons[0].click();
    }
  }
  
  // Wait for navigation after login
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 15000 });
    console.log('Navigation detected after login');
  } catch (e) {
    console.log('No navigation detected after login click');
  }
  
  console.log('Current URL after login attempt:', page.url());
  
  // Take screenshot after login
  await page.screenshot({ path: '/root/.openclaw/workspace-manager/page-after-login.png', fullPage: true });
  console.log('Screenshot saved: page-after-login.png');
  
  // Look for navigation elements
  const navSelectors = ['nav a', '.nav a', '.menu a', '.sidebar a', '.ant-menu a', 'a[href]'];
  const navLinks = [];
  
  for (const selector of navSelectors) {
    try {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        for (const el of elements) {
          const href = await page.evaluate(el => el.href, el);
          const text = await page.evaluate(el => el.textContent?.trim().substring(0, 50), el);
          if (text || href) {
            navLinks.push({ selector, text, href });
          }
        }
        break;
      }
    } catch (e) {}
  }
  
  console.log('Found', navLinks.length, 'navigation links');
  navLinks.forEach((link, i) => {
    if (i < 10) {
      console.log(`  ${i}: "${link.text}" -> ${link.href}`);
    }
  });
  
  // Clear network requests before clicking nav
  networkRequests.length = 0;
  consoleErrors.length = 0;
  
  // Click navigation links
  console.log('\nClicking navigation links...');
  const clickedLinks = [];
  
  for (let i = 0; i < Math.min(5, navLinks.length); i++) {
    try {
      const link = navLinks[i];
      console.log(`Clicking nav link ${i}: "${link.text}"`);
      
      // Find the element again (in case page changed)
      const elements = await page.$$('a[href]');
      if (elements.length > i) {
        const hrefBefore = await page.evaluate(el => el.href, elements[i]);
        await elements[i].click();
        
        // Wait for potential navigation
        try {
          await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
          console.log('  Navigation triggered');
        } catch (e) {
          console.log('  No navigation triggered');
        }
        
        const hrefAfter = await page.url();
        clickedLinks.push({
          text: link.text,
          hrefBefore: hrefBefore,
          hrefAfter: hrefAfter,
          urlChanged: hrefBefore !== hrefAfter
        });
      }
    } catch (e) {
      console.log('Error clicking link', i, ':', e.message);
    }
  }
  
  // Take final screenshot
  await page.screenshot({ path: '/root/.openclaw/workspace-manager/page-after-nav-click.png', fullPage: true });
  console.log('Screenshot saved: page-after-nav-click.png');
  
  // Generate report
  console.log('\n========== 测试结果 ==========');
  console.log('\n## 浏览器控制台错误');
  if (consoleErrors.length === 0) {
    console.log('无 JavaScript 错误');
  } else {
    consoleErrors.forEach(err => {
      console.log(`- [${err.type}] ${err.text}`);
    });
  }
  
  console.log('\n## Network 请求');
  if (networkRequests.length === 0) {
    console.log('点击导航时没有发出网络请求');
  } else {
    // Show unique requests
    const uniqueUrls = [...new Set(networkRequests.map(r => r.url))];
    uniqueUrls.slice(0, 20).forEach(url => {
      const reqs = networkRequests.filter(r => r.url === url);
      console.log(`- ${reqs[0].method} ${reqs[0].resourceType}: ${url}`);
    });
    if (uniqueUrls.length > 20) {
      console.log(`... 还有 ${uniqueUrls.length - 20} 个请求`);
    }
  }
  
  console.log('\n## 结论');
  if (consoleErrors.length > 0) {
    console.log('【发现问题】控制台存在 JavaScript 错误，可能是路由问题的直接原因');
  } else if (networkRequests.length === 0) {
    console.log('【发现问题】点击导航时没有发出任何网络请求，可能是：');
    console.log('  1. 导航点击事件未正确绑定');
    console.log('  2. 前端路由配置问题（SPA 路由）');
    console.log('  3. JavaScript 代码阻止了默认行为');
  } else {
    console.log('【部分正常】导航点击有请求发出，但需要检查：');
    console.log('  1. 请求是否返回正确数据');
    console.log('  2. 前端是否正确处理响应并更新视图');
  }
  
  // Write detailed results
  const results = {
    timestamp: new Date().toISOString(),
    initialUrl: 'http://47.100.5.220:8082',
    finalUrl: page.url(),
    pageTitle: title,
    consoleErrors,
    networkRequests,
    clickedLinks,
    navLinksFound: navLinks.length
  };
  
  fs.writeFileSync('/root/.openclaw/workspace-manager/debug-results.json', JSON.stringify(results, null, 2));
  console.log('\n详细结果已保存至：debug-results.json');
  
  await browser.close();
  console.log('Browser closed');
})();
