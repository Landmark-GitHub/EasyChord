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
      //#post-132815 > section:nth-child(4) > div.single-key > div.single-key__select > div
      const elementName = await page.waitForSelector('#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1');
      const textName = await page.evaluate(elementName => elementName.textContent, elementName);

      const elementKey = await page.waitForSelector('#post-132815 > section:nth-child(4) > div.single-key > div.single-key__select > div')
      const textKey = await page.evaluate(elementKey => elementKey.textContent, elementKey);

      //#post-132815 > section:nth-child(2) > div.panel2.table-chord > div > div
      //#builder_0 > svg > text:nth-child(3) > tspan
      //#post-132815 > section:nth-child(2) > div.panel2.table-chord > div > div > div > div > div > svg > text:nth-child > tspan
      //#post-132815 > section:nth-child(2) > div.panel2.table-chord > div
      //#post-132815 > section:nth-child(2) > div.panel2.table-chord > div > div
      //#post-132815 > section:nth-child(2) > div.archive-desc > p
      const elementChord = await page.waitForSelector('#post-132815 > section:nth-child(2) > div.archive-desc > p')
      const temp = (await page.evaluate(elementChord => elementChord.textContent, elementChord));
      const textChord = temp.split(", ").map((i) => i.replace("คอร์ด ", ""))

      const data = {
        name: textName ,
        key: textKey,
        chord: textChord,
    }

      await browser.close();
      res.status(200).json(data);
    } catch (error) {
      console.error('Puppeteer error:', error);
      res.status(500).json({ message: 'Error performing Puppeteer operation' });
    }
  }

}
