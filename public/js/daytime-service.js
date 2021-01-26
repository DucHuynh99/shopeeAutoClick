const moment = require('moment-timezone');

exports.getNow = () => {
    const modifiedDate = moment.tz(`Asia/Ho_Chi_Minh`).format(`DD/MM/YYYY HH:mm:ss`);
    return `${modifiedDate}`;
}