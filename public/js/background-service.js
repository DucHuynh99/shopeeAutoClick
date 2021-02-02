// @ts-check
const imageServices = require('./image-service');
const dataServies = require('./data-service');
const mailServices = require('./mail-service');
const accountServices = require('./account-service');
const { coinUrl, luckyUrl } = require('../../shopee-data');

const puppeteer = require('puppeteer');
const moment = require('moment-timezone');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--start-maximized"]
    });
    const page = await browser.newPage();
    const cookies = await dataServies.getShopeeCookies();
    await page.setCookie(...cookies);
    await page.setViewport({ width: 1440, height: 900 });
    await page.setDefaultNavigationTimeout(0);
    const now = moment.tz('Asia/Ho_Chi_Minh');
    const dateNow = now.format(now.format(`DD/MM/YYYY HH:mm:ss`));
    switch (now.hour()) {
        case 0:
            console.log(`[${dateNow}] Săn xu mỗi ngày`);
            await page.goto(coinUrl);
            await page.waitForSelector('button._1Hh9_2', {visible: true});
            if ((await page.$$('div.shopee-avatar')).length === 0) {
                await reloginShopee(browser, page);
            }
            await page.waitForSelector('button._1Hh9_2');
            await page.click('button._1Hh9_2');
            await page.waitFor(5000);
            const image1 = await page.screenshot({ fullPage: true });
            await saveScreenshot(image1);
            break;
        case 9: case 10: case 11: case 12: case 15: case 18: case 21:
            console.log(`[${dateNow}] Quà tặng Shopee`);
            await page.goto(luckyUrl, { waitUntil: 'networkidle0' });
            if ((await page.$$('div.shopee-avatar')).length === 0) {
                await reloginShopee(browser, page);
            }
            await page.frames()[1].click('#clickArea');
            await page.waitFor(5000);
            const image2 = await page.screenshot({ fullPage: true });
            await saveScreenshot(image2);
            break;
        default:
            console.log(`[${dateNow}] Chờ`);
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

const reloginShopee = async (browser, page) => {
    try {
        console.log('Chưa đăng nhập. Gửi email thông báo...');
        await mailServices.sendWarningEmail();
        await accountServices.login(browser);
        await page.deleteCookie();
        const newCookies = await dataServies.getShopeeCookies();
        await page.setCookie(...newCookies);
        await page.reload({ waitUntil: 'networkidle0' });
    } catch (error) {
        console.log("[ERROR in relogin]", error);
    }
}