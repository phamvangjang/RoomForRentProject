const moment = require('moment');

const formatDate = (timeObj) => {
    let day = timeObj.getDay() === 0 ? 'Chủ nhật' : 'Thứ ' + `${timeObj.getDay() +1}`;
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
    return `${day}, ${time}:${date}`;
}   

const generateDate = () => {
    let gapExpire = Math.floor(Math.random() * 29) + 1; // from 5 to 10 days
    let currentDate = new Date();
    let expireDate = moment(currentDate).add(gapExpire, 'd').toDate();
    return {
        currentDate: formatDate(currentDate),
        expireDate: formatDate(expireDate)
    }
}

module.exports = {generateDate, formatDate};