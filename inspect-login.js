const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Get all inputs and buttons
    const inputs = await page.locator('input').all();
    const buttons = await page.locator('button').all();
    
    console.log('=== INPUTS ===');
    for (let i = 0; i < inputs.length; i++) {
      const type = await inputs[i].getAttribute('type');
      const placeholder = await inputs[i].getAttribute('placeholder');
      const name = await inputs[i].getAttribute('name');
      const id = await inputs[i].getAttribute('id');
      console.log(`Input ${i}: type=${type}, placeholder=${placeholder}, name=${name}, id=${id}`);
    }
    
    console.log('\n=== BUTTONS ===');
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const className = await buttons[i].getAttribute('class');
      console.log(`Button ${i}: text="${text}", class=${className}`);
    }
    
    // Get page content for analysis
    const content = await page.content();
    console.log('\n=== PAGE CONTENT (first 5000 chars) ===');
    console.log(content.substring(0, 5000));
    
    await page.screenshot({ path: '/root/.openclaw/workspace-manager/screenshots/login-inspect.png' });
    console.log('\nScreenshot saved to login-inspect.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
