// Import Required Lib
const fs = require('fs');
const puppeteer = require('puppeteer');


// Basic Configuration
const base = [{
    url:'https://evaly.com.bd',
    maps:[],
}];
const preloader_handle = 'button.absolute';


async function scrape(lnkobj, n){
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(lnkobj.url);
    console.log('scraping: ' + lnkobj.url);

    try {
        await page.click(preloader_handle);
    } catch (error) {
        console.log('error:: preloader');
    }

    let urls = await page.evaluate((bu) => {
        let results = [];
        let items = document.querySelectorAll('a');
        items.forEach((item) => {
            try {
                if (item.getAttribute('href').startsWith('/') && item.getAttribute('href').length != 1) {
                    results.push({
                        url: bu + item.getAttribute('href'),
                        maps: [],
                    });
                }
            } catch (error) {
                results.push({
                    url: bu + item.getAttribute('href'),
                    maps: [],
                });
            }
            
        });
        return results;
    }, base[0].url)
    await browser.close();
    try {
        lnkobj.maps = [...urls]
    } catch (error) {
        console.log('error:: ' + typeof url + ' links');
    }
}

async function main(base){
    n = 1;
    var tempbase = base;
    while(n<=2){
        console.log('n: ' + n);
        console.log('tempbase: ' + tempbase.length);
        for (let i = 0; i < tempbase.length; i++) {
            await scrape(tempbase[i], n);
        }
        tempbase = tempbase[0].maps
        n += 1;
    }
    // fs.writeFileSync('links.json', JSON.stringify(base));
    console.log(JSON.parse(JSON.stringify(base)));
} 
main(base)
