// const puppeteer = require('puppeteer');
// const performance = require('performance-now');

// export default async function handler(req, res) {
//   const { name } = req.query;
//   const url = `https://www.dochord.com/search/?q=${name}#gsc.tab=0&gsc.q=${name}&gsc.page=1`;

//   try {
//     const startTime = performance();
//     const data = await fetchData(url);
//     const endTime = performance();
//     const elapsedTime = endTime - startTime;
//     console.log(`เวลาที่ใช้ในการโหลด: ${elapsedTime / 1000} วิ`);
//     data.push(`เวลาที่ใช้ในการโหลด: ${elapsedTime / 1000} มิลลิวินาที`);
//     res.status(200).json(data);
//   } catch (err) {
//     console.error('Puppeteer error:', err);
//     res.status(500).json({ message: 'Error performing Puppeteer operation' });
//   }
// }

// async function fetchData(url) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url);

//   const data = [];
//   const searchResultSelector = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div`;
//   const nameSelector = 'div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a';
//   const urlSelector = 'div.gs-webResult.gs-result > div.gsc-url-top > div.gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long';

//   const searchResults = await page.$$(searchResultSelector);

//   for (const result of searchResults) {
//     const nameElement = await result.$(nameSelector);
//     const urlElement = await result.$(urlSelector);

//     if (nameElement && urlElement) {
//       const name = await page.evaluate(nameElement => nameElement.textContent, nameElement);
//       const url = await page.evaluate(urlElement => urlElement.textContent, urlElement);

//       data.push({
//         name,
//         url,
//       });
//     }
//   }

//   await browser.close();
//   return data;
// }


const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  const { name } = req.query;
  const url = `https://www.dochord.com/search/?q=${name}#gsc.tab=0&gsc.q=${name}&gsc.page=1`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    let count = 1;
    const data = [];

    while (true) {
      const selectorName = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(${count}) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a`;
      const selectorURL = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(${count}) > div.gs-webResult.gs-result > div.gsc-url-top > div.gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long`;

      // Measure the loading time for the current item
      const startTime = performance.now();

      // Use Promise.all to wait for both selectors in parallel
      const [nameElement, urlElement] = await Promise.all([
        page.waitForSelector(selectorName),
        page.waitForSelector(selectorURL),
      ]);

      const textRequestName = await page.evaluate(nameElement => nameElement.textContent, nameElement);
      const textRequestURL = await page.evaluate(urlElement => urlElement.textContent, urlElement);

      data.push({
        name: textRequestName,
        url: textRequestURL,
      });

      const endTime = performance.now();
      const loadingTime = endTime - startTime;
      console.log(`Item ${count} loaded in ${loadingTime.toFixed(2)} ms`);

      count++;
      const nextSelector = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(${count}) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a`;

      const nextRequest = await page.$(nextSelector);
      if (!nextRequest) {
        break;
      }
    }

    await browser.close();
    res.status(200).json(data);
  } catch (err) {
    console.error('Puppeteer error:', err);
    res.status(500).json({ message: 'Error performing Puppeteer operation' });
  }
}
