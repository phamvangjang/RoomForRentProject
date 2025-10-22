const getNumberFromString = (string) => {
    let number = 0
    if (string.search('đồng/tháng') !== -1) {
        number = +string.match(/\d+/)[0] / Math.pow(10, 3)
    } else if (string.search('triệu/tháng') !== -1) {
        number = +string.match(/\d+/)[0]
    }
    else if (string.search('m') !== -1) {
        number = +string.match(/\d+/)[0]
    }
    return number
}
const getNumberFromStringV2 = (string) => {
    let number = 0
    if (string.search('đồng/tháng') !== -1) {
        number = +string.match(/\d+/)[0] / Math.pow(10, 3)
    } else if (string.search('triệu/tháng') !== -1) {
        number = +string.split(' ')[0]
    }
    else if (string.search('m') !== -1) {
        number = +string.match(/\d+/)[0]
    }
    return +number
}

const convertVietnameseDateToJSDate = (dateString) => {
    // Xử lý trường hợp chuỗi rỗng, null, hoặc undefined
    if (!dateString || typeof dateString !== 'string') {
        return null;
    }

    // 1. Phân tích cú pháp chuỗi
    // Trích xuất Giờ:Phút Ngày/Tháng/Năm
    const regex = /(\d{2}):(\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})/;
    const match = dateString.match(regex);

    if (match) {
        // match[1]: Giờ (HH)
        // match[2]: Phút (mm)
        // match[3]: Ngày (DD)
        // match[4]: Tháng (MM)
        // match[5]: Năm (YYYY)

        const hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        // Lưu ý: Tháng trong JavaScript Date object bắt đầu từ 0
        const month = parseInt(match[4], 10) - 1; 
        const year = parseInt(match[5], 10);

        // 2. Tạo đối tượng Date.
        // Đối tượng Date được tạo sẽ ở múi giờ địa phương của môi trường chạy (thường là UTC trên server,
        // hoặc múi giờ của client nếu chạy client-side, nhưng ORM/Database sẽ xử lý nó khi lưu).
        const dateObject = new Date(year, month, day, hour, minute, 0, 0);

        // 3. Kiểm tra tính hợp lệ (kiểm tra nhanh xem ngày được tạo có khớp với đầu vào không)
        // Lưu ý: Kiểm tra này có thể không hoàn hảo, nhưng là một biện pháp an toàn.
        if (dateObject.getFullYear() === year && dateObject.getMonth() === month && dateObject.getDate() === day) {
            return dateObject;
        }
    }

    return null; // Trả về null nếu không khớp định dạng
}
module.exports = {
    getNumberFromString,
    getNumberFromStringV2,
    convertVietnameseDateToJSDate
}
// const getNumberFromString = (string) => +string.match(/\d+/)[0]
