// @ts-check
const imageServices = require('./image-service');
const dataServies = require('./data-service');
const mailServices = require('./mail-service');
const { cookies, coinUrl, luckyUrl } = require('../../shopee-data');

const puppeteer = require('puppeteer');
const moment = require('moment-timezone');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--start-maximized"]
    });
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.setViewport({ width: 1440, height: 900 });
    await page.setDefaultNavigationTimeout(300000);
    const now = moment.tz('Asia/Ho_Chi_Minh').hour();
    switch (now) {
        case 0:
            console.log(`[${now} giờ] Săn xu mỗi ngày`);
            await page.goto(coinUrl);
            await page.waitFor(180000);
            if ((await page.$$('div.shopee-avatar')).length == 0) {
                console.log('Chưa đăng nhập. Gửi email thông báo...');
                await mailServices.sendWarningEmail();
                break;
            }
            await page.click('button._1Puh5H');
            await page.waitFor(5000);
            const image1 = await page.screenshot({ fullPage: true });
            await saveScreenshot(image1);
            break;
        case 9: case 10: case 11: case 12: case 15: case 18: case 21:
            console.log(`[${now} giờ] Quà tặng Shopee`);
            await page.goto(luckyUrl, { waitUntil: 'networkidle0' });
            if ((await page.$$('div.shopee-avatar')).length == 0) {
                console.log('Chưa đăng nhập. Gửi email thông báo...');
                await mailServices.sendWarningEmail();
                break;
            }
            await page.frames()[1].click('#clickArea');
            await page.waitFor(5000);
            const image2 = await page.screenshot({ fullPage: true });
            await saveScreenshot(image2);
            break;
        default:
            console.log(`[${now} giờ] Chờ`);
            break;
    }
    await browser.close();
})();

const saveScreenshot = async (image) => {
    try {
        const url = await imageServices.uploadImage(image);
        return await dataServies.saveUrl(url);
    } catch (error) {
        console.log(error);
    }
}