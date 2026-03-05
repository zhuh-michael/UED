const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // 测试访问
  await page.goto('http://47.100.5.220:8082');
  console.log('✅ 页面加载成功');
  
  // 截图
  await page.screenshot({ path: 'test-screenshot.png' });
  console.log('✅ 截图保存：test-screenshot.png');
  
  // 检查登录表单
  const title = await page.title();
  console.log('页面标题:', title);
  
  await browser.close();
  console.log('✅ 测试完成');
})();
