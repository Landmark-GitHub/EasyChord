const puppeteer = require('puppeteer');

async function loaddata(id, page) {

  try {

    const nameSelector = `#post-${id} > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1`;
    const keySelector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > div`;
    const chordSelector = `#post-${id} > section:nth-child(2) > div.archive-desc > p`;
    const capoSelector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__desc`
    const mucicSelector = `#post-${id} > section:nth-child(5) > div > div`

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
    
    const lines = music.split('\n').map(line => line.trim());
    const chord = chordText.split(', ').map(i => i.replace('คอร์ด ', ''));

    // await browser.close();

    return {
      name,
      key,
      chord,
      capo,
      lines
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
    page.click(selector),
  ]);
}

export default async function handler(req, res) {
  const { id, key, count } = req.query;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.dochord.com/${id}/`, { waitUntil: 'networkidle2', timeout: 0 });

  let data;

  if (req.method === 'GET') {

    if (!id) {
      res.status(200).json("NOT ID");
    } 
    else if (id && !key && !count) {
      try {
        data = await loaddata(id, page,{timeout:10000});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    else if (id && key && count) {
      try {
        if (count != 0) {
          if (key === 'Addkey') {
            for (var i = 0 ; i < count; i++) {
              await addkey(id, page); 
            }
            data = await loaddata(id, page, { timeout: 10000 });
            res.status(200).json(data);
          } else if (key === 'Reducekey') {
            for (var i = 0; i < count; i++) {
              await reducekey(id, page);
            }
            data = await loaddata(id, page, { timeout: 10000 });
            res.status(200).json(data);
          }
        } else {
          data = await loaddata(id, page, { timeout: 10000 });
          res.status(200).json(data);
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  } 
}


// const puppeteer = require('puppeteer');

// async function loaddata(id, page) {
//   try {
//     const selectors = {
//       name: `#post-${id} > section:nth-child(1) > div > div > div.single-cover-header > div.single-cover-header-info > div > h1`,
//       key: `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > div`,
//       chord: `#post-${id} > section:nth-child(2) > div.archive-desc > p`,
//       capo: `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__desc`,
//       music: `#post-${id} > section:nth-child(5) > div > div`
//     };

//     const elements = await Promise.all(
//       Object.values(selectors).map(selector => page.waitForSelector(selector))
//     );

//     const [name, key, chordText, capo, music] = await Promise.all(
//       elements.map(element => page.evaluate(el => el.textContent, element))
//     );

//     const lines = music.split('\n').map(line => line.trim());
//     const chord = chordText.split(', ').map(i => i.replace('คอร์ด ', ''));

//     return { name, key, chord, capo, lines };
//   } catch (error) {
//     console.error('Puppeteer error:', error);
//     throw new Error('Error performing Puppeteer operation');
//   }
// }

// async function changeKey(id, page, type, count) {
//   const selector = `#post-${id} > section:nth-child(4) > div.single-key > div.single-key__select > a.single-key__select-${type}`;
//   for (let i = 0; i < count; i++) {
//     await page.click(selector);
//   }
// }

// export default async function handler(req, res) {
//   const { id, key, count } = req.query;

//   if (!id) {
//     return res.status(400).json({ message: "NOT ID" });
//   }

//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   try {
//     await page.goto(`https://www.dochord.com/${id}/`, { waitUntil: 'networkidle2', timeout: 0 });

//     if (!key && !count) {
//       const data = await loaddata(id, page);
//       res.status(200).json(data);
//     } else if (key && count) {
//       if (key === 'Addkey') {
//         await changeKey(id, page, 'plus', count);
//       } else if (key === 'Reducekey') {
//         await changeKey(id, page, 'minus', count);
//       }
//       const data = await loaddata(id, page);
//       res.status(200).json(data);
//     } else {
//       res.status(400).json({ message: 'Invalid query parameters' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   } finally {
//     await browser.close();
//   }
// }
