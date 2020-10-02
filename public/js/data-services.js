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

module.exports = {
    saveUrl,
    getUrl
}