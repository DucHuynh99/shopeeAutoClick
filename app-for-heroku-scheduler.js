// @ts-check
const TIME_TO_LOAD = 60 * 1000;

const { cookies, homeUrl, coinUrl, luckyUrl } = require('./shopeeData');
const puppeteer = require('puppeteer');
const fs = require('fs');
const moment = require('moment-timezone');

(async() => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--start-maximized"]
    });
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.setViewport({ width: 1440, height: 900 });
    const now = moment.tz('Asia/Ho_Chi_Minh').hour();
    switch (now) {
        case 0:
            console.log(`Lúc ${now} giờ: Săn xu mỗi ngày!`);
            await page.goto(coinUrl);
            await page.waitFor(TIME_TO_LOAD);
            await page.click('button._1Puh5H');
            await page.waitFor(2000);
            const buff1 = await page.screenshot({ fullPage: true });
            fs.writeFileSync('./public/images/screenshot.png', buff1.toString('binary'), 'binary');
            break;
        case 9:
        case 10:
        case 11:
        case 12:
        case 15:
        case 18:
        case 21:
            console.log(`Lúc ${now} giờ: Quà tặng Shopee!`);
            await page.goto(luckyUrl);
            await page.waitFor(TIME_TO_LOAD);
            await page.frames()[1].click('#clickArea');
            await page.waitFor(2000);
            const buff2 = await page.screenshot({ fullPage: true });
            fs.writeFileSync('./public/images/screenshot.png', buff2.toString('binary'), 'binary');
            break;
    }
    await browser.close();
})();