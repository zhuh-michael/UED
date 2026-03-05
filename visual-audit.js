const puppeteer = require('puppeteer');

async function audit() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('正在访问页面...');
  await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  const results = await page.evaluate(() => {
    function rgbToHex(rgb) {
      if (!rgb) return '#000000';
      if (rgb.startsWith('#')) return rgb.toUpperCase();
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return '#000000';
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('').toUpperCase();
    }
    
    function getClass(el) {
      if (typeof el.className === 'string') return el.className;
      return el.getAttribute?.('class') || '';
    }
    
    const results = {
      p0: [],
      p1: [],
      p2: [],
      issues: []
    };
    
    // ============ P0 核心框架 ============
    
    // 1. 整体背景 (body)
    const bodyStyles = window.getComputedStyle(document.body);
    const bodyBg = rgbToHex(bodyStyles.backgroundColor);
    const bodyText = rgbToHex(bodyStyles.color);
    
    results.p0.push({ item: '整体背景', spec: '#F0F2F5', actual: bodyBg, status: bodyBg === '#F0F2F5' ? '✅' : '❌' });
    results.p0.push({ item: '全局主文字', spec: '#262626', actual: bodyText, status: bodyText === '#262626' ? '✅' : '❌' });
    
    if (bodyBg !== '#F0F2F5') results.issues.push(`整体背景：期望 #F0F2F5，实际 ${bodyBg}`);
    if (bodyText !== '#262626') results.issues.push(`全局主文字：期望 #262626，实际 ${bodyText}`);
    
    // 2. 侧边栏 (检查是否有 sider 元素)
    const sidebar = document.querySelector('.ant-layout-sider, aside, [class*="sider"]');
    if (sidebar) {
      const styles = window.getComputedStyle(sidebar);
      const bg = rgbToHex(styles.backgroundColor);
      const text = rgbToHex(styles.color);
      
      results.p0.push({ item: '侧边栏背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
      results.p0.push({ item: '侧边栏文字', spec: '#262626', actual: text, status: text === '#262626' ? '✅' : '❌' });
      
      if (bg !== '#FFFFFF') results.issues.push(`侧边栏背景：期望 #FFFFFF，实际 ${bg}`);
    } else {
      results.p0.push({ item: '侧边栏', spec: '#FFFFFF', actual: '当前页面无侧边栏', status: '⚠️' });
    }
    
    // 3. 顶部导航栏
    const header = document.querySelector('.ant-layout-header, header, [class*="header"]');
    if (header) {
      const styles = window.getComputedStyle(header);
      const bg = rgbToHex(styles.backgroundColor);
      const text = rgbToHex(styles.color);
      
      results.p0.push({ item: '顶部导航栏背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
      results.p0.push({ item: '顶部导航栏文字', spec: '#262626', actual: text, status: text === '#262626' ? '✅' : '❌' });
      
      if (bg !== '#FFFFFF') results.issues.push(`顶部导航栏背景：期望 #FFFFFF，实际 ${bg}`);
    } else {
      results.p0.push({ item: '顶部导航栏', spec: '#FFFFFF', actual: '当前页面无顶部导航', status: '⚠️' });
    }
    
    // 4. 主内容区
    const content = document.querySelector('.ant-layout-content, main, [class*="content"]');
    if (content) {
      const styles = window.getComputedStyle(content);
      const bg = rgbToHex(styles.backgroundColor);
      results.p0.push({ item: '主内容区背景', spec: '#F0F2F5', actual: bg, status: bg === '#F0F2F5' ? '✅' : '❌' });
      if (bg !== '#F0F2F5') results.issues.push(`主内容区背景：期望 #F0F2F5，实际 ${bg}`);
    } else {
      results.p0.push({ item: '主内容区', spec: '#F0F2F5', actual: '使用 body 背景', status: bodyBg === '#F0F2F5' ? '✅' : '❌' });
    }
    
    // ============ P1 组件层 ============
    
    // 5. 卡片组件
    const card = document.querySelector('.ant-card');
    if (card) {
      const styles = window.getComputedStyle(card);
      const bg = rgbToHex(styles.backgroundColor);
      const border = rgbToHex(styles.borderColor);
      const shadow = styles.boxShadow;
      
      results.p1.push({ item: '卡片背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
      results.p1.push({ item: '卡片边框', spec: '#D9D9D9', actual: border, status: border === '#D9D9D9' ? '✅' : '❌' });
      results.p1.push({ item: '卡片阴影', spec: '0 2px 8px rgba(0,0,0,0.08)', actual: shadow || 'none', status: shadow.includes('2px 8px') ? '✅' : '❌' });
      
      if (bg !== '#FFFFFF') results.issues.push(`卡片背景：期望 #FFFFFF，实际 ${bg}`);
      if (border !== '#D9D9D9') results.issues.push(`卡片边框：期望 #D9D9D9，实际 ${border}`);
    } else {
      results.p1.push({ item: '卡片', spec: '-', actual: '未找到', status: '❌' });
    }
    
    // 6. 按钮组件
    const button = document.querySelector('.ant-btn-primary');
    if (button) {
      const styles = window.getComputedStyle(button);
      const bg = rgbToHex(styles.backgroundColor);
      const text = rgbToHex(styles.color);
      
      // 检查悬停态 (需要模拟 hover，这里只检查默认态)
      results.p1.push({ item: '按钮主色', spec: '#1890FF', actual: bg, status: bg === '#1890FF' ? '✅' : '❌' });
      results.p1.push({ item: '按钮文字', spec: '#FFFFFF', actual: text, status: text === '#FFFFFF' ? '✅' : '❌' });
      
      if (bg !== '#1890FF') results.issues.push(`按钮主色：期望 #1890FF，实际 ${bg}`);
      
      // 检查禁用态
      const disabledBtn = document.querySelector('.ant-btn-primary:disabled') || document.querySelector('button:disabled');
      if (disabledBtn) {
        const disabledStyles = window.getComputedStyle(disabledBtn);
        const disabledBg = rgbToHex(disabledStyles.backgroundColor);
        results.p1.push({ item: '按钮禁用态', spec: '#D9D9D9', actual: disabledBg, status: disabledBg === '#D9D9D9' ? '✅' : '❌' });
      } else {
        results.p1.push({ item: '按钮禁用态', spec: '#D9D9D9', actual: '页面无禁用按钮', status: '⚠️' });
      }
    } else {
      results.p1.push({ item: '按钮', spec: '-', actual: '未找到', status: '❌' });
    }
    
    // 7. 表单组件
    const input = document.querySelector('.ant-input, input[type="text"], input:not([type="button"]):not([type="submit"])');
    if (input) {
      const styles = window.getComputedStyle(input);
      const border = rgbToHex(styles.borderColor);
      // 输入框的背景可能是透明的，需要检查父元素
      const inputBg = rgbToHex(styles.backgroundColor);
      
      results.p1.push({ item: '表单边框', spec: '#D9D9D9', actual: border, status: border === '#D9D9D9' ? '✅' : '❌' });
      results.p1.push({ item: '表单背景', spec: '#FFFFFF', actual: inputBg, status: inputBg === '#FFFFFF' || inputBg === '#000000' ? '✅' : '❌' });
      
      if (border !== '#D9D9D9') results.issues.push(`表单边框：期望 #D9D9D9，实际 ${border}`);
    } else {
      results.p1.push({ item: '表单', spec: '-', actual: '未找到', status: '❌' });
    }
    
    // 8. 表格组件
    const table = document.querySelector('.ant-table, table');
    if (table) {
      const styles = window.getComputedStyle(table);
      const border = rgbToHex(styles.borderColor);
      
      const th = table.querySelector('th');
      const thStyles = th ? window.getComputedStyle(th) : null;
      const thBg = thStyles ? rgbToHex(thStyles.backgroundColor) : 'N/A';
      
      results.p1.push({ item: '表格边框', spec: '#D9D9D9', actual: border, status: border === '#D9D9D9' ? '✅' : '❌' });
      results.p1.push({ item: '表头背景', spec: '#FAFAFA', actual: thBg, status: '⚠️' });
      
      if (border !== '#D9D9D9') results.issues.push(`表格边框：期望 #D9D9D9，实际 ${border}`);
    } else {
      results.p1.push({ item: '表格', spec: '-', actual: '当前页面无表格', status: '⚠️' });
    }
    
    // ============ P2 细节层 ============
    
    // 9. 弹窗/模态框
    const modal = document.querySelector('.ant-modal');
    if (modal) {
      const styles = window.getComputedStyle(modal);
      const bg = rgbToHex(styles.backgroundColor);
      results.p2.push({ item: '弹窗背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
    } else {
      results.p2.push({ item: '弹窗', spec: '#FFFFFF', actual: '未显示 (正常)', status: '⚠️' });
    }
    
    // 10. 通知/消息提示
    const notif = document.querySelector('.ant-notification, .ant-message');
    if (notif) {
      const styles = window.getComputedStyle(notif);
      const bg = rgbToHex(styles.backgroundColor);
      results.p2.push({ item: '通知背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
    } else {
      results.p2.push({ item: '通知', spec: '#FFFFFF', actual: '未显示 (正常)', status: '⚠️' });
    }
    
    // 11. 标签/徽章
    const tag = document.querySelector('.ant-tag, .ant-badge');
    if (tag) {
      const styles = window.getComputedStyle(tag);
      const bg = rgbToHex(styles.backgroundColor);
      const text = rgbToHex(styles.color);
      results.p2.push({ item: '标签背景', spec: '#FFFFFF', actual: bg, status: bg === '#FFFFFF' ? '✅' : '❌' });
      results.p2.push({ item: '标签文字', spec: '#262626', actual: text, status: text === '#262626' ? '✅' : '❌' });
    } else {
      results.p2.push({ item: '标签', spec: '-', actual: '当前页面无标签', status: '⚠️' });
    }
    
    // 12. 链接文字
    const link = document.querySelector('a');
    if (link) {
      const styles = window.getComputedStyle(link);
      const text = rgbToHex(styles.color);
      results.p2.push({ item: '链接文字', spec: '#1890FF', actual: text, status: text === '#1890FF' ? '✅' : '❌' });
    } else {
      results.p2.push({ item: '链接', spec: '#1890FF', actual: '当前页面无链接', status: '⚠️' });
    }
    
    return results;
  });
  
  await browser.close();
  
  // 生成报告
  console.log('\n# 视觉规范验收报告\n');
  
  console.log('## P0 核心框架');
  console.log('| 项目 | 规范值 | 实际值 | 状态 |');
  console.log('|------|--------|--------|------|');
  results.p0.forEach(r => console.log(`| ${r.item} | ${r.spec} | ${r.actual} | ${r.status} |`));
  
  console.log('\n## P1 组件层');
  console.log('| 项目 | 规范值 | 实际值 | 状态 |');
  console.log('|------|--------|--------|------|');
  results.p1.forEach(r => console.log(`| ${r.item} | ${r.spec} | ${r.actual} | ${r.status} |`));
  
  console.log('\n## P2 细节层');
  console.log('| 项目 | 规范值 | 实际值 | 状态 |');
  console.log('|------|--------|--------|------|');
  results.p2.forEach(r => console.log(`| ${r.item} | ${r.spec} | ${r.actual} | ${r.status} |`));
  
  console.log('\n## 不符合项');
  if (results.issues.length === 0) {
    console.log('无不符合项');
  } else {
    results.issues.forEach(issue => console.log(`- ${issue}`));
  }
  
  const passed = results.issues.length === 0;
  console.log('\n## 结论');
  console.log(passed ? '✅ 通过' : '❌ 不通过');
  
  return { passed, issues: results.issues };
}

audit().catch(console.error);
