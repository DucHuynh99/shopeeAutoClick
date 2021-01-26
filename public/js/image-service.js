const FormData = require('form-data');
const { getNow } = require('./daytime-service');
const axios = require('axios').default;

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('key', 'd2c7bde260c770af6a4eff7b16444874');
        formData.append('image', Buffer.from(image, 'binary').toString('base64'));
        formData.append('name', getNow().replace());
        formData.append('expiration', 86400);
        const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: formData.getHeaders()
        });
        return res.data.data.url;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadImage
};