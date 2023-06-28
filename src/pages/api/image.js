const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  // res.status(200).json('hello');

//   if (req.method === 'GET'){
//     try {
//       const browser = await puppeteer.launch({ headless: true });
//       const page = await browser.newPage();
//       await page.goto('https://www.dochord.com/132815/'); // เพิ่มการตั้งค่า timeout

//       //#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header__thumbnail > img
//       let element = await page.waitForSelector('#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header__thumbnail > img');
      
//       let image = await page.evaluate(element => element.src, element);
  
//       await browser.close();
//       res.status(200).json(image);
//     } catch (error) {
//       console.error('Puppeteer error:', error);
//       res.status(500).json({ message: 'Error performing Puppeteer operation' });
//     }
//   }

  if (req.method === 'GET') {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('https://www.dochord.com/132815/');

      //#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header__thumbnail > img
      const imageURL = await page.evaluate(() => {
        const imageElement = document.querySelector('#post-132815 > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header__thumbnail > img');
        return imageElement ? imageElement.src : null;
      });

      await browser.close();

      if (imageURL) {
        res.status(200).json(imageURL);
      } else {
        res.status(500).json({ message: 'Image URL not found' });
      }
    } catch (error) {
      console.error('Puppeteer error:', error);
      res.status(500).json({ message: 'Error performing Puppeteer operation' });
    }
  }

}
