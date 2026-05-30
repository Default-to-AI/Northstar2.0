const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: 'new', 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));

    await page.goto('http://localhost:3000/insights/AAPL', { waitUntil: 'networkidle0', timeout: 15000 });
    
    if (errors.length > 0) {
      console.log('BROWSER ERRORS:', JSON.stringify(errors, null, 2));
    } else {
      console.log('No errors found.');
    }
    
    await browser.close();
  } catch(e) {
    console.log('Script exception:', e.message);
  }
  process.exit(0);
})();
