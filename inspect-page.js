const puppeteer = require('puppeteer');

async function inspect() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('正在访问页面...');
  await page.goto('http://47.100.5.220:8082', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // 获取页面结构和所有颜色信息
  const info = await page.evaluate(() => {
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
    
    // 获取所有主要容器
    const containers = [];
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      const className = typeof el.className === 'string' ? el.className : (el.getAttribute?.('class') || '');
      const classes = className ? className.split(' ').filter(c => c.trim()) : [];
      const tagName = el.tagName.toLowerCase();
      const styles = window.getComputedStyle(el);
      
      // 只收集有背景色或重要样式的元素
      const bg = styles.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        containers.push({
          tag: tagName,
          classes: classes.slice(0, 5),
          bg: rgbToHex(bg),
          color: rgbToHex(styles.color),
          border: rgbToHex(styles.borderColor),
          id: el.id || ''
        });
      }
    });
    
    // 获取 body 样式
    const bodyStyles = {
      bg: rgbToHex(window.getComputedStyle(document.body).backgroundColor),
      color: rgbToHex(window.getComputedStyle(document.body).color)
    };
    
    // 获取所有链接
    const links = Array.from(document.querySelectorAll('a')).slice(0, 5).map(a => ({
      text: a.textContent?.slice(0, 20),
      color: rgbToHex(window.getComputedStyle(a).color)
    }));
    
    // 获取所有按钮
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]')).slice(0, 5).map(btn => {
      const className = typeof btn.className === 'string' ? btn.className : (btn.getAttribute?.('class') || '');
      return {
        text: btn.textContent?.slice(0, 20),
        classes: className ? className.split(' ').slice(0, 3) : [],
        bg: rgbToHex(window.getComputedStyle(btn).backgroundColor),
        color: rgbToHex(window.getComputedStyle(btn).color)
      };
    });
    
    // 获取所有输入框
    const inputs = Array.from(document.querySelectorAll('input, textarea')).slice(0, 5).map(input => {
      const className = typeof input.className === 'string' ? input.className : (input.getAttribute?.('class') || '');
      return {
        type: input.type || 'text',
        classes: className ? className.split(' ').slice(0, 3) : [],
        border: rgbToHex(window.getComputedStyle(input).borderColor),
        bg: rgbToHex(window.getComputedStyle(input).backgroundColor)
      };
    });
    
    return {
      bodyStyles,
      containers: containers.slice(0, 30),
      links,
      buttons,
      inputs,
      title: document.title
    };
  });
  
  await browser.close();
  
  console.log('\n=== 页面结构分析 ===\n');
  console.log('页面标题:', info.title);
  console.log('\nBody 样式:');
  console.log('  背景:', info.bodyStyles.bg);
  console.log('  文字:', info.bodyStyles.color);
  
  console.log('\n=== 主要容器 (有背景色的元素) ===');
  info.containers.forEach((c, i) => {
    console.log(`${i + 1}. <${c.tag}> ${c.id ? '#' + c.id : ''} ${c.classes.length ? '.' + c.classes.join('.') : ''}`);
    console.log(`   背景：${c.bg} | 文字：${c.color} | 边框：${c.border}`);
  });
  
  console.log('\n=== 按钮 ===');
  info.buttons.forEach((b, i) => {
    console.log(`${i + 1}. "${b.text}" - 类：${b.classes.join(' ')} | 背景：${b.bg} | 文字：${b.color}`);
  });
  
  console.log('\n=== 链接 ===');
  info.links.forEach((l, i) => {
    console.log(`${i + 1}. "${l.text}" - 颜色：${l.color}`);
  });
  
  console.log('\n=== 表单输入 ===');
  info.inputs.forEach((i, idx) => {
    console.log(`${idx + 1}. ${i.type} - 类：${i.classes.join(' ')} | 背景：${i.bg} | 边框：${i.border}`);
  });
}

inspect().catch(console.error);
