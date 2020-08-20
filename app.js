const TIME_INTERVAL = 15 * 60 * 1000;
const TIME_TO_LOAD = 20 * 1000;
const puppeteer = require('puppeteer');
const cookies1 = {
    "domain": ".shopee.vn",
    "expirationDate": 253402257600,
    "hostOnly": false,
    "httpOnly": false,
    "name": "G_ENABLED_IDPS",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "google",
    "id": 1
};
const cookies2 = {
    "domain": ".shopee.vn",
    "expirationDate": 1597896515.592343,
    "hostOnly": false,
    "httpOnly": false,
    "name": "REC_MD_41_1000121",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "1597896513_0_50_0_38",
    "id": 2
};
const cookies3 = {
    "domain": ".shopee.vn",
    "expirationDate": 2228152638.57798,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_CLIENTID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "5iWTZuYfb2E9lLrUujxejjhhggadqngu",
    "id": 3
};
const cookies4 = {
    "domain": ".shopee.vn",
    "expirationDate": 2228616217.508694,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_EC",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "G+XV9tjprDIPr8xltlJwopCdl9ZwTxt3p8CGHWjFxIgctf5YWRTfJOX7mrVbVJ9+wOz/21aIygL0yHKHyB0Z1ncyrfk1mJ6VW+4k3p9BXqbz4eXqzNprRsMq5mwxGKY8gZ9QbUT6R9YKSbjO1HPSDIaL4IIbsv+b+lgjbVPUrZA=",
    "id": 4
};
const cookies5 = {
    "domain": ".shopee.vn",
    "expirationDate": 2226287415.361156,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_F",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "5iWTZuYfb2E9lLrUBfP18GoZ4cpFQOVG",
    "id": 5
};
const cookies6 = {
    "domain": ".shopee.vn",
    "expirationDate": 2228616218.574975,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_R_T_ID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "\"JSR8tAosBGsJv7TcDqSzpcWvyLl8PNRAKEFjBCQPeTbTcJNe0Tdg2D2iFE+OmxjuMjA2SLhNv8bRq21Ph3PGsMCy6RIEK4MB4BtHZmf7e7Y=\"",
    "id": 6
};
const cookies7 = {
    "domain": ".shopee.vn",
    "expirationDate": 2228616218.575086,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_R_T_IV",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "\"bYYGDfGoxmCxme1g6A6TIQ==\"",
    "id": 7
};
const cookies8 = {
    "domain": ".shopee.vn",
    "expirationDate": 1597982618.575145,
    "hostOnly": false,
    "httpOnly": true,
    "name": "SPC_SI",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "1m7ouqb77mbhicqoa036tqacgy1gtzur",
    "id": 8
};
const cookies9 = {
    "domain": ".shopee.vn",
    "expirationDate": 2228152654.03586,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SPC_U",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "69252628",
    "id": 9
};
const cookies10 = {
    "domain": "shopee.vn",
    "hostOnly": true,
    "httpOnly": false,
    "name": "csrftoken",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "RyEFeTljxV7HMEy7hXCBJQ4yIKF0KTZc",
    "id": 10
};
const cookies11 = {
    "domain": "shopee.vn",
    "expirationDate": 2226287415.361199,
    "hostOnly": true,
    "httpOnly": true,
    "name": "REC_T_ID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "f5b3f252-cd6b-11ea-b661-f41d6bf861df",
    "id": 11
};
const cookies12 = {
    "domain": "shopee.vn",
    "hostOnly": true,
    "httpOnly": false,
    "name": "SPC_IA",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "1",
    "id": 12
};
const cookies13 = {
    "domain": "shopee.vn",
    "expirationDate": 2228616218.575118,
    "hostOnly": true,
    "httpOnly": false,
    "name": "SPC_T_ID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "\"JSR8tAosBGsJv7TcDqSzpcWvyLl8PNRAKEFjBCQPeTbTcJNe0Tdg2D2iFE+OmxjuMjA2SLhNv8bRq21Ph3PGsMCy6RIEK4MB4BtHZmf7e7Y=\"",
    "id": 13
};
const cookies14 = {
    "domain": "shopee.vn",
    "expirationDate": 2228616218.575053,
    "hostOnly": true,
    "httpOnly": false,
    "name": "SPC_T_IV",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "\"bYYGDfGoxmCxme1g6A6TIQ==\"",
    "id": 14
};
const cookies15 = {
    "domain": "shopee.vn",
    "hostOnly": true,
    "httpOnly": false,
    "name": "welcomePkgShown",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "true",
    "id": 15
};
const visited = Array(24).fill(0);
(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    // await page.setViewport({
    //     width: 0,
    //     height: 0,
    // });
    await page.setCookie(cookies1, cookies2, cookies3, cookies4, cookies5, cookies6, cookies7, cookies8, cookies9, cookies10, cookies11, cookies12, cookies13, cookies14, cookies15);
    await page.goto("https://shopee.vn/");
    await page.waitFor(5000);
    // await page.screenshot({ path: 'index.png' });
    console.log('Khởi động thành công!');
    while (true) {
        const now = new Date().getHours();
        console.log(now);
        switch (now) {
            case 0:
                if (visited[now] == 0 || visited[21] == 1) {
                    visited[now] = 1;
                    await page.goto('https://shopee.vn/shopee-coins');
                    console.log(`Lúc ${now} giờ: Săn xu mỗi ngày!`);
                    await page.waitFor(TIME_TO_LOAD);
                    await page.click('button._1Puh5H');
                    visited.fill(0);
                    page.waitFor(TIME_INTERVAL - TIME_TO_LOAD);
                    break;
                } else {
                    page.waitFor(TIME_INTERVAL);
                    break;
                }
            case 9:
            case 10:
            case 11:
            case 12:
            case 15:
            case 18:
            case 21:
                if (visited[now] == 0) {
                    visited[now] = 1;
                    await page.goto('https://shopee.vn/pc_event/?url=https%3A%2F%2Fluckydraw.shopee.vn%2Fevent%2F3dcc31fe943f8c43%3Fsmtt%3D1.330');
                    console.log(`Lúc ${now} giờ: Quà tặng Shopee!`);
                    await page.waitFor(TIME_TO_LOAD);
                    const frame = page.frames()[1];
                    frame.click('div.handler');
                    page.waitFor(TIME_INTERVAL - TIME_TO_LOAD);
                    break;
                }
                else {
                    page.waitFor(TIME_INTERVAL);
                    break;
                }
            default:
                await page.waitFor(TIME_INTERVAL);
                break;
        }
    };
    await page.close();
})();