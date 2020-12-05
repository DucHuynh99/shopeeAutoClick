const axios = require('axios').default;

const saveUrl = async (url) => {
    try {
        const data = { screenShotUrl: url };
        const res = await axios.put('https://jsonblob.com/api/jsonBlob/cd5ac302-03a0-11eb-909d-374db14ec6e1', data, { headers: { 'Content-Type': 'application/json' } });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

const getUrl = async () => {
    try {
        const res = await axios.get('https://jsonblob.com/api/jsonBlob/cd5ac302-03a0-11eb-909d-374db14ec6e1');
        return res.data.screenShotUrl;
    } catch (error) {
        console.log(error);
    }
}

const saveLoginCookies = async (cookies) => {
    try {
        const data = { loginCookies: cookies };
        const res = await axios.put('https://jsonblob.com/api/jsonBlob/20a332f7-3697-11eb-afd1-dbdb91813467', data, { headers: { 'Content-Type': 'application/json' } });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

const getLoginCookies = async () => {
    try {
        const res = await axios.get('https://jsonblob.com/api/jsonBlob/20a332f7-3697-11eb-afd1-dbdb91813467');
        return res.data.loginCookies;
    } catch (error) {
        console.log(error);
    }
}

const saveShopeeCookies = async (cookies) => {
    try {
        const data = { Cookies: cookies };
        const res = await axios.put('https://jsonblob.com/api/jsonBlob/a110ac55-369a-11eb-afd1-ad79cfbae68a', data, { headers: { 'Content-Type': 'application/json' } });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

const getShopeeCookies = async () => {
    try {
        const res = await axios.get('https://jsonblob.com/api/jsonBlob/a110ac55-369a-11eb-afd1-ad79cfbae68a');
        return res.data.Cookies;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveUrl,
    getUrl,
    saveLoginCookies,
    getLoginCookies,
    saveShopeeCookies,
    getShopeeCookies
}