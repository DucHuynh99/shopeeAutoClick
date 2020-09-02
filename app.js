// @ts-check
const TIME_INTERVAL = 15 * 60 * 1000;
const TIME_TO_LOAD = 20 * 1000;

const cookies = require('./cookies');

const puppeteer = require('puppeteer');
const moment = require('moment-timezone');
const express = require('express');
const port = process.env.PORT || 80;
const app = express();

app.get('/', function (req, res) {
    res.send('Hello');
});

var visited = Array(24).fill(0);

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.setCookie(...cookies.array);
    // await page.goto("https://shopee.vn/");
    // await page.waitFor(TIME_TO_LOAD);
    console.log('Khởi động thành công!');
    while (true) {
        const now = moment.tz('Asia/Ho_Chi_Minh').hour();
        switch (now) {
            case 9: case 10: case 11: case 12: case 15: case 18: case 21:
                if (visited[now] == 0) {
                    console.log(`Lúc ${now} giờ: Quà tặng Shopee!`);
                    visited[now] = 0;
                    await page.goto('https://shopee.vn/pc_event/?smtt=1.330&url=https%3A%2F%2Fluckydraw.shopee.vn%2Fevent%2F48cd355f2471e94e%3Fsmtt%3D1.330');
                    await page.waitFor(TIME_TO_LOAD);
                    const frame = page.frames()[1];
                    await frame.click('div.handler');
                    await page.waitFor(TIME_INTERVAL - TIME_TO_LOAD);
                    break;
                }
                else {
                    console.log(`Lúc ${now} giờ: Chờ ${TIME_INTERVAL / 60 / 1000} phút`);
                    await page.waitFor(TIME_INTERVAL);
                    break;
                }
            default:
                if (visited[0] == 0 || visited[21] == 1) {
                    console.log(`Lúc ${now} giờ: Săn xu mỗi ngày!`);
                    visited.fill(0);
                    visited[0] = 1;
                    await page.goto('https://shopee.vn/shopee-coins');
                    await page.waitFor(TIME_TO_LOAD);
                    try {
                        await page.click('button._1Puh5H');
                    } catch (error) {
                        console.log('Bạn đã đăng nhập vào ngày hôm nay!');
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