const puppeteer = require('puppeteer');

async function loaddata(id, page) {
  try {

    const nameSelector = `#post-${id} > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1`;
    const keySelector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > div`;
    const chordSelector = `#post-${id} > section:nth-child(2) > div.archive-desc > p`;
    const capoSelector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__desc`
    const mucicSelector = `#col1 > div > p:nth-child(2)`

    const [nameElement, keyElement, chordElement, capoElement, mucicElement] = await Promise.all([
      page.waitForSelector(nameSelector),
      page.waitForSelector(keySelector),
      page.waitForSelector(chordSelector),
      page.waitForSelector(capoSelector),
      page.waitForSelector(mucicSelector)
    ]);

    const name = await page.evaluate(element => element.textContent, nameElement);
    const key = await page.evaluate(element => element.textContent, keyElement);
    const chordText = await page.evaluate(element => element.textContent, chordElement);
    const capo = await page.evaluate(element => element.textContent, capoElement);
    const music = await page.evaluate(element => element.textContent, mucicElement);

    const chord = chordText.split(', ').map(i => i.replace('คอร์ด ', ''));

    // await browser.close();

    return {
      name,
      key,
      chord,
      capo,
      music
    };

  } catch (error) {
    console.error('Puppeteer error:', error);
    throw new Error('Error performing Puppeteer operation');
  }
}

async function addkey(id, page) {
  let selector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > a.single-key__select-plus`
  const [response] = await Promise.all([
    page.click(selector),
  ]);
}

async function reducekey(id, page) {
  let selector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > a.single-key__select-minus`
  
  const [response] = await Promise.all([
    // page.waitForNavigation(waitOptions),
    page.click(selector),
  ]);
}

export default async function handler(req, res) {
  const { id, key, count } = req.query;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.dochord.com/${id}/`, { timeout: 30000 });

  let data;

  if (req.method === 'GET') {
    if (!id) {
      res.status(200).json("NOT ID");
    } 
    else if (id && !key && !count) {
      try {
        data = await loaddata(id, page,{timeout:30000});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    else if (id && key && count) {

      try {
        if (key === 'Addkey') {
          for (var i = 0; i < count; i++) {
            await addkey(id, page); 
          } 
        } else if (key === 'Reducekey') {
          for (var i = 0; i < count; i++) {
            await reducekey(id, page);
          }
        }
        data = await loaddata(id, page,{timeout:30000});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      
    }
  } 
  // else if (req.method === 'PUT') {
  //   if (key === 'Addkey') {
  //     try {
  //       await addkey(id, page, { timeout: 30000 });
  //       res.status(200).json({ message: 'Addkey successfully added OKK ADDKEY +' });
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   } else if (key === 'Reducekey') {
  //     try {
  //       await reducekey(id, page, { timeout: 30000 });
  //       res.status(200).json({ message: 'Reducekey successfully added OKK ADDKEY -' });
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   }
  // }
}
