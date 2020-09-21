// @ts-check
const TIME_INTERVAL = 15 * 60 * 1000;
const TIME_TO_LOAD = 60 * 1000;

const { cookies, homeUrl, coinUrl, luckyUrl } = require('./shopeeData');
const puppeteer = require('puppeteer');
const moment = require('moment-timezone');
const express = require('express');
const port = process.env.PORT || 80;
const app = express();

app.get('/', function (req, res) { res.send('Hello'); });

(async () => {
    var visited = Array(24).fill(0);
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.goto(homeUrl);
    await page.waitFor(TIME_TO_LOAD);
    console.log('Khởi động thành công!');
    while (true) {
        const now = moment.tz('Asia/Ho_Chi_Minh').hour();
        switch (now) {
            case 9: case 10: case 11: case 12: case 15: case 18: case 21:
                if (visited[now] == 0) {
                    console.log(`Lúc ${now} giờ: Quà tặng Shopee!`);
                    visited[now] = 1;
                    try {
                        await page.goto(luckyUrl);
                    } catch (error) {
                        console.log('URL không hợp lệ!');
                    }
                    await page.waitFor(TIME_TO_LOAD);
                    try {
                        await page.frames()[1].click('div.handler');
                    } catch (error) {
                        console.log('Bạn đã nhận quà rồi!');
                    }
                    await page.waitFor(TIME_INTERVAL - TIME_TO_LOAD);
                }
                else {
                    console.log(`Lúc ${now} giờ: Chờ ${TIME_INTERVAL / 60 / 1000} phút`);
                    await page.waitFor(TIME_INTERVAL);
                }
                break;
            default:
                if (now == 0 && visited[21] == 1)
                    visited.fill(0);
                if (visited[0] == 0) {
                    console.log(`Lúc ${now} giờ: Săn xu mỗi ngày!`);
                    visited[0] = 1;
                    await page.goto(coinUrl);
                    await page.waitFor(TIME_TO_LOAD);
                    try {
                        await page.click('button._1Puh5H');
                    } catch (error) {
                        console.log('Bạn đã nhận xu rồi!');
                    }
                    await page.waitFor(TIME_INTERVAL - TIME_TO_LOAD);
                } else {
                    console.log(`Lúc ${now} giờ: Chờ ${TIME_INTERVAL / 60 / 1000} phút`);
                    await page.waitFor(TIME_INTERVAL);
                }
        }
    };
})();

app.listen(port, () => console.log(`app listening on port ${port}!`));