const fs = require('fs');
const puppeteer = require('puppeteer');


// Basic Configuration
const base = [{
    url:'https://evaly.com.bd',
    maps:[],
}];
const haspreloader = true;
const preloader_handle = 'button.absolute';
const depth = 3;


// Recurcive Scrape for sitemap
async function scrape(lnkobj, n, page){
    await page.goto(lnkobj.url);
    console.log('n_'+n+':: scraping: ' + lnkobj.url);

    // handle preloader
    try {
        if (haspreloader && n <= 1) await page.click(preloader_handle);
    } catch (error) {
        console.log('error:: preloader');
    }

    // Fetch URL's
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

    // Send for recursion
    try {
        lnkobj.maps = [...urls]
        if(n <= (depth-1)){
            for (let j = 0; j < lnkobj.maps.length; j++) {
                await scrape(lnkobj.maps[j], n+1, page);
            }
        }
    } catch (error) {
        console.log('error:: ' + typeof url + ' links');
    }
}


// Run bot
async function main(base){
    var n = 1;

    let browser = await puppeteer.launch(); // open browser
    let page = await browser.newPage();     // open tab
    await page.setDefaultNavigationTimeout(0);

    var tstart = new Date().getTime(); // start time for Scraping 

    await scrape(base[0], n, page);
    await browser.close();

    fs.writeFileSync('sitemap.json', JSON.stringify(base)); //save sitemap in json file
    console.log(JSON.parse(JSON.stringify(base)));

    console.log('\n\n\n');
    console.log('finished within(second): '+ (new Date().getTime() - tstart));
} 
main(base)
