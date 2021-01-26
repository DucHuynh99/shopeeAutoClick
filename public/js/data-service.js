const axios = require('axios').default;
const moment = require('moment-timezone');
const { getNow } = require('./daytime-service');

const saveUrl = async (url) => {
    try {
        const data = { screenShotUrl: url, modifiedDate: getNow() };
        const res = await axios.put('https://jsonblob.com/api/jsonBlob/cd5ac302-03a0-11eb-909d-374db14ec6e1', data, { headers: { 'Content-Type': 'application/json' } });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

const getUrl = async () => {
    try {
        const res = await axios.get('https://jsonblob.com/api/jsonBlob/cd5ac302-03a0-11eb-909d-374db14ec6e1');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const saveShopeeCookies = async (cookies) => {
    try {
        const modifiedDate = moment.tz(`Asia/Ho_Chi_Minh`).format(`DD/MM/YYYY HH:mm:ss`);
        const data = { "Cookies": cookies, "ModifiedDate": modifiedDate };
        const res = await axios.put('https://jsonblob.com/api/jsonBlob/a110ac55-369a-11eb-afd1-ad79cfbae68a', data, { headers: { 'Content-Type': 'application/json' } });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

const getShopeeCookies = async () => {
    try {
        const res = await axios.get('https://jsonblob.com/api/jsonBlob/a110ac55-369a-11eb-afd1-ad79cfbae68a');
        console.log(`Cookies date: `, res.data.ModifiedDate);
        return res.data.Cookies;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveUrl,
    getUrl,
    saveShopeeCookies,
    getShopeeCookies
}