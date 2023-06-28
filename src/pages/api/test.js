import puppeteer from 'puppeteer';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.dochord.com/132815/');

    await page.waitForSelector('#post-132815 > section:nth-child(5) > div > div');

    // ดึงข้อมูลของส่วนที่ต้องการจับภาพหน้าจอ
    //#post-132815 > section:nth-child(5) > div > div
    //#post-362322 > section:nth-child(5) > div
    const elementHandle = await page.$('#post-132815 > section:nth-child(5) > div');
    
    // ขนาดของส่วนที่ต้องการจับภาพหน้าจอ
    const screenshotOptions = {
      path: 'screenshot.png',
      clip: await elementHandle.boundingBox()
    };

    // สร้างสกรีนช็อตเฉพาะส่วน
    await page.screenshot(screenshotOptions);
    
    // อ่านไฟล์ภาพที่ถูกสร้างขึ้น
    const imageBuffer = await fs.promises.readFile('screenshot.png');
    
    // แปลงภาพให้อยู่ในรูปแบบ Base64
    const base64Image = imageBuffer.toString('base64');
    
    // สร้าง URL ของภาพ
    const imageURL = `data:image/png;base64,${base64Image}`;

    res.status(200).json(imageURL);
    
    // ปิดเบราว์เซอร์
    await browser.close();
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ message: 'Error performing Puppeteer operation' });
  }
}
