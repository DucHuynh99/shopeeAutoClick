const dataServices = require('./data-service');
const puppeteer = require('puppeteer');
console.log(require('dotenv').config());

const login = async (browser) => {
    try {
        const page = await browser.newPage();
        const cookies = await dataServices.getShopeeCookies();
        await page.setCookie(...cookies);
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto("https://shopee.vn/buyer/login?next=https%3A%2F%2Fshopee.vn%2F", { waitUntil: 'networkidle0' });
        await page.type('input[name=loginKey]', process.env.SHOPEE_NAME);
        await page.type('input[name=password]', process.env.SHOPEE_PASSWORD);
        await page.waitFor(5000);
        await page.click("button._1ruZ5a");
        await page.waitFor(60000);
        await page.goto("https://shopee.vn/", { waitUntil: 'networkidle0' });
        const newCookies = await page.cookies();
        // console.log(`New cookies: `, newCookies);
        await dataServices.saveShopeeCookies(newCookies);
        await page.close();
    } catch (error) {
        console.log("[ERROR In Account Services]", error);
    }
}

module.exports = {
    login
};