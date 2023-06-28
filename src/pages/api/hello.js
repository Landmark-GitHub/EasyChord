const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  // res.status(200).json('hello');

  if (req.method === 'GET'){
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('https://www.dochord.com/132815/'); // เพิ่มการตั้งค่า timeout
      
      // ดำเนินการอื่น ๆ กับ Puppeteer
      //#post-132815 > section:nth-child(1) > div > div > div.single-cover-header
      //#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1

      let element = await page.waitForSelector('#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1');
      
      let text = await page.evaluate(element => element.textContent, element);
  
      await browser.close();
      res.status(200).json(text);
    } catch (error) {
      console.error('Puppeteer error:', error);
      res.status(500).json({ message: 'Error performing Puppeteer operation' });
    }
  }

}
