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

    //#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a
    //#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div.gs-webResult.gs-result > div.gsc-url-top > div.gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long

    while (true) {
      const selectorName = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(${count}) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a`;
      const selectorURL = `#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(${count}) > div.gs-webResult.gs-result > div.gsc-url-top > div.gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long`;
      const request = await page.waitForSelector(selectorName);
      const request2 = await page.waitForSelector(selectorURL);
      const textRequestName = await page.evaluate(request => request.textContent, request);
      const textRequestURL = await page.evaluate(request2 => request2.textContent, request2);
      data.push({
        name: textRequestName,
        url: textRequestURL})

        

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
